import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import RegisterAndLogin from "./page/user/RegisterAndLogin";
const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Home = lazy(() => import("./page/home/Home"));
const About = lazy(() => import("./page/about/About"));

const Loading = () => <div>Loading...</div>;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<Loading />}>
          <Navbar />
        </Suspense>
      }
    >
      <Route
        index
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
      <Route
        path="/user"
        element={
          <Suspense fallback={<Loading />}>
            <RegisterAndLogin />
          </Suspense>
        }
      />
    </Route>
  )
);

//Create a query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
