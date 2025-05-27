import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box, Typography, Card, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchComponent from "../components/SearchComponent.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);

  const loadStyles = {
    marginTop: "20px",
    marginLeft: "50%",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://sales-dashboard-server.onrender.com/api/products");
        const productsWithDetails = response.data.map((product, index) => {
          const revenue = 
            parseInt(product.quantity) * parseInt(product.sellingPrice);
          const profit = parseInt(product.sellingPrice) - product.costPrice;

          return {
            id: product._id || index, // Use the _id from the database or fallback to index
            ...product,
            revenue,
            profit,
          };
        });
        setProducts(productsWithDetails);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { field: "productId", headerName: "Product ID", width: 100 },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "brandName", headerName: "Brand Name", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "quantity", headerName: "Quantities Sold", width: 150 },
    { field: "revenue", headerName: "Total Revenue", width: 150 },
    { field: "profit", headerName: "Total Profit", width: 150 },
    {
      field: "dashboard",
      headerName: "Dashboard",
      width: 150,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/product/${params.row.id}`}
          variant="contained"
          color="primary"
          size="small"
        >
          View Dashboard
        </Button>
      ),
    },
  ];

  return (
    <>
      <Navbar search={true} />
      <div style={{ height: 400, width: "100%" }}>
        <Card sx={{ p: 3, m: 2, boxShadow: 3 }}>
          {/* <SearchComponent /> */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center", color: "#1976d2" }}
          >
            Products Overview
          </Typography>
          <Box
            sx={{
              height: 700,
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
            }}
          >
            {products.length === 0 ? (
              <CircularProgress style={loadStyles} />
            ) : (
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
                    color: "#000",
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
            )}
          </Box>
        </Card>
      </div>
    </>
  );
};

export default Products;
