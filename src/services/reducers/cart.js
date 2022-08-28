/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
import {
    DELETE_ITEM,
    CANCEL_PROMO,
    DECREASE_ITEM,
    INCREASE_ITEM,
    TAB_SWITCH,
    GET_ITEMS_FAILED,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_REQUEST,
    GET_RECOMMENDED_ITEMS_FAILED,
    GET_RECOMMENDED_ITEMS_SUCCESS,
    GET_RECOMMENDED_ITEMS_REQUEST,
    APPLY_PROMO_FAILED,
    APPLY_PROMO_SUCCESS,
    APPLY_PROMO_REQUEST,
} from '../actions/cart'

const initialState = {
    // в начальном состоянии укажите значение items равное пустому массиву;
    // добавьте поля itemsRequest и itemsFailed со значением false по умолчанию.
    // добавьте поля recommendedItemsRequest и recommendedItemsFailed со значением false по умолчанию.
    items: [],

    recommendedItems: [],

    promoCode: 'PROMOCODE',
    promoDiscount: 50,

    // promoRequest — поле для хранения состояния запроса,
    // promoFailed — произошла ошибка при выполнении запроса.
    currentTab: 'items',
    itemsRequest: false,
    itemsFailed: false,
    recommendedItemsRequest: false,
    recommendedItemsFailed: false,
    promoRequest: false,
    promoFailed: false,
}

// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line default-param-last
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAB_SWITCH: {
            return {
                ...state,
                currentTab: state.currentTab === 'items' ? 'postponed' : 'items',
            }
        }
        case INCREASE_ITEM: {
            return {
                ...state,
                // eslint-disable-next-line no-plusplus, no-param-reassign
                items: [...state.items].map((item) => (item.id === action.id ? { ...item, qty: ++item.qty } : item)),
            }
        }
        case DECREASE_ITEM: {
            return {
                ...state,
                // eslint-disable-next-line no-param-reassign, no-plusplus
                items: [...state.items].map((item) => (item.id === action.id ? { ...item, qty: --item.qty } : item)),
            }
        }
        case DELETE_ITEM: {
            return { ...state, items: [...state.items].filter((item) => item.id !== action.id) }
        }
        case CANCEL_PROMO: {
            return {
                ...state,
                promoCode: '',
                promoDiscount: null,
            }
        }

        // В редьюсере cartReducer обработайте действия таким образом:
        // GET_ITEMS_REQUEST — запрос отправлен, а значит можно отобразить прелоудер.
        // Поле itemsRequest приобретает значение true.
        // GET_ITEMS_SUCCESS — запрос прошёл успешно. Поля itemsRequest и itemsFailed принимают значение false,
        // а в состояние items попадает массив action.items.
        // GET_ITEMS_FAILED — всё плохо. Но не у нас. Поле itemsFailed приобретает значение true,
        // а itemsRequest — false.

        case GET_ITEMS_REQUEST: {
            return { ...state, itemsRequest: true }
        }

        case GET_ITEMS_SUCCESS: {
            return { ...state, items: [...action.items], itemsRequest: false, itemsFailed: false }
        }

        case GET_ITEMS_FAILED: {
            return { ...state, itemsRequest: false, itemsFailed: true }
        }

        case GET_RECOMMENDED_ITEMS_REQUEST: {
            return { ...state, recommendedItemsRequest: true }
        }

        case GET_RECOMMENDED_ITEMS_SUCCESS: {
            return {
                ...state,
                recommendedItems: [...action.items],
                recommendedItemsRequest: false,
                recommendedItemsFailed: false,
            }
        }

        case GET_RECOMMENDED_ITEMS_FAILED: {
            return { ...state, recommendedItemsRequest: false, recommendedItemsFailed: true }
        }

        //  В случае возникновения ошибки при применении промокода обнулите текущие данные о скидке
        //  и названии промокода в редьюсере:
        //  promoDiscount: null,
        //  promoCode: ''
        //  Если же промокод применился успешно, возьмите данные из ответа и добавьте их, как делали с полями выше:
        //  promoCode: action.value.code,
        //  promoDiscount: action.value.discount
        //  Когда всё будет готово — удалите файл initialData.js и все импорты данных из этого файла в редьюсере cart

        case APPLY_PROMO_REQUEST: {
            return { ...state, promoRequest: true }
        }

        case APPLY_PROMO_SUCCESS: {
            return {
                ...state,
                promoDiscount: action.value.discount,
                promoCode: action.value.code,
                promoRequest: false,
                promoFailed: false,
            }
        }

        case APPLY_PROMO_FAILED: {
            return {
                ...state,
                promoDiscount: null,
                promoCode: '',
                promoRequest: false,
                promoFailed: true,
            }
        }

        default: {
            return state
        }
    }
}
