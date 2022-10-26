import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  WelcomePage,
  LoginPage,
  RegisterPage,
  CompleteRegistrationPage,
} from "./pages/index";

const App = () => (
  <main>
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/complete" element={<CompleteRegistrationPage />} />
      </Routes>
    </BrowserRouter>
  </main>
);

export default App;
