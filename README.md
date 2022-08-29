## task 1/5

Сейчас корзина товаров работает с захардкоженными данными. На практике такого не бывает и, как правило, данные запрашиваются с бэкенда. Мы подготовили уже знакомый вам файл `fakeApi.js`. В этом задании попробуем забирать данные оттуда с использованием усилителя `redux-thunk`.

Сначала возьмём в работу самый простой запрос, который будет возвращать список товаров корзины. Для этого нужно подготовить усилитель в директории `actions` файла `cart.js`. Импортируйте запрос `getItemsRequest` и расширьте тип экшенов. Добавьте три экшена:

-   `GET_ITEMS_REQUEST` — отображается, если запрос отправлен.
-   `GET_ITEMS_SUCCESS` — показывается в случае успеха, когда запрос выполнен и данные получены.
-   `GET_ITEMS_FAILED` — используется в случае ошибки.

После создайте в том же файле асинхронный экшен `getItems`. В самом начале отправляйте экшен `GET_ITEMS_REQUEST`. После экшена — запрос с использованием ранее импортированной функции `getItemsRequest`. Если ответ пришёл и свойство `success` равно `true` — отправьте в редьюсер экшен `GET_ITEMS_SUCCESS`, а в качестве данных укажите свойство `items` со значением `res.data`. В противном случае — `GET_ITEMS_FAILED`.

Это всё, что нужно сделать в файле экшенов. Остаётся только обработать каждый из созданных. Для этого перейдите в редьюсер `cart.js` директории `reducers` и расширьте начальное состояние:

-   в начальном состоянии укажите значение `items` равное пустому массиву;
-   добавьте поля `itemsRequest` и `itemsFailed` со значением `false` по умолчанию.

После этого импортируйте типы экшенов, созданные до этого. В редьюсере `cartReducer` обработайте действия таким образом:

-   `GET_ITEMS_REQUEST` — запрос отправ`лен, а значит можно отобразить прелоудер. Поле `itemsRequest`приобретает значение`true`.
-   `GET_ITEMS_SUCCESS` — запрос прошёл успешно. Поля `itemsRequest` и `itemsFailed` принимают значение `false`, а в состояние `items` попадает массив `action.items`.
-   `GET_ITEMS_FAILED` — всё плохо. Но не у нас. Поле `itemsFailed` приобретает значение `true`, а `itemsRequest` — `false`.

## task 2/5

В хранилище корзины ещё остались блоки кода, которые нужно привязать к бэкенду. Это функциональность промокодов и рекомендуемые товары. Начнём с последних, потому что работа с ними очень похожа на обработку обычных товаров.

Подготовьте усилитель в файле `cart.js` директории `actions`. Импортируйте запрос `getRecommendedItemsRequest` и расширьте тип экшенов. Добавьте три экшена:

-   `GET_RECOMMENDED_ITEMS_REQUEST` — отображается, если запрос отправлен.
-   `GET_RECOMMENDED_ITEMS_SUCCESS` — показывается в случае успеха, когда запрос выполнен и товары получены.
-   `GET_RECOMMENDED_ITEMS_FAILED` — используется в случае ошибки при выполнении запроса.

Затем в том же файле создайте усилитель `getRecommendedItems`. Логика этого усилителя полностью дублирует логику `getItems` за тем исключением, что отличаются типы экшенов.

После этого в редьюсере `cart.js` директории `reducers` расширьте начальное состояние:

-   в начальном состоянии укажите значение `recommendedItems` равное пустому массиву;
-   добавьте поля `recommendedItemsRequest` и `recommendedItemsFailed` со значением `false` по умолчанию.

Импортируйте созданные до этого типы экшенов. В редьюсере `cartReducer` обработайте действия следующим образом:

-   `GET_RECOMMENDED_ITEMS_REQUEST` — запрос отправлен. Поле `recommendedItemsRequest` приобретает значение `true`.
-   `GET_RECOMMENDED_ITEMS_SUCCESS` — запрос прошёл успешно. Поля `recommendedItemsRequest` и `recommendedItemsFailed` приобретают значение `false`, а в состояние `recommendedItems` попадает массив `action.items`.
-   `GET_RECOMMENDED_ITEMS_FAILED` — произошла ошибка при выполнении запроса. Поле `recommendedItemsFailed` приобретает значение `true`, а `recommendedItemsRequest` — `false`.

Не поверите, но следующим шагом предстоит сделать то же самое для применения промокодов. Попытайтесь реализовать экшены и редьюсер самостоятельно, а мы предоставим вам название переменных и особенности работы с промокодами.

Типы экшенов:

-   `APPLY_PROMO_FAILED` — ошибка активации промокода,
-   `APPLY_PROMO_REQUEST` — произошёл запрос,
-   `APPLY_PROMO_SUCCESS` — запрос выполнился успешно. В этом случае из усилителя требуется отправить поле `value` со значением `{ ...res, code }`.

Название усилителя — `applyPromo`. А запрос на активацию промокода из файла `fakeApi.js` — `applyPromoCodeRequest`.

В редьюсере расширьте начальное состояние:

-   `promoRequest` — поле для хранения состояния запроса,
-   `promoFailed` — произошла ошибка при выполнении запроса.

В случае возникновения ошибки при применении промокода обнулите текущие данные о скидке и названии промокода в редьюсере:

```jsx

