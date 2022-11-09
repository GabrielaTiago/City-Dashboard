import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Button variant="contained" color="primary">oi</Button>} />

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
