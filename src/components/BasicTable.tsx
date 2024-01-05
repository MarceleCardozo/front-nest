import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { IconButton, Pagination, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ProductType } from "../store/modules/products/productsSlice";

interface BasicTableProps {
  data: ProductType[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

function BasicTable({ data, handleDelete, handleEdit }: BasicTableProps) {
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isMedium = useMediaQuery("(max-width:960px)");
  const rowsPerPage = isMobile ? 5 : isMedium ? 6 : 7;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);

  return (
    <Box
      ml={5}
      mr={5}
      mt={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", maxHeight: "70vh" }}
      >
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
            {data.slice(startIndex, endIndex).map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>R${product.value},00</TableCell>
                <TableCell>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(product.id)}
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

      <Pagination
        sx={{ marginTop: "2%" }}
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  );
}

export default BasicTable;
