import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import BlogDetail from "../Pages/BlogDetail";

const publicRoutes = [
    { path: "/", component: Home },
    //     { path: "genre/:gen", component: Genre },
    //     { path: "search/:title", component: ListSearchMovie },
];

const routesNavSticky = [
    { path: "/blog", component: Blog },
    { path: "/blog/:id", component: BlogDetail },
];

export { publicRoutes, routesNavSticky };
