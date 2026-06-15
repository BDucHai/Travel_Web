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
import TourManage from "../Pages/Admin/TourManage";
import CreateTour from "../Pages/Admin/CreateTour";
import ProfilePage from "../Pages/Admin/ProfilePage";
import DestinationList from "../Pages/Admin/DestinationList";
import CreateDestination from "../Pages/Admin/CreateDestination";
import StylesPage from "../Pages/StylePage";

const publicRoutes = [{ path: "/", component: Home }];

const routesNavSticky = [
    { path: "/blog", component: Blog },
    { path: "/blog/detail/:id", component: BlogDetail },
    { path: "/about", component: AboutUs },
    { path: "/tours", component: SearchTour },
    { path: "/tours/detail/:id", component: TourDetail },
    { path: "/review", component: ReviewPage },
    { path: "/styles", component: StylesPage },
];

const routeAdmin = [
    { path: "/admin/create/blog", component: CreateBlog, roles: ["user", "admin"] },
    { path: "/admin/update/blog/:id", component: CreateBlog, roles: ["user", "admin"] },
    { path: "/admin/review", component: ReviewAdminPage, roles: ["user", "admin"] },
    { path: "/admin/blog", component: BlogManage, roles: ["user", "admin"] },
    { path: "/admin/contact", component: Contact, roles: ["user", "admin"] },
    { path: "/admin/manageUser", component: UserManagePage, roles: ["admin"] },
    { path: "/admin/tour", component: TourManage, roles: ["user", "admin"] },
    { path: "/admin/create/tour", component: CreateTour, roles: ["user", "admin"] },
    { path: "/admin/create/tour/:id", component: CreateTour, roles: ["user", "admin"] },
    { path: "/admin/profile/:id", component: ProfilePage, roles: ["user", "admin"] },
    { path: "/admin/destinations", component: DestinationList, roles: ["user", "admin"] },
    { path: "/admin/destinations/create/:id?", component: CreateDestination, roles: ["user", "admin"] },
];

const routeLogin = [
    { path: "/admin/login", component: Login },
    { path: "/admin", component: Login },
];
export { publicRoutes, routesNavSticky, routeAdmin, routeLogin };
