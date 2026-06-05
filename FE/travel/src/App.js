import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes, routesNavSticky, routeAdmin, routeLogin } from "./route/PublicRouter";
import MainLayout from "./Layouts/MainLayout";
import SecondLayout from "./Layouts/SecondLayout";
import AdminLayout from "./Layouts/AdminLayout";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<MainLayout />}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route element={<SecondLayout />}>
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
            </Routes>
        </div>
    );
}

export default App;
