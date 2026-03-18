---
title: 리랜더링과 useEffect의 이해
date: 2026-03-17
processed: true
---

## ref

## 리랜더링

보통의 리랜더링은 **state** 값이나 **store** 값이 변경되었을 때 일어납니다.

## useEffect

`useEffect`는 랜더링 된 후 **사이드 이펙트**를 컨트롤하는 hook 입니다.

- 따라서 의존하는 변수의 값이 변동될 때에 실행되며
- 끝났을 때의 **cleanup 함수**를 callback 으로 지정합니다.