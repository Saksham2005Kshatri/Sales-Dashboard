import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
  Box,
} from "@mui/material";
import { BarChart, People, AttachMoney, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container maxWidth="lg" style={{ padding: "2rem 0" }}>
      <header style={{ marginBottom: "2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Sales Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Visualize and analyze your sales performance with real-time metrics.
          </Typography>
        </motion.div>
      </header>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <AttachMoney color="success" fontSize="large" />
              <div>
                <Typography color="textSecondary">Total Revenue</Typography>
                <Typography variant="h6">$24,317</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <People color="primary" fontSize="large" />
              <div>
                <Typography color="textSecondary">Customers</Typography>
                <Typography variant="h6">146</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <TrendingUp color="warning" fontSize="large" />
              <div>
                <Typography color="textSecondary">Brands</Typography>
                <Typography variant="h6">10</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Link to="/products">
         <Button variant="contained" size="large" color="primary">
          View Detailed Reports
        </Button>
        </Link>
       
      </div>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          marginTop: "4rem", // Increased margin-top for separation
          padding: "1rem 0",
          textAlign: "center",
          borderTop: "1px solid #e0e0e0", // A subtle line above the footer
          color: "text.secondary",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Built by Saksham Kshatri
        </Typography>
      </Box>
    </Container>
  );
}
