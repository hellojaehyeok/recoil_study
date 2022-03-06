# Recoil

최근에 주목받고 있는 상태관리툴 "Recoil"을 알아보겠습니다.    
해당 README 에서는 리코일을 러프하게 다룰예정이며 이후 블로그에서 구체적으로 다루겠습니다.    


## Atoms
atom은 상태의 단위이며, 업데이트와 구독이 가능합니다.    
쉽게 말해 redux의 store같은 개념입니다.     
atom이 업데이트되면 각각의 사용하고있는 컴포넌트에서는 새로운 값으로 리렌더링됩니다.     

```typescript
import { atom } from "recoil";

export default atom<number>({
    key: 'countState',
    default: 0,
});
```
사용법은 간단합니다.     
atom안에 key값과  default값을 설정해줍니다.     

* key   
key값은 atom을 식별하는데 필요한 고유한 문자열입니다.    
프로젝트 전체에서 다른 atom, selector에 대해 고유해야 합니다.    

* default    
초기값을 선언해줍니다.

<br /><br />

## Selector
Selector는 atom에서는 불가능한 비동기 처리와 복잡한 로직을 구현할 수 있습니다.    
순수함수로 이루어져 있으며 key, get과 set 속성이 있습니다.     

```typescript
import { selector } from "recoil";
import countState from "../atom/countState";

export default selector({
    key: "countSelector",
    get: ({get}): number => {
        const count = get(countState);
        return count + 1;
    },
    set: ({set, get}, newCount:any)=>{
        const count = get(countState);
        console.log(count);
        return set(
            countState,
            newCount+10,
        )
    }
})
```

* key       
atom과 동일하게 전역적으로 고유한 문자열을 설정해야 합니다.

* get     
이 함수에서 반환하는 값을 외부 컴포넌트에서 사용합니다.     
`get()`으로 가져온 atom 값들을 구독하고 있으며 값들이 바뀔 때마다 새로운 값을 반환합니다.     
복수로 구독이 가능합니다.     
  
* set    
get함수만 제공되면 selector는 읽기만 가능한 상태(RecoilValueReadOnly)를 반환하지만,       
set함수가 제공되면 쓰기도 가능한 상태(RecoilState)를 반환합니다.         

set함수 안에서도 `get()`과 `set()`을 사용할 수 있습니다.     
여기서의 `get()`은 상태를 가져오는 것은 동일하지만 구독하고 있는 개념이 아니라 값이 바뀐 것을 감지하지 않습니다.   

`set()`은 두 가지 인자를 받습니다.         
첫 번째는 recoil의 상태(atom)을 넣으며, 두 번째는 새로운 값을 넣습니다.    
그리고 atom을 새로운 값으로 바꿔줍니다.

플로우를 보면 다음과 같습니다.    
1. `get()`에서 atom을 구독하고 있습니다.
2. `set()`에서 atom의 값을 변경합니다.
3. `get()`은 새롭게 바뀐 값을 인지하고 반환합니다.

<br /><br />

---

지금까지 recoil의 큰 개념인 atom, selector를 알아보았습니다.     
이제 이것을 컴포넌트에서 활용해 보겠습니다.    

<br /><br />

## useRecoilState
```javascript
import countState from '../state/atom/countState';

const [count, setCount] = useRecoilState(countState);
```
useState와 동일하게 생겼습니다.     
count는 값을 읽을 때(get) setCount는 값을 변경할 때(set) 사용합니다.

## useRecoilValue, useSetRecoilState
```javascript
const count = useRecoilValue(countState);
const setCount = useSetRecoilState(countState);
```
`useRecoilState`를 반으로 나눈건이 `useRecoilValue`와 `useSetRecoilState`입니다.


## useResetRecoilState
```javascript
const resetCount = useResetRecoilState(countState);
...
resetCount();
```
atom의 상태값을 초깃값으로 돌아가고 싶을 때 사용합니다.

---

atom과 selector 모두 `useRecoilState`, `useRecoilValue`, `useSetRecoilState`를 사용할 수 있습니다. 