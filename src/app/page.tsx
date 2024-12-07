import Crypto from "@/components/crypto";
import TodoList from "@/components/todoList";
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
        <TodoList />
        <Crypto />
      </section>
      <PageFooter />
    </main>
  );
}
