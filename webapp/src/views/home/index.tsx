import CatalogueView from "../home/catalogue";
import { Routes, Route, Navigate } from "react-router-dom";

export const HomeView = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalogue" replace={true} />} />
      <Route path="/catalogue/*" element={<CatalogueView />} />
    </Routes>
  );
};
