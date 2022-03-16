import { selector, selectorFamily } from "recoil";
import fetchApi from "../../server/fetchApi";
import UserType from "../../type/userType";

const userListSelector = selector({
    key:"userListSelector",
    get:async ({get}) => {
        const fetchUserData: UserType[] = await fetchApi("users", "GET");
        console.log(fetchUserData)
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

export {userListSelector, selectUserSelector}