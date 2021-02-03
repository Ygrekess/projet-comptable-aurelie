import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer } from './1-reducers/userReducers';
import Cookie from 'js-cookie';

const userInfos = Cookie.getJSON('userInfos') || null;

const initialState = {
  userLogin: {
    loading: false,
    userInfos: userInfos
  }
}

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;