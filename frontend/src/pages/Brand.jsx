import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const Brand = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);
  const [mostSoldProduct, setMostSoldProduct] = useState(""); // Renamed for clarity
  const [leastSoldProduct, setLeastSoldProduct] = useState(""); // Renamed for clarity

  const columns = [
    { field: "productId", headerName: "Product ID", width: 100 },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "brandName", headerName: "Brand Name", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "quantity", headerName: "Quantities Sold", width: 150 },
    { field: "revenue", headerName: "Total Revenue", width: 150 },
    { field: "profit", headerName: "Total Profit", width: 150 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/brand/${brand}`
        );
        const { productsByBrand } = response.data;
        const productsWithDetails = productsByBrand.map((product, index) => {
          const revenue =
            parseInt(product.quantity) * parseInt(product.sellingPrice);
          const profit =
            parseInt(product.sellingPrice) - parseInt(product.costPrice);

          return {
            id: product._id || index,
            ...product,
            revenue,
            profit,
          };
        });
        setProducts(productsWithDetails);
      } catch (error) {
        console.log("OOPS something went wrong: ", error);
      }
    };
    fetchData();
  }, [brand]); // Added brand to dependency array

  useEffect(() => {
    if (products.length > 0) {
      const quantityList = products.map((p) => parseInt(p.quantity));

      const maxQuantity = Math.max(...quantityList);
      const minQuantity = Math.min(...quantityList);

      setMostSoldProduct(products[quantityList.indexOf(maxQuantity)]);
      setLeastSoldProduct(products[quantityList.indexOf(minQuantity)]);
    }
  }, [products]);

  return (
    <>
      <Navbar search={true} />
      <Box sx={{ padding: 4 }}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "#fff",
              fontSize: 16,
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "#fff",
              color: "#000",
              fontSize: 14,
              borderBottom: "1px solid #ddd",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
            "& .MuiCheckbox-root": {
              color: "#1976d2",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
        />

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#e8f5e9" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Most Sold Product
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  {mostSoldProduct.productName}
                </Typography>

                <Typography variant="body1">
                  Selling Price: ${mostSoldProduct.sellingPrice}
                </Typography>
                <Typography variant="body1">
                  Quantities Sold: {mostSoldProduct.quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#ffebee" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Least Sold Product
                </Typography>
                <Typography variant="h4" color="error" gutterBottom>
                  {leastSoldProduct.productName}
                </Typography>
                <Typography variant="body1">
                  Selling Price: ${leastSoldProduct.sellingPrice}
                </Typography>
                <Typography variant="body1">
                  Quantities Sold: {leastSoldProduct.quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Brand;
