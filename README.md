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
위 코드에서 newCount는 컴포넌트에서 받아온 새로운값입니다.    
업데이트함수나 재설정 액션을 전파하는 `DefaultValue`객체일 수 있습니다.    
(useResetRecoilState를 사용하면 DefaultValue로 넘어옵니다.)

set함수 안에서도 `get()`과 `set()`을 사용할 수 있습니다.     
여기서의 `get()`은 상태를 가져오는 것은 동일하지만 구독하고 있는 개념이 아니라 값이 바뀐 것을 감지하지 않습니다.   

`set()`은 두 가지 인자를 받습니다.         
첫 번째는 recoil의 상태(atom)을 넣으며, 두 번째는 새로운 값을 넣습니다.   
그리고 atom을 새로운 값으로 바꿔줍니다.       
countSelecor를 만들어도 다른 atom을 set()할 수 있습니다.     

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


atom과 selector 모두 `useRecoilState`, `useRecoilValue`, `useSetRecoilState`를 사용할 수 있습니다. 

---

<br /><br />

## Async 비동기 서버통신
selector 안에서 서버 통신을 진행합니다.    
selector는 기본적으로 값을 캐싱합니다.
따라서 서버 통신을 한 적이 있으면 값을 기억하고 있기 때문에 추가적으로 요청하지 않습니다.

```typescript
// userSelector.ts
const userListSelector = selector({
    key:"userListSelector",
    get:async ({get}) => {
        const fetchUserData = await fetchApi("users", "GET");
        return fetchUserData; 
    }
});
```

```typescript
// async.tsx
const userList = useRecoilValue(userListSelector);
```
위와 같이 userListSelector를 호출하면 서버에서 데이터를 받아옵니다.      
혹은 `get()`으로 atom 혹은 selector에 의존성을 걸어 해당 값이 바뀔때마다 통신 후 반환해줍니다.     

### load issue
이렇게 통신을 하게되면 문제점이 한가지 있습니다. 서버통신이 완료되기 전에 무엇을 렌더하는지 컴퓨터는 모릅니다.     

#### React.Suspense
[React.Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html)로 이를 해결할 수 있습니다.

```jsx
<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```
React.Suspense란 감싸고 있는 자식 컴포넌트가 렌더되기 전 이라면 fallback에 있는 컴포넌트를 보여줍니다.
이 기능은 안정화된 기능은 아닙니다.

요청 중 에러가 났을 경우에는 `<ErrorBoundary></ErrorBoundary>`를 사용하시면 됩니다.

```jsx
<ErrorBoundary>
    <Suspense fallback={<Spinner />}>
        <ProfilePage />
    </Suspense>
</ErrorBoundary>
```

#### useRecoilValueLoadable
useRecoilValueLoadable를 사용하면 Suspense와 ErrorBoundary를 사용하지 않아도 됩니다.     
useRecoilValueLoadables는 로딩 중일 때, 에러가 났을 때, 로드가 완료되었을 때의 상황을 모두 고려하여 반환합니다.

```jsx
function UserInfo({userID}) {
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}
```

### selectorFamily
서버통신을 하다보면 매게변수가 필요할때가 있습니다.    
`selectorFamily`를 사용하면 되는데요. 인자로 값을 넘겨주면 get에서 받아 사용할 수 있습니다.
```jsx
// userSelector.ts
const selectUserSelector = selectorFamily({
    key:"selectUserSelector",
    get:(userId: number) => async () => {
        const userEl = await fetchApi(`users/${userId}`, "GET");
        return userEl;
    }
})
```
```tsx
// async.tsx
const selectUser = useRecoilValue(selectUserSelector(1));
```


### useRecoilRefresher
이전에 selector안에서 서버 통신을 하게되면 자동적으로 캐싱하여 추가적으로 요청하지 않는다고 하였는데요.    
프로젝트를 하다보면 캐싱이 필요없는 경우도 있습니다.    
`useRecoilRefresher_UNSTABLE`를 사용하면 요청할때 관련된 캐시를 모두 삭제하고 다시 요청합니다.

```tsx
// 캐싱 o
const userList1 = useRecoilValue(userListSelector);
const userList2 = useRecoilValueLoadable(userListSelector);

// 캐싱 x
const refreshUserList = useRecoilRefresher_UNSTABLE(userListSelector);
```