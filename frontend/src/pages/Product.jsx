import React, { useState, useEffect } from "react";
import { Card, Grid, Typography, Box, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Product = ({ product }) => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);

  const fetchIndividualData = async () => {
    const response = await axios.get(`http://localhost:8000/api/product/${id}`);
    const qty = response.data.product.quantity;
    setProductName(response.data.product.productName);
    setBrandName(response.data.product.brandName);
    setCategory(response.data.product.category);
    setQuantity(response.data.product.quantity);
    setRevenue(
      parseInt(response.data.product.quantity) *
        parseInt(response.data.product.sellingPrice)
    );
    setProfit(
      qty * parseInt(response.data.product.sellingPrice) -
        qty * parseInt(response.data.product.costPrice)
    );
  };

  useEffect(() => {
    fetchIndividualData();
  }, []);

  const data = [
    {
      name: "Metrics",
      TotalRevenue: revenue,
      TotalProfit: profit,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={4}>
        {/* Product Details Header with Back Button */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Product Details
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/products"
                  sx={{ mb: 2 }}
                >
                  Back to Products
                </Button>
              </Grid>
            </Grid>
            <Typography variant="subtitle1">
              <strong>Product Name:</strong> {productName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Brand Name:</strong> {brandName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Category:</strong> {category}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Quantities Sold */}
        <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <ShoppingCartIcon sx={{ fontSize: 40, mr: 2 }} color="primary" />
              <Box>
                <Typography variant="h6">Quantities Sold</Typography>
                <Typography variant="h4" color="primary">
                  {quantity}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Total Revenue */}
        <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <MonetizationOnIcon
                sx={{ fontSize: 40, mr: 2 }}
                color="success"
              />
              <Box>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h4" color="success">
                  ${revenue}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Total Profit */}
        <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <TrendingUpIcon sx={{ fontSize: 40, mr: 2 }} color="secondary" />
              <Box>
                <Typography variant="h6">Total Profit</Typography>
                <Typography variant="h4" color="secondary">
                  ${profit}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Product Metrics Overview
            </Typography>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="TotalRevenue" fill="#82ca9d" />
              <Bar dataKey="TotalProfit" fill="#ffc658" />
            </BarChart>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
