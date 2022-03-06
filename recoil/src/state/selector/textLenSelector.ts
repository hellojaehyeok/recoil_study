import { selector } from "recoil";
import textState from "../atom/textState";


export default selector({
    key: "textLenSelector",
    get: ({get}): number => {
        const text = get(textState);

        return text.length;
    }
})