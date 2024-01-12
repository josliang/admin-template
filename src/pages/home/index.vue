<template>
    <div text-gray-500 m-15>
        <!-- pinia 获取状态 -->
        <p text-24px mb-10px>{{ username }} home</p>
        <div>
            <!-- ref 数据响应和传参 -->
            <n-button @click="num++" mr-5>count is {{ num }}</n-button>
            <HelloWorld v-model="num"></HelloWorld>
        </div>
    </div>
    <n-divider/>
    <n-space m-15>
        <!-- naive 组件主题展示 -->
        <n-button>default</n-button>
        <n-button type="tertiary"> Tertiary</n-button>
        <n-button type="primary"> Primary</n-button>
        <n-button type="info"> Info</n-button>
        <n-button type="success"> Success</n-button>
        <n-button type="warning"> Warning</n-button>
        <n-button type="error"> Error</n-button>
    </n-space>
    <n-divider/>
    <n-space m-15>
        <n-button circle>
            <template #icon>
                <!-- 直接使用 icon -->
                <icon-maki:aerialway color="#000" text-18px/>
            </template>
        </n-button>
        <n-button circle v-for="item in icons">
            <template #icon>
                <!-- 动态图标渲染 -->
                <Icon :icon="item" text-18px></Icon>
            </template>
        </n-button>
    </n-space>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {Icon} from "@iconify/vue";
import {useUserStore} from '@/store/useUserStore';

const userStore = useUserStore();
const {username} = storeToRefs(userStore);

const num = ref(0);

const icons = [
    'ph:address-book',
    'ph:air-traffic-control-light'
]
</script>

<style lang="scss" scoped>
</style>
