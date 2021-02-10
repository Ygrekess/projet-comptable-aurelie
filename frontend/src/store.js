import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer } from './1-reducers/userReducers';
import Cookie from 'js-cookie';
import { poleAddReducer, allPolesGetReducer, onePoleGetReducer, poleUpdateReducer } from './1-reducers/poleReducers';
import { allSpecialitesGetReducer, oneSpecialitesGetReducer, specialiteAddReducer, specialiteUpdateReducer } from './1-reducers/specialiteReducers';

const userInfos = Cookie.getJSON('userInfos') || null;

const initialState = {
  userLogin: {
    loading: false,
    userInfos: userInfos
  }
}

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  allPolesGet: allPolesGetReducer,
  poleSelected: onePoleGetReducer,
  poleAdd: poleAddReducer,
  poleUpdated: poleUpdateReducer,
  allSpecialitesGet: allSpecialitesGetReducer,
  specialiteSelected: oneSpecialitesGetReducer,
  specialiteAdd: specialiteAddReducer,
  specialiteUpdated: specialiteUpdateReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;