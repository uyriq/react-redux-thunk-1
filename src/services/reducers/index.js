/* eslint-disable import/prefer-default-export */
/* eslint-disable indent */
/* eslint-disable default-param-last */
import { combineReducers } from 'redux'
import { cartReducer } from './cart'
import { NEXT_STEP, PREVIOUS_STEP } from '../actions'

const stepReducer = (state = 'cart', action) => {
    switch (action.type) {
        case NEXT_STEP: {
            // eslint-disable-next-line no-nested-ternary
            return state === 'cart'
                ? 'delivery'
                : // eslint-disable-next-line no-nested-ternary
                state === 'delivery'
                ? 'checkout'
                : state === 'checkout'
                ? 'checkout'
                : 'checkout'
        }
        case PREVIOUS_STEP: {
            // eslint-disable-next-line no-nested-ternary
            return state === 'cart'
                ? 'cart'
                : // eslint-disable-next-line no-nested-ternary
                state === 'delivery'
                ? 'cart'
                : state === 'checkout'
                ? 'delivery'
                : 'cart'
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    step: stepReducer,
    cart: cartReducer,
})
