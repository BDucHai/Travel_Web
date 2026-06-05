import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import BlogDetail from "../Pages/BlogDetail";
import AboutUs from "../Pages/AboutUs";
import CreateBlog from "../Pages/Admin/CreateBlog";

const publicRoutes = [
    { path: "/", component: Home },
];

const routesNavSticky = [
    { path: "/blog", component: Blog },
    { path: "/blog/:id", component: BlogDetail },
    {path: "/about", component: AboutUs}
];

const routeAdmin = [
    { path: "/admin/login", component: Login },
    { path: "/admin/create/blog", component: CreateBlog}
]

const routeLogin = [
    { path: "/admin/login", component: Login },
]
export { publicRoutes, routesNavSticky, routeAdmin, routeLogin };
