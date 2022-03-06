import { selector, selectorFamily } from "recoil";
import fetchApi from "../../server/fetchApi";

const userListSelector = selector({
    key:"userListSelector",
    get:async ({get}) => {
        const fetchUserData = await fetchApi("users", "GET");
        return fetchUserData;
    }
});

const selectUserSelector = selectorFamily({
    key:"selectUserSelector",
    get:(userId: number) => async () => {
        const userEl = await fetchApi(`users/${userId}`, "GET");
        return userEl;
    }
})

export {userListSelector, selectUserSelector}