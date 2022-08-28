import React, { StrictMode } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from './components/app/app'
import './index.css'

// Корневой редьюсер, который обрабатывает экшены
import { rootReducer } from './services/reducers'

// Инициализируем хранилище с помощью корневого редьюсера
const store = createStore(rootReducer)

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    // Оборачиваем приложение компонентом Provider из пакета react-redux
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)
