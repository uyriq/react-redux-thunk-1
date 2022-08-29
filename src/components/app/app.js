import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styles from './app.module.css'
import { Title } from '../../ui/title/title'
import { Cart } from '../cart'
import { Delivery } from '../delivery'
import { Checkout } from '../checkout'
import { Recommend } from '../cart/recommend'
import { TotalPrice } from '../common/total-price'

const title = { cart: 'Корзина', delivery: 'Доставка', checkout: 'Подтверждение заказа' }

function App() {
    const step = useSelector((store) => store.step)

    const content = useMemo(() => {
        switch (step) {
            case 'cart': {
                // eslint-disable-next-line react/jsx-filename-extension
                return <Cart />
            }
            case 'delivery': {
                return <Delivery />
            }
            case 'checkout': {
                return <Checkout />
            }
            default: {
                return <Cart />
            }
        }
    }, [step])

    return (
        <div className={styles.app}>
            <Title
                text={title[step]}
                currentStep={Object.keys(title).indexOf(step) + 1}
                allSteps={Object.keys(title).length}
            />
            {content}
            <TotalPrice step={step} />
            {step === 'cart' && <Recommend extraClass={styles.recommend} />}
        </div>
    )
}

export default App
