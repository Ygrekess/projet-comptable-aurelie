import axios from "axios";
import Cookie from "js-cookie";

const getInfos = (userId, token) => async (dispatch) => {
  dispatch({ type: "USER_INFOS_REQUEST" });
  try {
    const { data } = await axios.get(`/api/users/getInfos/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: "USER_INFOS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_INFOS_FAIL", payload: error.response.data });
  }
};

const updateInfos = (user, token) => async (dispatch) => {
  dispatch({ type: "USER_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      "/api/users/updateinfos",
      { user },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_UPDATE_FAIL", payload: error.response.data });
  }
};

const updatePassword = (password, token) => async (dispatch) => {
  console.log(password);
  dispatch({ type: "USER_UPDATEPASSWORD_REQUEST" });
  try {
    const { data } = await axios.put(
      "/api/users/updatepassword",
      { password },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: "USER_UPDATEPASSWORD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_UPDATEPASSWORD_FAIL",
      payload: error.response.data,
    });
  }
};

const register = (lastname, email, password) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const { data } = await axios.post("/api/auth/register", {
      lastname: lastname,
      email: email,
      password: password,
    });
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch(login(data.email, password));
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error.response.data });
  }
};

const login = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const { data } = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    Cookie.set("userInfos", {
      _id: data._id,
      lastname: data.lastname,
      email: data.email,
      token: data.token,
    });
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
  }
};

const userSuccessReset = () => (dispatch) => {
  dispatch({ type: "USER_UPDATE_RESET" });
  dispatch({ type: "USER_UPDATEPASSWORD_RESET" });
};

const logout = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
  Cookie.remove("userInfos");
};
export {
  register,
  login,
  logout,
  getInfos,
  updateInfos,
  userSuccessReset,
  updatePassword,
};
