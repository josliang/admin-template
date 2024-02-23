<template>
    <div class="header-nav-container border-[1px] bg-white border-[#e6e6e6]">
        <div class="nav-left flex items-center">
            <!-- 折叠操作 -->
            <div class="icon-trigger px-[10px]" @click="setCollapsed">
                <n-icon size="18" color="#444">
                    <MenuUnfoldOutlined v-if="collapsed"/>
                    <MenuFoldOutlined v-else/>
                </n-icon>
            </div>
            <!-- 刷新操作 -->
            <div class="icon-trigger px-[10px]" @click="reloadPage">
                <n-icon size="18" color="#444">
                    <ReloadOutlined/>
                </n-icon>
            </div>
            <!-- 面包屑 -->
            <n-breadcrumb class="ml-[14px]">
                <template v-for="breadcrumbItem in breadcrumbList" :key="breadcrumbItem.name">
                    <n-breadcrumb-item>
                        <span class="link-text">
                            <component v-if="breadcrumbItem.meta.icon" :is="breadcrumbItem.meta.icon"/>
                            {{ breadcrumbItem.meta.title }}
                        </span>
                    </n-breadcrumb-item>
                </template>
            </n-breadcrumb>
        </div>
        <div class="flex items-center">
            <!-- 全屏切换 -->
            <div class="icon-trigger px-[10px]" @click="toggle">
                <n-icon size="20" color="#444">
                    <FullScreenMinimize24Regular v-if="isFullscreen"/>
                    <FullScreenMaximize24Regular v-else/>
                </n-icon>
            </div>
            <!-- 个人信息 -->
            <n-dropdown trigger="hover" show-arrow @select="handleSelect" :options="dropdownOptions">
                <div class="icon-trigger px-[10px] space-x-[6px]">
                    <n-avatar :size="35" :src="avatarPNG" round></n-avatar>
                    <span>Person</span>
                </div>
            </n-dropdown>
        </div>
    </div>
</template>

<script setup>
import {MenuUnfoldOutlined, MenuFoldOutlined, ReloadOutlined} from "@vicons/antd";
import {computed} from "vue";
import avatarPNG from "@/assets/images/avatar.png";
import {useFullscreen} from "@vueuse/core";
import {useRoute, useRouter} from "vue-router";
import {
    FullScreenMaximize24Regular,
    FullScreenMinimize24Regular,
} from "@vicons/fluent";
import {useAppStore} from "@/store/modules/app";
import {useMessage} from "naive-ui";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const message = useMessage();

const {isFullscreen, toggle} = useFullscreen();
const emit = defineEmits(["handleCollapsed"]);
const props = defineProps({
    collapsed: {
        type: Boolean,
        required: true,
    },
});
const dropdownOptions = [
    {
        label: "个人设置",
        key: 1,
    },
    {
        label: "退出登录",
        key: 2,
    },
];

const generatorBreadcrumb = (routerMap) => {
    return routerMap.map((item) => {
        const currentMenu = {
            ...item,
            label: item.meta.title,
            key: item.name,
            disabled: item.path === "/",
        };
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            currentMenu.children = generatorBreadcrumb(item.children, currentMenu);
        }
        return currentMenu;
    });
};

const breadcrumbList = computed(() => {
    if (route.meta.hideBreadcrumb) {
        return [];
    }
    return generatorBreadcrumb(route.matched);
});

const setCollapsed = () => {
    emit("handleCollapsed", !props.collapsed);
};

// 刷新页面
const reloadPage = () => {
    const {path, query} = route;
    router.push({
        path: "/redirect" + path,
        query,
    });
};

// 下拉选择
const handleSelect = (key) => {
    if (key === 1) {
    } else if (key === 2) {
        appStore.clearAllState(() => {
            localStorage.removeItem("token");
            router.replace("/login");
            message.success("退出登录成功");
        });
    }
};
</script>

<style lang="scss" scoped>
.header-nav-container {
    height: $headerNavHeight;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .icon-trigger {
        height: $headerNavHeight - 2;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
            background-color: #f3f3f3;
        }
    }

    .link-text {
        i {
            color: #6d7379 !important;
        }
    }
}
</style>
