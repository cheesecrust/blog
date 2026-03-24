# Observer API

## MutationObserver

이는 DOM 의 변경을 감지하는 observer

### 개요
과거에 DOM 의 변경사항에 반응 할 수 있도록 Mutation Event API 지정되었습니다.
하지만, 모든 변경에 대한 이벤트를 실행하여 이를 개선하기 위해 여러 번 변경된 후에 전송될 수 있는 callback 을 사용하여 빠르게 하였습니다.

### Mutation Event 

`DOMNodeInserted`, `DOMNodeRemoced`, `DOMSubtreeModified` 와 같은 이벤트 들을 이벤트 리스너에 등록하여 트리거 시킴

**문제**
1. DOM 이 조금만 바뀌어도 동기로 로직이 호출 된다. 
   따라서 100번 DOM 이 바뀌면 이에 대한 로직 호출 100번이 call stack 에 쌓이게 된다.
2. js 코드가 실행되는데 layout read (강제 계산) 의 기회가 너무 많이 생김

따라서 위를 해결하기 위해서 **Mutation Observer**

### Mutation Observer

Mutation Observer 는 위를 보완한 DOM 의 요소 변화를 감지하는 API 입니다.
이는 순수 Js 의 기능으로 react 에 종속된 기능이 아닙니다.

**Mutation Event** 와 차이는 비동기적으로 실행하도록 한다는 것입니다. 
DOM 의 변화 시마다 trigger가 되긴 하지만, 해당 callback 함수은 즉시 실행되지 않고 모아서 한번에 실행됩니다.
이는 microtask 에 등록하여 callstack 이 끝나는 시점에 큐에서 빼서 실행하는 구조 입니다.

따라서 DOM 이 바뀌는 동안에 JS 가 개입하여 동기적으로 실행하지 않기 때문에 위의 event 의 문제들을 겪지 않을 수 있습니다.

하지만, 하나의 callstack 안에서 DOM 을 여러번 바꾼다면, 이에 따른 callback 은 한번 밖에 실행되지 않습니다.

따라서 callstack 이 바뀔때 마다 쌓이거나 실행되도록 하고 싶다면, `requestAnimationFrame()`를 활용해 볼 수 있다.

# document

브라우저가 제공하는 전역 객체로, 어기서 호출하던 현재 페이지의 DOM 트리를 참조하도록 합니다.