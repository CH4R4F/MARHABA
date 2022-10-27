import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, CompleteRegistrationPage } from "./pages/index";

const App = () => (
  <main>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/complete" element={<CompleteRegistrationPage />} />
      </Routes>
    </BrowserRouter>
  </main>
);

export default App;
