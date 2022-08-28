import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TAB_SWITCH } from '../../services/actions/cart'
import styles from './tab.module.css'

export const Tab = ({ text, active }) => {
    const dispatch = useDispatch() //тренажер не принимает имя другое чем dispatch!!!

    const switchTab = () => {
        dispatch({ type: TAB_SWITCH })
    }
    const className = `${styles.tab} ${active ? styles.tab_type_current : ''}`
    return (
        <div className={`${className}`} onClick={switchTab}>
            {text}
        </div>
    )
}
