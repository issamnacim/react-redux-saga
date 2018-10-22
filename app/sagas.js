import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ajax } from 'rxjs/ajax';
function* fetchUser(action) {
    try {
      
       const user = yield fetch("http://localhost:3000/personnes").then(response => response.json(), );
       yield put({type: "STORE_USERS", payload: user});
    } catch (e) {
       yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
 }


  function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  }

  export default mySaga;