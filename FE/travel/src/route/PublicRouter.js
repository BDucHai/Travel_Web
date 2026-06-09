import Home from "../Pages/Home";
import Blog from "../Pages/Blog";
import BlogDetail from "../Pages/BlogDetail";
import AboutUs from "../Pages/AboutUs";
import CreateBlog from "../Pages/Admin/CreateBlog";
import Login from "../Pages/Admin/Login";
import BlogManage from "../Pages/Admin/BlogManage";
import Contact from "../Pages/Admin/Contact";
import ReviewAdminPage from "../Pages/Admin/ReviewAdminPage";
import UserManagePage from "../Pages/Admin/UserManagePage";
import SearchTour from "../Pages/SearchTour";
import TourDetail from "../Pages/TourDetail";
import ReviewPage from "../Pages/ReviewPage";

const publicRoutes = [{ path: "/", component: Home }];

const routesNavSticky = [
    { path: "/blog", component: Blog },
    { path: "/blog/:id", component: BlogDetail },
    { path: "/about", component: AboutUs },
    { path: "/tour/:query?", component: SearchTour },
    { path: "/tour/detail/:id", component: TourDetail },
    { path: "/review", component: ReviewPage },
];

const routeAdmin = [
    { path: "/admin/create/blog", component: CreateBlog, roles: ["user", "admin"] },
    { path: "/admin/update/blog/:id", component: CreateBlog, roles: ["user", "admin"] },
    { path: "/admin/review", component: ReviewAdminPage, roles: ["user", "admin"] },
    { path: "/admin/blog", component: BlogManage, roles: ["user", "admin"] },
    { path: "/admin/contact", component: Contact, roles: ["user", "admin"] },
    { path: "/admin/manageUser", component: UserManagePage, roles: ["admin"] },
];

const routeLogin = [{ path: "/admin/login", component: Login }];
export { publicRoutes, routesNavSticky, routeAdmin, routeLogin };
