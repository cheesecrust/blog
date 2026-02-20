
## 렌더링

### setState()

```javascript
const [count, setCount] = useState(0)
```

위 처럼 선언할 경우 count 변수를 setCount() 로 컨트롤이 가능합니다. 또한, 이를 활용할 경우 리렌더링을 하여 반영합니다.

rendering 의 시점은 스케줄러 에서 판단합니다. useState 는 스케쥴러 큐에 렌더링 작업만을 등록하고 스케쥴러가 판단해서 실행합니다.

setCount 의 업데이트는 render 전에 실행되는것이 아닌 render 를 하는중에 업데이트에 대한 로직을 처리하여 값을 확정짓습니다.

```bash
setState
   ↓
update 객체 생성
   ↓
hook queue에 push
   ↓
root에 작업 표시
   ↓
스케줄러가 render 작업 예약
   ↓
render 시작
   ↓
queue 처리 → 새 state 계산
   ↓
commit
```
### snapshot
count의 값은 렌더링이 반영되기 전에는 반영되지 않고 snapshot 형태로 저장됩니다.

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  console.log("render:", count);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
        console.log("click:", count);
      }}
    >
      {count}
    </button>
  );
}

```

따라서 위의 경우에 출력을 하게되면 아래처럼 출력됩니다. 이는 javascript closer 와도 관련이 있습니다. closer 에서 전의 값을 유지하고 있기 떄문에, 해당 render 시점에 생성된 값을 계속 사용하게 됩니다.

``` bash
render: 0 
click: 0 
render: 1
```

따라서 이때 `setCount(count + 1)` 을 많이 호출 하여도 다음의 count 값은 1만 증가됩니다.
하지만 이를 변화시키고 싶은 경우 `setCount(prev => prev + 1)` 이 처럼 전의 값을 계속 증가시키는 형태도 가능합니다.

**React가 snapshot을 쓰는 이유**
- render 계산 중에는 state/props가 변하면 안 되기 때문에 React는 render 시작 시점의 값을 “snapshot”으로 고정한다.

