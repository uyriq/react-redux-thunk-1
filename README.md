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

## task 1/2

Перед тем как обрабатывать пользовательский ввод с помощью Redux, следует доделать корзину. Для начала добавим функциональность перехода по шагам. Чтобы это сделать, нам потребуется:

1. Добавить условный рендеринг в `./components/app/app.js` в компоненте `App`. Вам необходимо получить актуальный шаг корзины из `store.step` с помощью хука `useSelector`. Полученное значение нужно присвоить переменной `step` и добавить в switch-case конструкцию дополнительные условия:
    - Если step равен `"delivery"`, нужно возвращать компонент `<Delivery />`.
    - Если step равен `"checkout"`, нужно возвращать компонент `<Checkout />`.
2. В компоненте `TotalPrice` файла `./common/total-price.jsx` нужно дописать несколько функций: `prev` и `next`. Во время их вызова должна происходить отправка экшенов `{ type: PREVIOUS_STEP }` и `{ type: NEXT_STEP }`соответственно. Чтобы это реализовать, воспользуйтесь хуком `useDispatch()`.

Для перехода по шагам воспользуйтесь функцией, возвращаемой из хука `useDispatch`
. Вызывайте её внутри функций `prev`  и `next`  с соответствующими экшенами.

## task 2/2

В этом задании мы завершим работу над корзиной. Осталось совсем чуть-чуть — реализовать сохранение вводимых значений в поле адреса доставки.

Для этого нужно сделать следующее:

1. В редьюсере `delivery.js` файла `./services/reducers/delivery.js` добавить ещё одно условие. Оно должно срабатывать, когда тип экшена равен `SET_DELIVERY_FORM_VALUE`. У этого экшена такая структура:

    ```jsx
    {
        type: SET_DELIVERY_FORM_VALUE,
            field, // Изменяемое поле
            value // Значение
    }
    ```

    В редьюсере необходимо изменять ключ `deliveryForm`. Используйте `field` из экшена как ключ объекта, а `value` — как его значение.

2. В файле `./components/delivery/index.jsx` замените использование хука `const [address, setAddress] = useState('');` на хуки `useDispatch` и `useSelector`. Значение `store.delivery.deliveryForm.address` из хранилища присвойте переменной `address`. А функцию `setAddress` напишите заново. Её единственный аргумент — `address`, а внутри неё должен вызываться `dispatch` из хука `useDispatch` c таким экшеном:

    `{ type: SET_DELIVERY_FORM_VALUE, field: 'address', value: address }`. Так найденный на карте или через поиск адрес будет сохранён в Redux.

3. В файле `./components/delivery/inputs-box.jsx` замените способ получения переменной `deliveryForm`. Воспользуйтесь хуком `useSelector` и достаньте из хранилища значение `delivery.deliveryForm`.
4. В компоненте `InputsBox` того же файла допишите функцию `onChange`. Внутри должен вызываться `dispatch` с экшеном такого вида:

    `{ type: SET_DELIVERY_FORM_VALUE, field: e.target.name, value: e.target.value }`

Если всё сделано правильно, введённые значения на шаге выбора доставки будут отображены на третьем шаге подтверждения заказа. Попробуйте оформить заказ.

**Подсказка**

Чтобы использовать `dispatch`, воспользуйтесь хуком `useDispatch`. А чтобы не переписывать больше кода, чем требуется в третьем шаге, используйте возможности деструктуризации: `const { deliveryForm } = useSelector(state => state.delivery);`.

Мы знаем, что это сложная задача в плане проверки кода тренажером на валидность. Если вы уверены, что ваш код правильный, но тренажер не может его принять, вы можете сравнить ваше решение с решением автора:

