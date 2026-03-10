## extends

ts의 extends는 상속이 아닌 제약조건입니다.

```javascript
class EventBus<T extends Record<string, unknown>>
```

위 처럼 작성되면 위 타입은 만드시 key 를 string 으로 가지는 record 타입이어야 한다는 말입니다.

## any vs unknown

> 🔥 any는 타입 체크를 끄는 것
> 🛡 unknown은 타입 안전하게 “아직 모름”을 표현하는 것

any는 타입 검사를 끄는 것으로 javascript 와 비슷한 동작을 하도록 합니다.
따라서 지양하도록 합니다.

unknown 는 아직 모를 경우에 사용하므로 타입 추론을 합니다.
또한, unknown 은 다른 타입의 변수에 넣을 수 없습니다. <- 이게 가장 큰 차이

## 구조분해 할당

```javascript

```


## EventTarget

`EventTarget`은 브라우저가 기본 제공하는 **이벤트 시스템의 최상위 인터페이스**입니다.

```javascript
class EventTarget {
  addEventListener(type: string, listener: EventListener, options?: { once?: boolean }): void;
  removeEventListener(type: string, listener: EventListener): void;
  dispatchEvent(event: Event): boolean;
}
```
위의 구조를 기본적으로 가지고 있습니다.

