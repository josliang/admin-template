import { defineStore } from "pinia";
import { store } from "../index";

export const useUserStore = defineStore("user", () => {
    const username = ref('');
    const getUserName = computed(() => username.value);

    const setUserName = (val) => {
        username.value = val;
    }

    return {
        username,
        getUserName,
        setUserName,
    };
});

export function useUserStoreWidthOut () {
    return useUserStore(store);
}
