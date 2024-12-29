import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../../store/AuthStore";

export function SidebarLinks(props) {
    const { user, fetchUser } = useUserStore();
    const location = useLocation();
    const { routes } = props;

    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    };

    useEffect(() => {
        fetchUser()
    }, [fetchUser]);
    const checkPermission = (routeName) => {
        const permissions = user?.otherPermissions || {};
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
            case "chat": return true;
            default: return false;
        }
    };

    const createLinks = (routes) => {
        return routes.map((route, index) => {
            if (route.layout === "/admin" && route.navMenu === true && checkPermission(route.path)) {
                return (
                    <Link key={index} to={route.layout + "/" + route.path}>
                        <div className={`relative mb-5 flex hover:cursor-pointer ${activeRoute(route.path) ? "text-primary font-bold" : "text-gray-500"}`}>
                            <li className="my-[3px] flex cursor-pointer items-center px-8">
                                <span>{route.icon}</span>
                                <p className="leading-1 ml-4 uppercase tracking-wider">
                                    {route.name}
                                </p>
                            </li>
                            {activeRoute(route.path) && (
                                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-primary" />
                            )}
                        </div>
                    </Link>
                );
            }
            return null;
        });
    };

    return <ul>{createLinks(routes)}</ul>;
}

export default SidebarLinks;
