/* eslint-disable indent */
import React, { StrictMode } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import thunk from 'redux-thunk'
import App from './components/app/app'
import './index.css'

// Корневой редьюсер, который обрабатывает экшены
import { rootReducer } from './services/reducers'

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(rootReducer, enhancer)
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    // Оборачиваем приложение компонентом Provider из пакета react-redux
    // eslint-disable-next-line react/jsx-filename-extension
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)
