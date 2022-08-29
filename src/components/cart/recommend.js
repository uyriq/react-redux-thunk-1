/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Title } from '../../ui/title/title'
import { Loader } from '../../ui/loader/loader'
import { RecommendItem } from './recommend-item'
import { getRecommendedItems } from '../../services/actions/cart'
import styles from './recommend.module.css'

// Импортируйте функцию getRecommendedItems, хук useDispatch и useEffect в компонент Recommend.
// Для отправки экшенов создайте переменную dispatch со значением useDispatch.

export const Recommend = ({ extraClass }) => {
    const { recommendedItems, recommendedItemsRequest } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    // eslint-disable-next-line react/jsx-filename-extension
    const content = useMemo(() => {
        return recommendedItemsRequest ? (
            <Loader size="large" />
        ) : (
            recommendedItems.map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key, react/jsx-props-no-spreading
                return <RecommendItem key={index} {...item} />
            })
        )
    }, [recommendedItemsRequest, recommendedItems])
    useEffect(() => {
        // Доработайте переменную content так,
        // чтобы во время выполнения запроса отображался компонент Loader.
        // А если с запросом всё хорошо, переберите массив recommendedItems и
        // для каждого элемента верните компонент RecommendItem. Не забудьте про key и пропсы.
        // Статус выполнения запроса хранится в переменной recommendedItemsRequest.
        // Посмотрите, какими чистыми и немногословными получаются компоненты,
        // когда вся бизнес-логика и запросы хранятся вне представления.
        // Согласитесь, огромные объёмы кода в хранилище того стоят.
        dispatch(getRecommendedItems())
    }, [dispatch])

    return (
        <section className={`${styles.container} ${extraClass}`}>
            <Title text="Обычно с этим покупают" amount={(recommendedItems && recommendedItems.length) || ''} />
            <div className={styles.items}>{content}</div>
        </section>
    )
}
