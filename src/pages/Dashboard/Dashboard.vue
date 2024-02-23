<template>
    <div class="dashboard-container">
        <div class="charts-row grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-2">
            <div class="viewMount">
                <div class="chart-header">
                    <div class="left-title space-x-[2px]">
                        <n-icon color="#3a4446" size="18">
                            <AreaChartOutlined />
                        </n-icon>
                        <span>访问量</span>
                    </div>
                    <div class="right-unit" :style="{ backgroundColor: currentTheme }">日</div>
                </div>
                <div ref="viewMountChart" style="width: 100%; height: 250px"></div>
            </div>
        </div>
        <div class="demo-box mt-[20px] w-[360px]">
            <n-space size="large" vertical>
                <n-button type="primary">这是一个按钮</n-button>
                <n-input type="text" placeholder="基本的 Input" />
                <n-switch :default-value="true" />
            </n-space>
        </div>
    </div>
</template>

<script setup>
import { useEcharts } from "@/hooks/useECharts";
import { useAppStore } from "@/store/modules/app";
import { lighten } from "@/utils";
import _echarts from "@/utils/echarts";
import { AreaChartOutlined } from "@vicons/antd";

const appStore = useAppStore();
const currentTheme = computed(() => appStore.getAppTheme);
const viewMountChart = ref(null);

const options = {
    color: "#41b584",
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#4a4446",
            },
        },
    },
    grid: {
        left: "3%",
        top: "10%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
    ],
    yAxis: [
        {
            type: "value",
        },
    ],
    series: [
        {
            name: "访问量",
            type: "line",
            smooth: true,
            lineStyle: {
                width: 0,
            },
            label: {
                show: true,
            },
            areaStyle: {
                opacity: 0.8,
                color: new _echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: lighten(currentTheme.value, 50),
                    },
                    {
                        offset: 1,
                        color: currentTheme.value,
                    },
                ]),
            },
            emphasis: {
                focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
        },
    ],
};

const { updateOptions } = useEcharts(viewMountChart, options);
</script>

<style lang="scss" scoped>
.viewMount {
    width: 100%;
    height: 300px;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.06),
        0 5px 12px 4px rgba(0, 0, 0, 0.04);
    border: 1px solid #efeff5;

    .chart-header {
        padding: 0 10px;
        border-bottom: 1px solid #e5e6e7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;

        .left-title {
            display: flex;
            color: #3a4446;
        }

        .right-unit {
            color: #fff;
            padding: 1px 6px;
            border-radius: 2px;
        }
    }
}
</style>
