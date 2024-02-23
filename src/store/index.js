import { createPinia } from "pinia";

const store = createPinia();

const resetPlugin = (plugin) => {
    const { store, options } = plugin;
    // 备份初始值
    const initialState = JSON.parse(JSON.stringify(store.$state));
    // 重置
    store.$reset = () => {
        store.$state = JSON.parse(JSON.stringify(initialState));
    };
};

store.use(resetPlugin);

export function setupStore (app) {
    app.use(store);
}

export { store };
