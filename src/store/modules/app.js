import { defineStore } from "pinia";
import { useMenuStore } from "./menu";
import { useTabStore } from "./tab";
import { useUserStore } from "./user";

export const useAppStore = defineStore("app", () => {
    //默认主题
    const appTheme = ref('#41B584');
    //菜单样式
    const menuStyle = reactive({
        //正常菜单宽度
        menuWidth: 240,
        //最小宽度
        minMenuWidth: 80,
    })
    //菜单是否折叠状态
    const collapsed = ref(false);
    //是否沉浸模式
    const immersion = ref(false);

    const getAppTheme = computed(() => appTheme.value);
    const getMenuStyle = computed(() => menuStyle);
    const getIsCollapsed = computed(() => collapsed.value);
    const getIsImmersion = computed(() => immersion.value);

    const setAppTheme = (val) => {
        appTheme.value = val;
    }
    const setIsCollapsed = (val) => {
        collapsed.value = val;
    }
    const setIsImmersion = (val) => {
        immersion.value = val;
    }
    const clearAllState = (callback) => {
        const menuStore = useMenuStore();
        const tabStore = useTabStore();
        const userStore = useUserStore();
        menuStore.$reset();
        tabStore.$reset();
        userStore.$reset();
        callback && callback();
    }

    return {
        appTheme,
        menuStyle,
        collapsed,
        immersion,
        getAppTheme,
        getMenuStyle,
        getIsCollapsed,
        getIsImmersion,
        setAppTheme,
        setIsCollapsed,
        setIsImmersion,
        clearAllState,
    }
});
