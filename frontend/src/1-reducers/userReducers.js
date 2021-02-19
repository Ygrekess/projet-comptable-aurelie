const userInfosReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "USER_INFOS_REQUEST":
      return { loading: true };
    case "USER_INFOS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_INFOS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: true };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATEPASSWORD_REQUEST":
      return { loading: true };
    case "USER_UPDATEPASSWORD_SUCCESS":
      return { loading: false, success: true };
    case "USER_UPDATEPASSWORD_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATEPASSWORD_RESET":
      return {};
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "USER_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, success: true, userInfos: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export {
  userInfosReducer,
  userRegisterReducer,
  userLoginReducer,
  userUpdateReducer,
  userUpdatePasswordReducer,
};
