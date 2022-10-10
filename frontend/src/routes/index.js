import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../Components/Global/header";
import AuthCheck from "./privateRoute";

// ** Components imported
const Home = React.lazy(() => import("../Components/Home"));
const Login = React.lazy(() => import("../Components/Auth/Login"));
const Register = React.lazy(() => import("../Components/Auth/Register"));
const Dashboard = React.lazy(() => import("../Components/Dashboard"));
const Users = React.lazy(() => import("../Components/Users"));
const AddEdit = React.lazy(() => import("../Components/Users/addEdit"));
const Products = React.lazy(() => import("../Components/Products"));
const ProductsAddEdit = React.lazy(() => import("../Components/Products/addEdit"));

const RoutesList = () => {
  return (
    <Router>
      <main className="main" id="main">
        <NavBar />
        <Suspense fallback={<div>Component Loading</div>}>
          <Routes>
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <AuthCheck>
                  <Home />
                </AuthCheck>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthCheck>
                  <Dashboard />
                </AuthCheck>
              }
            />
            <Route
              path="/users"
              element={
                <AuthCheck>
                  <Users />
                </AuthCheck>
              }
            />
            <Route
              path="/users/add"
              element={
                <AuthCheck>
                  <AddEdit />
                </AuthCheck>
              }
            />
            <Route
              path="/users/edit/:id"
              element={
                <AuthCheck>
                  <AddEdit />
                </AuthCheck>
              }
            />
            <Route
              path="/products"
              element={
                <AuthCheck>
                  <Products />
                </AuthCheck>
              }
            />
            <Route
              path="/products/add"
              element={
                <AuthCheck>
                  <ProductsAddEdit />
                </AuthCheck>
              }
            />
            <Route
              path="/products/edit/:id"
              element={
                <AuthCheck>
                  <ProductsAddEdit />
                </AuthCheck>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default RoutesList;
