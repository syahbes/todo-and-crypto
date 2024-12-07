import TodoList from "@/components/todoList";
import CryptoDisplay from "@/components/cryptoDisplay";
import PageFooter from "@/components/footer";
import HeroHeader from "@/components/heroHeader";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import "@/styles/main.css";

export default function Home() {
  return (
    <main className="page">
      <header>
        <HeroHeader />
      </header>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TodoList />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CryptoDisplay />
          </Grid>
        </Grid>
      </Box>
      <PageFooter />
    </main>
  );
}
