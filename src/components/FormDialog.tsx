import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { ProductType } from "../store/modules/products/productsSlice";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

interface FormDialogProps {
  product: (product: ProductType) => void;
}

export default function FormDialog({ product }: FormDialogProps) {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productValue, setProductValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribe = () => {
    product({
      name: productName,
      description: productDescription,
      value: productValue,
    });

    handleClose();
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={handleClickOpen}
        style={{ position: "fixed", right: 16, bottom: 16 }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the product.
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubscribe}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
