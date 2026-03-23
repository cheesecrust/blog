---
title: 리랜더링과 useEffect의 이해
date: 2026-03-17
processed: true
---
## 리랜더링

보통의 리랜더링은 **state** 값이나 **store** 값이 변경되었을 때 일어납니다.

## useEffect

`useEffect`는 랜더링 된 후 **사이드 이펙트**를 컨트롤하는 hook 입니다.

- 따라서 의존하는 변수의 값이 변동될 때에 실행되며
- 끝났을 때의 **cleanup 함수**를 callback 으로 지정합니다.

## Hook 

같은 hook 을 호출하게 되면 각각의 component 별로 이에 해당하는 메모리를 할당합니다.
따라서 같은 hook 을 호출하더라도 같은 내용으로 따로 따로 각각의 호출한 component 에 맞춰서 할당되고 맞춰집니다.

hook 에서 useRef 로 요소가 할당되는 경우는 인자로 들어갔을때 .current 에 자동으로 할당 할 수 있습니다.
hook 은 JSX 안에서 호출 할 수 없다.

각 컴포난트 인스턴스 마다 Fiber 라는 노드가 있고, 그 안에 hook list 가 붙어있다.

