import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './tabs.module.css'
import { Tab } from './tab'

export const Tabs = () => {
    /*
Также в файле tabs.js необходимо добавить булево значение в пропс active у элементов <Tab />.
 Получать это значение нужно, сравнивая currentTab и строку "items" для первого элемента <Tab />
 и строку "postponed" для второго элемента.
*/

    const currentTab = useSelector((store) => store.cart.currentTab)
    return (
        <div className={`${styles.tabs}`}>
            <Tab text="Товары в корзине" active={'items' === currentTab} />
            <Tab text="Отложенные товары" active={'postponed' === currentTab} />
        </div>
    )
}
