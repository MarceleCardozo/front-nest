import React, { useEffect, useState } from "react";
import BasicTable from "../components/BasicTable";
import axios from "axios";
import FormDialog from "../components/FormDialog";
import { Box, CircularProgress, Fab } from "@mui/material";
import { ProductType } from "../store/modules/products/productsSlice";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
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
      const response = await axios.get("http://localhost:3000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      setLoading(false);
    }
  }

  async function createOrUpdateProduct(product: ProductType) {
    if (typeAction === "edit") {
      await axios.patch(
        `http://localhost:3000/products/${productToEdit!.id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post("http://localhost:3000/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    getProducts();
    setOpen(false);
  }

  async function handleActionsProduct(id: string, action: string) {
    setTypeAction(action);

    if (action === "delete") {
      if (window.confirm(`Tem certeza de que deseja excluir este produto?`)) {
        await axios.delete(`http://localhost:3000/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  return (
    <>
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
