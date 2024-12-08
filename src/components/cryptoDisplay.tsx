"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoughnutChart from "./doughnutChart";
import CoinsDetails from "./coinsDetails";
import {
  fetchCoinsAsync,
  selectCoins,
  selectCoinsLoading,
  selectCoinsError,
} from "@/lib/features/coins/coinsSlice";
import { AppDispatch } from "@/lib/store";

const CryptoDisplay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector(selectCoins);
  const loading = useSelector(selectCoinsLoading);
  const error = useSelector(selectCoinsError);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchCoinsAsync());
    };

    fetchData();

    // Refresh data every 2 minutes to simulate real-time data
    const interval = setInterval(fetchData, 120000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (error) {
    return (
      <Container maxWidth="md">
        <Card className="mt-4 p-4">
          <Typography color="error" variant="h6" className="text-center">
            Error: {error}
          </Typography>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 1, p: 1, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          CoinMarketCap: Crypto API
        </Typography>
      </Card>

      {loading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "300px",
          }}>
          <CircularProgress />
        </Container>
      ) : (
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}>
            <DoughnutChart coins={coins} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CoinsDetails coins={coins} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CryptoDisplay;
