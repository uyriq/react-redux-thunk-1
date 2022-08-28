import { getItemsRequest, getRecommendedItemsRequest, applyPromoCodeRequest } from '../fakeApi'

export const INCREASE_ITEM = 'INCREASE_ITEM'
export const DECREASE_ITEM = 'DECREASE_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

export const CANCEL_PROMO = 'CANCEL_PROMO'
export const TAB_SWITCH = 'TAB_SWITCH'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST' // — отображается, если запрос отправлен.
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS' // — показывается в случае успеха, когда запрос выполнен и данные получены.
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED' // — используется в случае ошибки.

// Добавьте три экшена:
export const GET_RECOMMENDED_ITEMS_REQUEST = 'GET_RECOMMENDED_ITEMS_REQUEST' // — отображается, если запрос отправлен.
export const GET_RECOMMENDED_ITEMS_SUCCESS = 'GET_RECOMMENDED_ITEMS_SUCCESS' // — показывается в случае успеха, когда запрос выполнен и товары получены.
export const GET_RECOMMENDED_ITEMS_FAILED = 'GET_RECOMMENDED_ITEMS_FAILED' // — используется в случае ошибки при выполнении запроса.

export const APPLY_PROMO_FAILED = 'APPLY_PROMO_FAILED' // — ошибка активации промокода,
export const APPLY_PROMO_REQUEST = 'APPLY_PROMO_REQUEST' // — произошёл запрос,
export const APPLY_PROMO_SUCCESS = 'APPLY_PROMO_SUCCESS' // — запрос выполнился успешно.

// В этом случае из усилителя требуется отправить поле value со значением { ...res, code }.
// Название усилителя — applyPromo. А запрос на активацию промокода из файла fakeApi.js — applyPromoCodeRequest

export function getItems() {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    // eslint-disable-next-line func-names
    return function (dispatch) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
        // ввод на время выполнени я запроса
        dispatch({
            type: GET_ITEMS_REQUEST,
        })
        // Запрашиваем данные у сервера
        getItemsRequest()
            .then((res) => {
                if (res && res.success) {
                    // В случае успешного получения данных вызываем экшен
                    // для записи полученных данных в хранилище
                    dispatch({
                        type: GET_ITEMS_SUCCESS,
                        items: res.data,
                    })
                } else {
                    // Если произошла ошибка, отправляем соотвтествующий экшен
                    dispatch({
                        type: GET_ITEMS_FAILED,
                    })
                }
            })
            // eslint-disable-next-line no-unused-vars
            .catch((_err) => {
                // Если сервер не вернул данных, также отправляем экшен об ошибке
                dispatch({
                    type: GET_ITEMS_FAILED,
                })
            })
    }
}

export function getRecommendedItems() {
    // eslint-disable-next-line func-names
    return function (dispatch) {
        dispatch({
            type: GET_RECOMMENDED_ITEMS_REQUEST,
        })
        // Запрашиваем данные у сервера
        getRecommendedItemsRequest()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_RECOMMENDED_ITEMS_SUCCESS,
                        items: res.data,
                    })
                } else {
                    // Если произошла ошибка, отправляем соотвтествующий экшен
                    dispatch({
                        type: GET_RECOMMENDED_ITEMS_FAILED,
                    })
                }
            })
            // eslint-disable-next-line no-unused-vars
            .catch((_err) => {
                // Если сервер не вернул данных, также отправляем экшен об ошибке
                dispatch({
                    type: GET_RECOMMENDED_ITEMS_FAILED,
                })
            })
    }
}

export function applyPromo(code) {
    // eslint-disable-next-line func-names
    return function (dispatch) {
        dispatch({
            type: APPLY_PROMO_REQUEST,
        })
        // Запрашиваем данные у сервера
        applyPromoCodeRequest(code).then((res) => {
            if (res && res.success) {
                dispatch({
                    type: APPLY_PROMO_SUCCESS,
                    value: { ...res, code },
                })
            } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
                dispatch({
                    type: APPLY_PROMO_FAILED,
                })
            }
        })
    }
}
