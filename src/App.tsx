import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { AddHeroForm } from "./components/AddHeroForm";
import { useState } from "react";
import { Outlet } from "react-router-dom";


function App() {
  const [adding, setAdding] = useState<boolean>(false);

  return (
    <>
      {adding && <AddHeroForm setAdding={setAdding} />}
      <Container>
        <Header adding={adding} setAdding={setAdding} />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
