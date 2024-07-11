import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContextProvider";
import PrivateRoute from "./components/PtivateRoute";
import Login from "./page/user/Login";

// const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Home = lazy(() => import("./page/home/Home"));
const About = lazy(() => import("./page/about/About"));
const RegisterAndLogin = lazy(() => import("./page/user/RegisterAndLogin"));

const Loading = () => <div>Loading...</div>;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <RegisterAndLogin />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route element={<PrivateRoute />}>
        <Route
          path="/home"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />
      </Route>
    </>
  )
);

// Create a query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
