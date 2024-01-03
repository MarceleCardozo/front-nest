import { useEffect, useState } from "react";
import BasicTable from "../components/BasicTable";
import { ProductType } from "../store/modules/products/productsSlice";
import axios from "axios";
import FormDialog from "../components/FormDialog";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:3000/products");
      console.log("Response:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  }

  async function createProduct(product: ProductType) {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );
      console.log("Response:", response.data);
      getProducts();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  }

  async function deleteProduct(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}`
      );
      console.log("Response:", response.data);
      getProducts();
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error);
    }
  }

  async function editProduct(id: string) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/products/${id}`
      );
      console.log("Response:", response.data);
      getProducts();
    } catch (error) {
      console.error("Erro ao editar avaliação:", error);
    }
  }

  return (
    <>
      <h1>Produtos</h1>

      <BasicTable
        data={products}
        handleDelete={deleteProduct}
        handleEdit={editProduct}
      />

      <FormDialog product={createProduct} />
    </>
  );
};

export default Home;
