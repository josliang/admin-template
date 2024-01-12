import ErrorPage from "@/pages/ErrorPage/ErrorPage.vue";
import RedirectPage from "@/pages/Redirect/Redirect.vue";
import Layout from "@/layout/index.vue";

export const baseRoute = [
    {
        path: "/",
        name: "Root",
        redirect: "/dashboard",
        meta: {
            title: "Root",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/Login/Login.vue"),
        meta: {
            title: "登录",
        },
    },
];

export const ErrorPageRoute = {
    path: "/:pathMatch(.*)*",
    name: "ErrorPageMain",
    component: Layout,
    meta: {
        title: "ErrorPage",
        hideBreadcrumb: true,
    },
    children: [
        {
            path: "/:pathMatch(.*)*",
            name: "ErrorPage",
            component: ErrorPage,
            meta: {
                title: "ErrorPage",
                hideBreadcrumb: true,
            },
        },
    ],
};

export const RedirectRoute = {
    path: "/redirect",
    name: "RedirectMain",
    component: Layout,
    meta: {
        title: "Redirect",
        hideBreadcrumb: true,
    },
    children: [
        {
            path: "/redirect/:path(.*)",
            name: "Redirect",
            component: RedirectPage,
            meta: {
                title: "Redirect",
                hideBreadcrumb: true,
            },
        },
    ],
};
