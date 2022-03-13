import { DefaultValue, selector } from "recoil";
import countState from "../atom/countState";


export default selector({
    key: "countSelector",
    get: ({get}): number => {
        const count = get(countState);
        return count + 1;
    },
    set: ({set, get}, newCount:any)=>{
        return set(
            countState,
            newCount instanceof DefaultValue?newCount:newCount+10,
        )
    }
})