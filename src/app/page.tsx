import { Box, Container, Grid2, Paper } from "@mui/material";
import Crypto from "@/components/crypto";
import Todo from "@/components/todo";
import PageFooter from "@/components/footer";
import HeroHeader from "@/components/heroHeader";
import "@/styles/main.css";

export default function Home() {
  return (
    <main className="page">
      <header>
        <HeroHeader />
      </header>
      <section className="page-section">
        <Todo />
        <Crypto />
      </section>
      <PageFooter />
    </main>
  );
}
