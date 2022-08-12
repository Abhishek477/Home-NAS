import CatalogueView from "../home/catalogue";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const HomeView = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/catalogue" replace={true} />} />
        <Route path="/catalogue/*" element={<CatalogueView />} />
      </Routes>
    </BrowserRouter>
  );
};
