/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { applyPromo, getItems } from '../../services/actions/cart'
import styles from './products-container.module.css'
import { Product } from './product'
import { Input } from '../../ui/input/input'
import { MainButton } from '../../ui/main-button/main-button'
import { PromoButton } from '../../ui/promo-button/promo-button'
import { Loader } from '../../ui/loader/loader'

// eslint-disable-next-line import/prefer-default-export, react/function-component-definition
export const ProductsContainer = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const { items, promoCode, promoDiscount, promoRequest, promoFailed, itemsRequest } = useSelector(
        (store) => store.cart
    )
    const applyPromoCode = useCallback(() => {
        dispatch(applyPromo(inputRef.current.value))
    }, [promoCode])
    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])

    // eslint-disable-next-line arrow-body-style
    const content = useMemo(() => {
        return itemsRequest ? (
            <Loader size="large" />
        ) : (
            // eslint-disable-next-line arrow-body-style
            items.map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key, react/jsx-props-no-spreading
                return <Product key={index} {...item} />
            })
        )
    }, [itemsRequest, items])

    // eslint-disable-next-line arrow-body-style
    const promoCodeStatus = useMemo(() => {
        return promoFailed ? (
            <p className={styles.text}>Произошла ошибка! Проверьте корректность введенного промокода</p>
        ) : promoRequest ? (
            ''
        ) : promoCode ? (
            <p className={styles.text}>Промокод успешно применён!</p>
        ) : (
            ''
        )
    }, [promoRequest, promoCode, promoFailed])

    return (
        <div className={`${styles.container}`}>
            {content}
            <div className={styles.promo}>
                <div className={styles.inputWithBtn}>
                    <Input
                        type="text"
                        placeholder="Введите промокод"
                        extraClass={styles.input}
                        inputWithBtn={true}
                        inputRef={inputRef}
                    />
                    <MainButton
                        type="button"
                        extraClass={styles.promo_button}
                        inputButton={true}
                        onClick={applyPromoCode}
                    >
                        {promoRequest ? <Loader size="small" inverse={true} /> : 'Применить'}
                    </MainButton>
                </div>
                {!promoCode && !promoDiscount && <PromoButton extraClass={styles.promocode}>{promoCode}</PromoButton>}
            </div>
            {(promoCode || promoDiscount) && promoCodeStatus}
        </div>
    )
}
