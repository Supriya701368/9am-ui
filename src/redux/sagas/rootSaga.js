import { all } from "redux-saga/effects";

import studentSaga from "./studentSaga";


function* rootSaga() {
    return yield all([studentSaga()])
}

export default rootSaga;