-   `services/reducers/delivery.js`

    ```jsx
    import {
      GET_DELIVERY_METHODS,
      GET_DELIVERY_METHODS_FAILED,
      SET_DELIVERY_FORM_VALUE,
      SET_DELIVERY_METHOD,
      GET_DELIVERY_METHODS_SUCCESS
    } from '../actions/delivery';

    const deliveryInitialState = {
      deliveryMethods: [],
      deliveryMethodsRequest: false,
      deliveryMethodsFailed: false,
      selectedDeliveryId: null,
      deliveryForm: {
        name: '',
        phone: '',
        address: '',
        unitNumber: '',
        intercom: '',
        floor: ''
      }
    };
    export const deliveryReducer = (state = deliveryInitialState, action) => {
      switch (action.type) {
        case GET_DELIVERY_METHODS: {
          return {
            ...state,
            deliveryMethodsFailed: false,
            deliveryMethodsRequest: true
          };
        }
        case GET_DELIVERY_METHODS_FAILED: {с      return {
            ...state,
            deliveryMethodsFailed: true,
            deliveryMethodsRequest: false
          };
        }
        case GET_DELIVERY_METHODS_SUCCESS: {
          return {
            ...state,
            deliveryMethods: action.methods,
            deliveryMethodsRequest: false,
            selectedDeliveryId:
              !!action.methods.length && state.selectedDeliveryId === null
                ? action.methods[0].id
                : state.selectedDeliveryId
          };
        }
        case SET_DELIVERY_METHOD: {
          return {
            ...state,
            selectedDeliveryId: action.id
          };
        }
        case SET_DELIVERY_FORM_VALUE: {
          return {
            ...state,
            deliveryForm: {
              ...state.deliveryForm,
              [action.field]: action.value
            }
          };
        }
        default: {
          return state;
        }
      }
    };
    ```

-   `components/delivery/index.jsx`

    ```jsx
    import React, { useRef, useEffect, useCallback } from 'react'
    import { YMaps, Map } from 'react-yandex-maps'
    import { InputsBox } from './inputs-box'
    import styles from './delivery.module.css'
    import { DeliveryMethod } from './delivery-method'
    import { useDispatch, useSelector } from 'react-redux'
    import { SET_DELIVERY_FORM_VALUE } from '../../services/actions/delivery'
    import { MapSuggestComponent } from './delivery-suggest-input'

    const mapState = {
        center: [55.753994, 37.622093],
        zoom: 9,
        behaviors: ['scrollZoom'],
        controls: [],
    }

    export default function SuggestInput({ onChange, value }) {
        return (
            <YMaps>
                <MapSuggestComponent onChange={onChange} value={value} />
            </YMaps>
        )
    }

    export const Delivery = () => {
        const address = useSelector((state) => state.delivery.deliveryForm.address)
        const dispatch = useDispatch()
        const setAddress = (address) => {
            dispatch({ type: SET_DELIVERY_FORM_VALUE, field: 'address', value: address })
        }
        const ymaps = useRef(null)
        const placemarkRef = useRef(null)
        const mapRef = useRef(null)

        const getGeocodeResult = async (criteria) => {
            return !!ymaps.current && !!criteria ? await ymaps.current.geocode(criteria) : null
        }
        const createPlacemark = useCallback(
            (coords) => {
                return new ymaps.current.Placemark(
                    coords,
                    {},
                    {
                        preset: 'islands#blueCircleDotIcon',
                    }
                )
            },
            [ymaps]
        )

        const getAddressByCoords = async (coords) => {
            placemarkRef.current.properties.set('iconCaption', 'Загрузка...')
            const result = await getGeocodeResult(coords)
            if (result) {
                const newAddress = getAddressFromGeocodeResult(result)
                setAddress(newAddress)

                placemarkRef.current.properties.set({
                    iconCaption: '',
                })
            }
        }

        const getAddressFromGeocodeResult = useCallback((data) => {
            const firstGeoObject = data.geoObjects.get(0)
            const newAddress = [
                firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                !!firstGeoObject.getPremiseNumber() && firstGeoObject.getPremiseNumber(),
            ]
                .filter(Boolean)
                .join(', ')
            return newAddress
        }, [])

        const zoomToPoint = (coords) => {
            mapRef.current.setCenter(coords)

            mapRef.current.setZoom(18, {
                smooth: true,
                position: coords,
                centering: true,
                duration: 5,
            })
        }

        const updatePlaceMark = async () => {
            const result = await getGeocodeResult(address)
            if (result) {
                const firstObject = result.geoObjects.get(0)
                if (firstObject) {
                    const coords = result.geoObjects.get(0).geometry.getCoordinates()
                    renderPlaceMark(coords)
                    zoomToPoint(coords)
                }
            }
        }

        const renderPlaceMark = useCallback(
            (coords) => {
                if (placemarkRef.current) {
                    placemarkRef.current.geometry.setCoordinates(coords)
                } else {
                    placemarkRef.current = createPlacemark(coords)
                    mapRef.current.geoObjects.add(placemarkRef.current)
                }
            },
            [placemarkRef, mapRef, createPlacemark]
        )

        const onMapClick = useCallback(
            (e) => {
                const coords = e.get('coords')
                renderPlaceMark(coords)
                getAddressByCoords(coords)
            },
            [getAddressByCoords, renderPlaceMark]
        )

        useEffect(() => {
            if (address) {
                updatePlaceMark()
            }
        }, [address])

        const onLoad = (ymapsInstance) => {
            ymaps.current = ymapsInstance
        }

        return (
            <section className={`${styles.delivery}`}>
                <div className={styles.inputbox}>
                    <SuggestInput onChange={setAddress} value={address} />
                </div>
                <div className={styles.map}>
                    <YMaps>
                        <Map
                            modules={['Placemark', 'geocode', 'geoObject.addon.balloon']}
                            instanceRef={mapRef}
                            onLoad={onLoad}
                            onClick={onMapClick}
                            state={mapState}
                            width="100%"
                            height="280px"
                        />
                    </YMaps>
                </div>
                <InputsBox />
                <DeliveryMethod />
            </section>
        )
    }
    ```

