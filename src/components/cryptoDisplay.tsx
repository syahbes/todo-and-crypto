import { Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoughnutChart from "./doughnutChart";
import CoinsDetails from "./coinsDetails";

const coins = [
    {
        name: "Ethereum",
        symbol: "ETH",
        price: 3500,
        market_cap: 5000000000,
        volume_24h: 4322500000,
        percent_change_24h: 30,
    },
    {
        name: "USD Coin",
        symbol: "USDC",
        price: 2000,
        market_cap: 5000000000,
        volume_24h: 66656000,
        percent_change_24h: 20,
    },
    {
        name: "Tether",
        symbol: "USDT",
        price: 3000,
        market_cap: 40000000,
        volume_24h: 2212300,
        percent_change_24h: 10,
    },
]
 
export default function CryptoDisplay() {
  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 1, p: 1, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          CoinMarketCap: Crypto API
        </Typography>
      </Card>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
          <DoughnutChart coins={coins} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CoinsDetails coins={coins} />
        </Grid>
      </Grid>
    </Container>
  );
}
