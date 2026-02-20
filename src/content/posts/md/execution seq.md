---
title: React 렌더링 우선순위: 이벤트 핸들러 vs Microtask
date: 2026-02-20
processed: true
---

## React 실행 순서

1. 브라우저가 click 이벤트를 발생시킴
2. React가 **synthetic event 핸들러** 실행
3. `setN` → **update 큐**에 추가
4. `Promise.then` → **microtask 큐**에 등록
5. `"handler end"` 출력
6. **이벤트 핸들러 종료**
7. 👉 React가 동기적으로 **render + commit** 수행
8. call stack 비워짐
9. microtask 실행

React render는: call stack이 아직 살아 있는 동안 바로 함수 호출로 실행되니까 microtask보다 먼저 실행되는 거야.

```javascript
- 현재 코드 실행 끝
   ↓
- microtask 전부 실행
   ↓
- 그 다음 macrotask 실행
```

## DOM Execute

DOM 변경 후 실행되는 과정:

- Style 계산
- Layout: 각 요소의 **크기와 위치 계산**
- Paint: 색, 배경, 그림자 등 “픽셀 그리기”
- Composite: 레이어를 GPU로 합성

## 강제 동기 Layout (Forced Reflow)