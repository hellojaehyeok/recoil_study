import { selector, selectorFamily } from "recoil";
import fetchApi from "../../server/fetchApi";
import UserType from "../../type/userType";
import clickUserIdState from "../atom/clickUserIdState";

const userListSelector = selector({
    key:"userListSelector",
    get:async ({get}) => {
        const fetchUserData: UserType[] = await fetchApi("users", "GET");
        return fetchUserData;
    }
});

const clickUserSelector = selector({
    key:"clickUserSelector",
    get:async ({get}) => {
        const userId = get(clickUserIdState);
        const fetchUserData: UserType = await fetchApi(`users/${userId}`, "GET");
        return fetchUserData;
    }
});

const selectUserSelector = selectorFamily({
    key:"selectUserSelector",
    get:(userId: number) => async () => {
        const userEl: UserType = await fetchApi(`users/${userId}`, "GET");
        return userEl;
    }
})

export {userListSelector, selectUserSelector, clickUserSelector}