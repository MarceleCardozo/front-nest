import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ProductType } from "../store/modules/products/productsSlice";

interface BasicTableProps {
  data: ProductType[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

function BasicTable({ data, handleDelete, handleEdit }: BasicTableProps) {
  return (
    <Box ml={5} mr={5}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Nome</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Descrição</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Valor</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow
                key={product.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.value}</TableCell>
                <TableCell>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(product.id!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(product.id!)}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BasicTable;
