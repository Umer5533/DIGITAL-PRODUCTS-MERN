import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin/*"
      element={
        <ProtectedRoute>
            <AdminRoutes/>
        </ProtectedRoute>
      }
      />
      </Routes>
    </>
  );
}


const AdminRoutes = () =>{
  return (
    <Routes>
      <Route path="/" element={<Admin />}/>
      <Route path="/product/create" element={<CreateProduct/>}/>
      <Route path="/product/edit/:id" element={<EditProduct/>}/>
      <Route path="/product/delete/:id" element={<DeleteProduct/>}/>
    </Routes>
  )
}


export default App;
