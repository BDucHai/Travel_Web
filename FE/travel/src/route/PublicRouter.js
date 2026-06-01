import Home from "../Pages/Home";
import Blog from "../Pages/Blog";

const publicRoutes = [
    { path: "/", component: Home },
//     { path: "genre/:gen", component: Genre },
//     { path: "search/:title", component: ListSearchMovie },
];

const routesNavSticky = [
    { path: "/blog", component: Blog },
]

export { publicRoutes, routesNavSticky };
