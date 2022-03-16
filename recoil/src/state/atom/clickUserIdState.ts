
import { atom } from "recoil";

export default atom<number>({
    key: 'userIdState',
    default: 0,
});