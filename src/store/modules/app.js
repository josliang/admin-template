import {defineStore} from "pinia";
import {useMenuStore} from "./menu";
import {useTabStore} from "./tab";
import {useUserStore} from "./user";

export const useAppStore = defineStore("app", {
    state: () => ({
        //默认主题
        appTheme: "#41B584",
        //菜单样式
        menuStyle: {
            //正常菜单宽度
            menuWidth: 240,
            //最小宽度
            minMenuWidth: 80,
        },
        //菜单是否折叠状态
        collapsed: false,
        //是否沉浸模式
        immersion: false,
    }),
    getters: {
        getAppTheme() {
            return this.appTheme;
        },
        getMenuStyle() {
            return this.menuStyle;
        },
        getIsCollapsed() {
            return this.collapsed;
        },
        getIsImmersion() {
            return this.immersion;
        },
    },
    actions: {
        setAppTheme(theme) {
            this.appTheme = theme;
        },
        setIsCollapsed(collapsed) {
            this.collapsed = collapsed;
        },
        setIsImmersion(immersion) {
            this.immersion = immersion;
        },
        clearAllState(callback) {
            const menuStore = useMenuStore();
            const tabStore = useTabStore();
            const userStore = useUserStore();
            menuStore.clearState();
            tabStore.clearState();
            userStore.clearState();
            callback && callback();
        },
    },
});
