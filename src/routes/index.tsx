import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<p>Página Inicial</p>}/>

            <Route path="*" element={<Navigate to={'/'}/>} />
        </Routes>
    );
};
