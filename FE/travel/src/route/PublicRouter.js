import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import BlogDetail from "../Pages/BlogDetail";
import AboutUs from "../Pages/AboutUs";
import CreateBlog from "../Pages/Admin/CreateBlog";
import Login from "../Pages/Admin/Login";
import BlogManage from "../Pages/Admin/BlogManage";
import ReviewAdminPage from "../Pages/Admin/ReviewAdminPage";

const publicRoutes = [{ path: "/", component: Home }];

const routesNavSticky = [
    { path: "/blog", component: Blog },
    { path: "/blog/:id", component: BlogDetail },
    { path: "/about", component: AboutUs },
];

const routeAdmin = [
    { path: "/admin/create/blog", component: CreateBlog },
    { path: "/admin/update/blog/:id", component: CreateBlog },
    { path: "/admin/review", component: ReviewAdminPage },
    { path: "/admin/blog", component: BlogManage },
];

const routeLogin = [{ path: "/admin/login", component: Login }];
export { publicRoutes, routesNavSticky, routeAdmin, routeLogin };