-   `components/delivery/inputs-box.jsx`

````jsx
import styles from './inputs-box.module.css';
import { Input } from '../../ui/input/input';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DELIVERY_FORM_VALUE } from '../../services/actions/delivery';

export const InputsBox = () => {
const { deliveryForm } = useSelector(state => state.delivery);

const dispatch = useDispatch();

const onChange = e => {
 dispatch({ type: SET_DELIVERY_FORM_VALUE, field: e.target.name, value: e.target.value });
};
return (
 <div className={`${styles.container}`}>
   <ul className={styles.row}>
     <li className={`${styles.input} ${styles.inputFlex}`}>
       <div className={styles.input}>
         <label className={styles.label} htmlFor="unitNumber">
           Номер квартиры/офиса
         </label>
         <Input
           onChange={onChange}
           name={'unitNumber'}
           value={deliveryForm.unitNumber}
           extraClass={styles.input}
           type="text"
           id="unitNumber"
         />
       </div>
       <div className={styles.input}>
         <label className={styles.label} htmlFor="intercom">
           Домофон
         </label>
         <Input
           onChange={onChange}
           name={'intercom'}
           value={deliveryForm.intercom}
           extraClass={styles.input}
           type="text"
           id="intercom"
         />
       </div>
     </li>
     <li className={`${styles.input} ${styles.floor}`}>
       <label className={styles.label} htmlFor="floor">
         Этаж
       </label>
       <Input
         onChange={onChange}
         name={'floor'}
         value={deliveryForm.floor}
         extraClass={styles.input}
         type="text"
         id="floor"
       />
     </li>
   </ul>
   <ul className={styles.row}>
     <li className={styles.input}>
       <label className={styles.label} htmlFor="name">
         ФИО получателя
       </label>
       <Input
         onChange={onChange}
         name={'name'}
         value={deliveryForm.name}
         type="text"
         extraClass={styles.input}
         id="name"
         placeholder="Введите ФИО"
       />
     </li>
     <li className={styles.input}>
       <label className={styles.label} htmlFor="phone">
         Телефон
       </label>
       <Input
         onChange={onChange}
         name={'phone'}
         value={deliveryForm.phone}
         extraClass={styles.input}
         type="tel"
         id="phone"
         placeholder="+7"
       />
     </li>
   </ul>
 </div>
);
};
 ```
````
