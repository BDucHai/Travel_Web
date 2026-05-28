import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes } from "./route/PublicRouter";
import MainLayout from "./Layouts/MainLayout";

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
            </Routes>
        </div>
    );
}

export default App;
