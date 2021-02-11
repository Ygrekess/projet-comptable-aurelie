import axios from "axios";

const addSpecialite = (poleId, specialite) => async (dispatch) => {
  dispatch({ type: "SPECIALITE_ADD_REQUEST" });
  try {
    const { data } = await axios.post("/api/specialites/", {
      specialite: specialite,
      poleId: poleId,
    });
    dispatch({ type: "SPECIALITE_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SPECIALITE_ADD_FAIL", payload: error.response.data });
  }
};

const getAllSpecialites = (poleId) => async (dispatch) => {
  dispatch({ type: "SPECIALITES_GET_REQUEST" });
  try {
    const { data } = await axios.get(`/api/specialites/all/${poleId}`);
    console.log(data);
    dispatch({ type: "SPECIALITES_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SPECIALITES_GET_FAIL", payload: error.response.data });
  }
};

const getOneSpecialite = (specialiteId) => async (dispatch) => {
  dispatch({ type: "SPECIALITE_GET_REQUEST" });
  try {
    const { data } = await axios.get(`/api/specialites/${specialiteId}`);
    dispatch({ type: "SPECIALITE_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SPECIALITE_GET_FAIL", payload: error.response.data });
  }
};

const updateSpecialite = (specialiteId, specialite) => async (dispatch) => {
  dispatch({ type: "SPECIALITE_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      `/api/specialites/${specialiteId}`,
      specialite
    );
    dispatch({ type: "SPECIALITE_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SPECIALITE_UPDATE_FAIL", payload: error.response.data });
  }
};

const resetSuccessSpecialite = () => (dispatch) => {
  dispatch({ type: "SPECIALITE_UPDATE_RESET" });
  dispatch({ type: "SPECIALITE_ADD_RESET" });
};

export {
  addSpecialite,
  getAllSpecialites,
  getOneSpecialite,
  updateSpecialite,
  resetSuccessSpecialite,
};
