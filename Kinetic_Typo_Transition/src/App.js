import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "./App.css";
import { CurrentItemState } from "./atoms/CurrentItemAtom";
import ArticlePage from "./components/ArticlePage";
import Articles from "./articles";
import Home from "./components/Home";

function App() {
  const currentItem = useRecoilValue(CurrentItemState);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<ArticlePage />} />
      </Routes>
    </main>
  );
}

export default App;
