import { dynamicRouter } from "@/router/modules/dynamic";
import { defineStore } from "pinia";
import { store } from "../index";

const DEFAULT_CONFIG = {
    id: "id",
    children: "children",
    pid: "pid",
};
const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config);

const filter = (tree, func, config = {}) => {
    config = getConfig(config);
    const children = config.children;

    function listFilter (list) {
        return list
            .map((node) => ({ ...node }))
            .filter((node) => {
                node[children] = node[children] && listFilter(node[children]);
                return func(node) || (node[children] && node[children].length);
            });
    }

    return listFilter(tree);
};

export const useMenuStore = defineStore("menu", () => {
    const menus = ref([]);
    const hasAddedRouter = ref(false);

    const getMenus = computed(() => menus.value);
    const getHasAddedRouter = computed(() => hasAddedRouter.value);

    const setMenus = (val) => {
        menus.value = val;
    }
    const setHasAddedRouter = () => {
        hasAddedRouter.value = true;
    }
    const generateRouters = (payload) => {
        const permissionsList = payload.data.permissions;
        const routeFilter = (route) => {
            const { meta } = route;
            const { permissions } = meta;
            if (!permissions) return true;
            return permissionsList.some((item) => permissions.includes(item));
        };
        let accessedRouters = filter(dynamicRouter, routeFilter);
        setMenus(accessedRouters);
        return accessedRouters;
    }

    return {
        menus,
        hasAddedRouter,
        getMenus,
        getHasAddedRouter,
        setMenus,
        setHasAddedRouter,
        generateRouters,
    }
});

export function useMenuStoreWidthOut () {
    return useMenuStore(store);
}
