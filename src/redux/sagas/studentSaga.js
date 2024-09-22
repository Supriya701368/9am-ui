
import { takeLatest, call, put } from "redux-saga/effects";
import { Ajax } from '@/services/Ajax'

function* getStudents() {
    yield put({ type: "LOADER", payload: true })
    const res = yield call(Ajax.sendGetReq, "std/get-std")
    yield put({ type: "LOADER", payload: false })
    yield put({ type: "STUDENTS", payload: res?.data })
}


function* studentSaga() {
    yield takeLatest("GET_STUDENTS", getStudents)
}

export default studentSaga;