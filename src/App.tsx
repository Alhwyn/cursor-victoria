import "./index.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Playground } from "./components/Playground";
import { Stack } from "./components/Stack";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Playground />
        <Stack />
      </main>
      <Footer />
    </div>
  );
}

export default App;
