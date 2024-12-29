import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import menu from "../menu";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar";
import useUserStore from "../store/AuthStore";

export default function Admin(props) {
    const { ...rest } = props;
    const location = useLocation();
    const { user } = useUserStore()
    const [open, setOpen] = React.useState(true);
    const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

    React.useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
    }, []);
    React.useEffect(() => {
        getActiveRoute(menu);
    }, [location.pathname]);

    const getActiveRoute = (menu) => {
        let activeRoute = "Main Dashboard";
        for (let i = 0; i < menu.length; i++) {
            if (
                window.location.href.indexOf(
                    menu[i].layout + "/" + menu[i].path
                ) !== -1
            ) {
                setCurrentRoute(menu[i].name);
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (
                window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
            ) {
                return routes[i].secondary;
            }
        }
        return activeNavbar;
    };


    const getFirstAccessibleRoute = (menu) => {
        const permissions = user?.otherPermissions || {};
        for (let i = 0; i < menu.length; i++) {
            const routeName = menu[i].path;
            if (checkPermission(routeName, permissions)) {
                return menu[i].path;
            }
        }
        return "default";
    };

    const checkPermission = (routeName, permissions) => {
        switch (routeName) {
            case 'vendor': return permissions.isVendor;
            case 'customer': return permissions.isCustomer;
            case 'categories': return permissions.isCategories;
            case 'products': return permissions.isProducts;
            case 'order-review': return permissions.isOrders;
            case 'vouchers': return permissions.isVouchers;
            case 'ads-manager': return permissions.isAdManager;
            case 'role-manager': return permissions.isRoleManager;
            case 'message-center': return permissions.isMessageCenter;
            case 'finance': return permissions.isFinance;
            case 'shipment': return permissions.isShipment;
            case 'support': return permissions.isSupport;
            case 'event-manager': return permissions.isEventManager;
            case 'default': return permissions.isHasDashboard;
            case 'banner-img': return permissions.isHasBanner;
            default: return false;
        }
    };
    const firstRoute = getFirstAccessibleRoute(menu);
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route path={`/${prop.path}`} element={prop.component} key={key} />
                );
            } else {
                return <React.Fragment key={key} />;
            }
        });
    };


    document.documentElement.dir = "ltr";
    return (
        <div className="flex h-full w-full">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            {/* Navbar & Main Content */}
            <div className="h-full w-full bg-[#F4F7FE] ">
                {/* Main Content */}
                <main
                    className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
                >
                    <div className="h-full">
                        <Navbar
                            onOpenSidenav={() => setOpen(true)}
                            logoText={"Dashboard"}
                            brandText={currentRoute}
                            secondary={getActiveNavbar(menu)}
                            {...rest}
                        />
                        <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            <Routes>
                                {getRoutes(menu)}

                                <Route
                                    path="/"
                                    element={<Navigate to={`/admin/${firstRoute}`} replace />}
                                />
                            </Routes>
                        </div>
                        <div className="p-3">
                            {/* <Footer /> */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
