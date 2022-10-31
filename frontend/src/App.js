import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  DashboardPage,
  NotFoundPage,
  ForgetPasswordPage,
} from "./pages/index";
import RequireAuth from "./components/auth/RequireAuth";

const App = () => (
  <main>
    <BrowserRouter>
      <Routes>
        {/* publuc routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="unauthorized" element={<NotFoundPage />} />
        {/* private routes */}
        <Route element={<RequireAuth roles={["Client", "Deliveryman"]} />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<RequireAuth roles={["Manager"]} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </main>
);

export default App;
