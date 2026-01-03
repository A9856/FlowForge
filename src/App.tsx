import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/layout";
import Dashboard from "./pages/dashboard";
import Board from "./pages/board";
import Settings from "./pages/setting";
import Analytics from "./pages/analytics";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
          <Route path="/analytics" element={<Analytics />} /> 
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
