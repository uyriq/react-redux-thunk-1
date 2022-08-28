/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Title } from '../../ui/title/title'
import { Loader } from '../../ui/loader/loader'
import { RecommendItem } from './recommend-item'
import styles from './recommend.module.css'

export const Recommend = ({ extraClass }) => {
    const { recommendedItems, recommendedItemsRequest } = useSelector((state) => state.cart)

    // eslint-disable-next-line react/jsx-filename-extension
    const content = useMemo(() => <Loader size="large" />, [recommendedItemsRequest, recommendedItems])

    return (
        <section className={`${styles.container} ${extraClass}`}>
            <Title text="Обычно с этим покупают" amount={(recommendedItems && recommendedItems.length) || ''} />
            <div className={styles.items}>{content}</div>
        </section>
    )
}
