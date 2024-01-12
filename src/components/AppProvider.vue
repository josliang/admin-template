<script setup>
import {useLoadingBar, useDialog, useMessage, useNotification} from 'naive-ui';

// 挂载naive组件的方法至window, 以便在全局使用
const setupNaiveTools = () => {
    window.$loadingBar = useLoadingBar()
    window.$dialog = useDialog()
    window.$message = useMessage()
    window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
    setup() {
        setupNaiveTools()
    },
    render() {
        return h('div')
    },
})
</script>

<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-notification-provider>
                <n-message-provider>
                    <slot></slot>
                    <NaiveProviderContent/>
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>

