import { defineStore } from "pinia";
import { toRaw } from "vue";

const whiteList = ["Redirect", "Login"];

export const useTabStore = defineStore("tab", () => {
    const tabList = ref([]);

    // 初始化标签页
    const initTabs = (routes) => {
        tabList.value = routes;
    }
    // 添加标签页
    const addTabList = (route) => {
        if (whiteList.includes(route.name)) return false;
        const findIndex = tabList.value.findIndex((item) => item.name === route.name);
        if (findIndex !== -1) {
            const tempList = toRaw(tabList.value);
            tempList[findIndex] = route;
            tabList.value = tempList;
        } else {
            tabList.value.push(route);
        }
        return true;
    }
    // 关闭左侧
    const closeLeftTabs = (route) => {
        const index = tabList.value.findIndex((item) => item.name == route.name);
        tabList.value.splice(0, index);
    }
    // 关闭右侧
    const closeRightTabs = (route) => {
        const index = tabList.value.findIndex((item) => item.name == route.name);
        tabList.value.splice(index + 1);
    }
    // 关闭其他
    const closeOtherTabs = (route) => {
        tabList.value = tabList.value.filter((item) => item.name == route.name);
    }
    // 关闭当前页
    const closeCurrentTab = (route) => {
        const index = tabList.value.findIndex((item) => item.name == route.name);
        tabList.value.splice(index, 1);
    }

    return {
        tabList,
        initTabs,
        addTabList,
        closeLeftTabs,
        closeRightTabs,
        closeOtherTabs,
        closeCurrentTab,
    }
});
