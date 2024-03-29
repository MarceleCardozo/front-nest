import React, { useEffect, useState } from "react";
import BasicTable from "../components/BasicTable";
import FormDialog from "../components/FormDialog";
import { Box, CircularProgress, Fab, IconButton } from "@mui/material";
import {
  ProductType,
  createProducts,
  deleteProducts,
  listProducts,
  updateProducts,
} from "../store/modules/products/productsSlice";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAppDispatch } from "../store/hooks";
import SearchAppBar from "../components/SearchAppBar";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [open, setOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductType | undefined>(
    undefined
  );
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (token) {
      getProducts();
    }
  }, [token]);

  async function getProducts() {
    try {
      setLoading(true);
      const response = await dispatch(listProducts(token!));

      setProducts(response.payload);
      console.log(products);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      setLoading(false);
    }
  }

  async function createOrUpdateProduct(product: ProductType) {
    try {
      if (typeAction === "edit") {
        const response = await dispatch(
          updateProducts({ productData: product, token: token! })
        );
        console.log(response);

        setTypeAction("");
      } else {
        const response = await dispatch(
          createProducts({ productData: product, token: token! })
        );
        console.log(response);
      }

      await getProducts();
      setOpen(false);
    } catch (error) {
      console.error("Erro ao criar/atualizar produto:", error);
    }
  }

  async function handleActionsProduct(id: string, action: string) {
    setTypeAction(action);

    if (action === "delete") {
      if (window.confirm(`Tem certeza de que deseja excluir este produto?`)) {
        const response = await dispatch(
          deleteProducts({ productId: id, token: token! })
        );
        console.log(response);
        getProducts();
      }
    } else {
      setOpen(true);
      const productToEdit = products.find((product) => product.id === id);
      setProductToEdit(productToEdit);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleExit = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <SearchAppBar handleExit={handleExit} />

      <h1 style={{ textAlign: "center", color: "#333", marginTop: "20px" }}>
        PRODUTOS
      </h1>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Box>
          <BasicTable
            data={products}
            handleDelete={(id) => handleActionsProduct(id, "delete")}
            handleEdit={(id) => handleActionsProduct(id, "edit")}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleClickOpen}
            style={{
              position: "fixed",
              right: 16,
              bottom: 16,
              backgroundColor: "black",
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      )}

      <FormDialog
        product={createOrUpdateProduct}
        openModal={open}
        closeModal={() => setOpen(false)}
        productToEdit={productToEdit}
      />
    </>
  );
};

export default Home;
