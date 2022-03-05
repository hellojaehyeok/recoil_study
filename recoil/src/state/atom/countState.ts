import { atom } from "recoil";

export default atom<number>({
    key: 'countState',
    default: 0,
});