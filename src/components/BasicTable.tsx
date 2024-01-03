import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProductType } from "../store/modules/products/productsSlice";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

interface BasicTableProps {
  data: ProductType[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string, updatedProduct: ProductType) => void;
}

function BasicTable({ data, handleDelete, handleEdit }: BasicTableProps) {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);

  const handleEditClick = (id: string) => {
    const productToEdit = data.find((product) => product.id === id);
    if (productToEdit) {
      setEditingProductId(id);
      setEditedProduct({ ...productToEdit });
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct(null);
  };

  const handleSaveEdit = () => {
    if (editedProduct) {
      // Faça a lógica para salvar as alterações no servidor aqui
      // Chame a função handleEdit passando o ID do produto editado e as alterações
      handleEdit(editedProduct.id!, editedProduct);
      setEditingProductId(null);
      setEditedProduct(null);
    }
  };

  const handleEditChange = (fieldName: string, value: string) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [fieldName]: value,
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <TableRow
              key={product.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {editingProductId === product.id ? (
                  <TextField
                    type="text"
                    value={editedProduct?.name || ""}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </TableCell>
              <TableCell>
                {editingProductId === product.id ? (
                  <TextField
                    type="text"
                    value={editedProduct?.description || ""}
                    onChange={(e) =>
                      handleEditChange("description", e.target.value)
                    }
                  />
                ) : (
                  product.description
                )}
              </TableCell>
              <TableCell>
                {editingProductId === product.id ? (
                  <TextField
                    type="text"
                    value={editedProduct?.value || ""}
                    onChange={(e) => handleEditChange("value", e.target.value)}
                  />
                ) : (
                  product.value
                )}
              </TableCell>
              <TableCell>
                {editingProductId === product.id ? (
                  <div>
                    <IconButton aria-label="save" onClick={handleSaveEdit}>
                      <CheckIcon />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={handleCancelEdit}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                ) : (
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(product.id!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(product.id!)}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
