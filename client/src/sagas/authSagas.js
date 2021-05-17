import { put } from 'redux-saga/effects'
import ACTION from '../actions/actionTypes'
import history from '../browserHistory'
import * as Api from '../api/http'

export function * loginSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST })
  try {
    const {
      data: {
        data: { user }
      }
    } = yield Api.auth.login(action.data)
    history.replace('/')
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user })
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response })
  }
}

export function * registerSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST })
  try {
    const {
      data: {
        data: { user }
      }
    } = yield Api.auth.signUp(action.data)
    history.replace('/')
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user })
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response })
  }
}

export function * refreshSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST })
  try {
    const {
      data: {
        data: { user }
      }
    } = yield Api.auth.refresh(action.data)
    // history.replace('/')
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user })
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response })
  }
}

export function * logoutSaga (action) {
  yield Api.auth.logout()
  yield put({ type: ACTION.CLEAR_STORE })
}
