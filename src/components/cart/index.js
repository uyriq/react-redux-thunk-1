import React from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from './tabs'
import { ProductsContainer } from './products-container'
import { Postponed } from './postponed'

export const Cart = () => {
    /*
  В файл ./cart/index.js в компоненте Cart, как и в tabs.js,
  следует поместить значение cart.currentTab в переменную currentTab.
   Достать его нужно из Redux-хранилища. Для этого воспользуйтесь хуком useSelector.
Также в файле ./cart/index.js необходимо применить условный рендеринг
 с помощью тернарного выражения: если currentTab равен "items",
 то нужно рендерить компонент <ProductsContainer />, в противном случае — компонент <Postponed />.
  Допишите эту логику в блок return компонента Cart
  */

    const currentTab = useSelector((store) => store.cart.currentTab)
    return (
        <section>
            <Tabs /> {'items' === currentTab ? <ProductsContainer /> : <Postponed />}
        </section>
    )
}
