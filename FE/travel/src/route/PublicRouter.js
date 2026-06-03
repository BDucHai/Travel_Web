import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import BlogDetail from "../Pages/BlogDetail";
import AboutUs from "../Pages/AboutUs";
import CreateBlog from "../Pages/Admin/CreateBlog";

const publicRoutes = [
    { path: "/", component: Home },
    {path: "/about", component: AboutUs}
];

const routesNavSticky = [
    { path: "/blog", component: Blog },
    { path: "/blog/:id", component: BlogDetail },
];

const routeAdmin = [
    { path: "/admin/create/blog", component: CreateBlog},
]

export { publicRoutes, routesNavSticky, routeAdmin };
