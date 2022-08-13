import CatalogueView from "../home/catalogue";
import { Routes, Route, Navigate } from "react-router-dom";
import { SystemMetric } from "../system";
import Box from "@mui/material/Box";
import { drawerWidth } from "../dashboard";

export const HomeView = () => {
  return (
    <Box
      sx={{
        padding: "24px",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <div style={{ width: "100%", marginBottom: "16px", marginTop: "56px" }}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace={true} />}
          />
          <Route path="/dashboard" element={<SystemMetric />} />
          <Route path="/catalogue/*" element={<CatalogueView />} />
        </Routes>
      </div>
    </Box>
  );
};