promoDiscount: null,
promoCode: ''

```

Если же промокод применился успешно, возьмите данные из ответа и добавьте их, как делали с полями выше:

```jsx

promoCode: action.value.code,
promoDiscount: action.value.discount

```

Когда всё будет готово — удалите файл `initialData.js` и все импорты данных из этого файла в редьюсере `cart`.

Обычно мы так не делаем (это не точно), но в этом задании готовы поделиться усилителем `applyPromo`:

```jsx
export function applyPromo(code) {
    return function (dispatch) {
        dispatch({
            type: APPLY_PROMO_REQUEST,
        })
        applyPromoCodeRequest(code).then((res) => {
            if (res && res.success) {
                dispatch({
                    type: APPLY_PROMO_SUCCESS,
                    value: { ...res, code },
                })
            } else {
                dispatch({
                    type: APPLY_PROMO_FAILED,
                })
            }
        })
    }
}
```

Пользуйтесь на здоровье, но не забывайте проверять код на наличие нужных импортов.

## task 3/5

Самое время подключить Redux Devtools и усилители к хранилищу. Для этого в корневом файле `index.js ` создайте переменную `composeEnhancers` и проверьте, есть ли в ней объекты `window ` и `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`. Если всё хорошо, вызовите расширение с пустым набором опций. В противном случае — верните compose.
После этого создайте расширитель хранилища: передайте вспомогательную функцию `applyMiddleware` в `composeEnhancers`. В завершении — передайте созданный расширитель в функцию ` createStore`.
Если конструкция по добавлению Redux Devtools до сих пор выглядит пугающе, вот готовое решение (чтобы было не так страшно, можете перенести код с закрытыми глазами):

```JS
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
```

## task 4/5

Усилители подключены и теперь можно начать ими пользоваться. Мы добавили два новых компонента: `Recommend` и `RecommendItem`. Это список с рекомендуемыми товарами. Компоненты не придётся писать заново — большую часть кода разработчик корзины написал за нас. К сожалению, у него не получилось написать весь код — наступили майские праздники. Отдуваться будем мы.

Импортируйте функцию `getRecommendedItems`, хук `useDispatch` и `useEffect` в компонент `Recommend`. Для отправки экшенов создайте переменную `dispatch` со значением `useDispatch`.

Товары понадобятся нам сразу при монтировании компонента. Поэтому в хуке `useEffect` вызовите `dispatch` и передайте в качестве параметра `getRecommendedItems`. Массивом зависимости укажите `dispatch`.

Доработайте переменную `content` так, чтобы во время выполнения запроса отображался компонент `Loader`. А если с запросом всё хорошо, переберите массив `recommendedItems` и для каждого элемента верните компонент `RecommendItem`. Не забудьте про `key` и пропсы. Статус выполнения запроса хранится в переменной `recommendedItemsRequest`.

Иногда тернарные операторы тяжело оседлать, зато они делают код красивее и круче. Попробуйте использовать в переменной `content` такое выражение:

```jsx
return recommendedItemsRequest ? (
    <Loader size="large" />
) : (
    recommendedItems.map((item, index) => {
        return <RecommendItem key={index} {...item} />
    })
)
```

## task 5/5

В этом задании переработаем компонент `ProductsContainer`. Чтобы показать состояние компонента до и после рефакторинга, мы не удаляли существующий код.

Сейчас в компоненте небольшая каша: хуки используются как для доступа к хранилищу, так и для работы с внутренним состоянием. Поскольку теперь мы храним все запросы к серверу в усилителях, а переменные для отображения их состояний в хранилище — смело удаляйте весь код с 16 до 53 строки включительно, оставьте только переменную `inputRef` — она ещё пригодится. Остальной код нам больше не нужен.

После этого модифицируйте хук `useSelector`. Используйте деструктуризацию и заберите всё необходимое из хранилища. Вот полный список ключей хранилища:

```jsx
items, promoCode, promoDiscount, promoRequest, promoFailed, itemsRequest
```

Для настройки работы промокодов и отображения товаров в корзине импортируйте усилители `applyPromo` и `getItems` из `cart.js`. А для отправки экшенов — импортируйте хук `useDispatch` и присвойте его переменной `dispatch`.

При монтировании компонента `ProductsContainer` отправьте экшен с функцией `getItems`. Сделайте это внутри хука `useEffect`, а в качестве `deps` укажите переменную `dispatch`.

Для применения промокодов создайте переменную `applyPromoCode` и используйте в ней хук `useCallback`. Внутри хука отправьте экшен с усилителем `applyPromo`. В отличие от усилителей, которые мы использовали раньше, `applyPromo` принимает параметры. Передайте в качестве параметра значение рефа инпута `inputRef`. Не забудьте про `deps` для хука `useCallback`.

Финальным штрихом модифицируйте разметку, возвращаемую компонентом `ProductsContainer`. Компонент `PromoButton` должен рендериться только в случае, если нет ни промокода, ни скидки. Эти ключи вы забрали из хранилища в самом начале работы.
Для отправки экшенов с применением промокода и получением списка товаров используйте следующий код:

```jsx
// Вызываем хук useDispatch с усилителем applyPromo
dispatch(applyPromo(inputRef.current.value))

// Вызываем хук useDispatch с усилителем getItems
dispatch(getItems())
```
