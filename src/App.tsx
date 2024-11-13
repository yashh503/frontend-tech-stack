import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { loadProfile } from "./slice/authSlice";
import Loading from "./components/ui/loading";

function App() {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    if (!user.isAuthenticated && authToken) {
      dispatch(loadProfile());
    }
  }, [user]);
  if (user.isLoading) {
    return <Loading />; // You can replace this with a spinner or similar
  }
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex items-center justify-center">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        }
      ></Suspense>
      <Routes>
        <Route
          path="/"
          element={
            user?.isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            user.isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user.isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
