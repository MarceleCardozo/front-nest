import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { ProductType } from "../store/modules/products/productsSlice";

interface FormDialogProps {
  product: (product: ProductType) => void;
  openModal: boolean;
  closeModal: (arg: boolean) => void;
  productToEdit?: ProductType;
}

export default function FormDialog({
  product,
  openModal,
  closeModal,
  productToEdit,
}: FormDialogProps) {
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productValue, setProductValue] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setProductID(productToEdit.id);
      setProductName(productToEdit.name);
      setProductDescription(productToEdit.description);
      setProductValue(productToEdit.value.toString());
    }
  }, [productToEdit]);

  const handleClose = () => {
    closeModal(false);
  };

  const handleAgree = () => {
    product({
      id: productID,
      name: productName,
      description: productDescription,
      value: productValue,
    });

    clearStates();
    closeModal(false);
  };

  function clearStates() {
    setProductName("");
    setProductDescription("");
    setProductValue("");
  }

  return (
    <>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>
          {productToEdit ? "Editar Produto" : "Adicionar Produto"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor insira os detalhes do produto.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="productName"
            label="Nome"
            type="text"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="productDescription"
            label="Descrição"
            type="text"
            fullWidth
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="productValue"
            label="Valor"
            type="number"
            fullWidth
            value={productValue}
            onChange={(e) => setProductValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "black" }}>
            Cancelar
          </Button>
          <Button onClick={handleAgree} style={{ color: "black" }}>
            {productToEdit ? "Salvar Alterações" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
