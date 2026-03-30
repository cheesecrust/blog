---
title: State와 Props의 이해 및 활용
date: 2026-03-30
processed: true
---

## State vs Props

### State
**State**는 컴포넌트에서 들고 있는 값 입니다.

### Props
**Props**는 상위 컴포넌트에서 하위로 인자를 통해서 내려주는 값입니다.

## State

- 무엇을 State 로 설정해야 하는가?
    **State**는 앱이 기억해야하는 최소한의 변경 가능한 **data**의 집합으로 표현됩니다.

    State 로 설정하지 않는 데이터 특징
    - 시간이 지나도 변하지 않는다.
    - 부모 class 에서 **props** 를 통해 전달합니다.
    - 컴포넌트의 기존 상태나 속성을 기반으로 연산할 수 있습니다.

- State 를 어디에서 관리해야 하는가?
    여러 **state** 를 사용하는 component 들의 공통 상위 컴포넌트에서 관리하도록 합니다.
    -> 좀 더 나아가면 **state** 가 영향을 미치는 component 들의 공통 부모로 갑니다. 따라서 **state** 가 하나의 컴포넌트에만 영향을 미친다면, 굳이 상위로 빼지 않아도 됩니다.
    그리고 필요한 자식 component 에 **props** 를 이용하여 내려주어 활용하도록 합니다.
    이는 react 의 data flow 인 **top down data flow** 에 잘 맞는 방식입니다.

- State 의 변경은 어떻게 관리해야 하는가?
    **State** 의 변경은 react 의 hook 인 **useState** 를 통해 **set 함수**를 통해서 **state** 의 값을 변경합니다.
    이때의 **set callback 함수**를 인자로 같이 넘겨서 하위 컴포넌트에서 값을 설정할 수 있도록 합니다.