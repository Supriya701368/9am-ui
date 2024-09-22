import { appReducer } from './appReducer'
import logger from 'redux-logger'
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();
export const appStore = configureStore({
    reducer: {
        appReducer
    },
    middleware: () => {
        return [logger, sagaMiddleware]
    }
});

sagaMiddleware.run(rootSaga)


