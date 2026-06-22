import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  publicRoutes,
  routesNavSticky,
  routeAdmin,
  routeLogin,
} from "./route/PublicRouter";
import MainLayout from "./Layouts/MainLayout";
import SecondLayout from "./Layouts/SecondLayout";
import AdminLayout from "./Layouts/AdminLayout";
import ScrollToTop from "./utils/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<MainLayout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        <Route path="/" element={<SecondLayout />}>
          {routesNavSticky.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        {/* AAdmin */}

        <Route>
          {routeLogin.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>

        <Route element={<AdminLayout />}>
          {routeAdmin.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>

        {/* <Route element={<AdminLayout />}>
                    {routeAdmin.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={
                              <ProtectedRoute
                                component={Page}
                                roles={route.roles}
                            />
                        } />;
                    })}
                </Route> */}

        <Route path="/403" element={<h1>Access Denied</h1>} />
      </Routes>
    </div>
  );
}

export default App;
