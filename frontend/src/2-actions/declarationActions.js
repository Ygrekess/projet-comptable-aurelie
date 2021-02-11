import axios from "axios";

const addDeclaration = (poleId, declaration) => async (dispatch) => {
  dispatch({ type: "DECLARATION_ADD_REQUEST" });
  try {
    const { data } = await axios.post("/api/declarations/", {
      declaration: declaration,
      poleId: poleId,
    });
    dispatch({ type: "DECLARATION_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATION_ADD_FAIL", payload: error.response.data });
  }
};

const getAllDeclarations = (poleId) => async (dispatch) => {
  dispatch({ type: "DECLARATIONS_GET_REQUEST" });
  try {
    const { data } = await axios.get(`/api/declarations/all/${poleId}`);
    console.log(data);
    dispatch({ type: "DECLARATIONS_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATIONS_GET_FAIL", payload: error.response.data });
  }
};

const getOneDeclaration = (declarationId) => async (dispatch) => {
  dispatch({ type: "DECLARATION_GET_REQUEST" });
  try {
    const { data } = await axios.get(`/api/declarations/${declarationId}`);
    dispatch({ type: "DECLARATION_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATION_GET_FAIL", payload: error.response.data });
  }
};

const updateDeclaration = (declarationId, declaration) => async (dispatch) => {
  dispatch({ type: "DECLARATION_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      `/api/declarations/${declarationId}`,
      declaration
    );
    dispatch({ type: "DECLARATION_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATION_UPDATE_FAIL", payload: error.response.data });
  }
};

const resetSuccessDeclaration = () => (dispatch) => {
  dispatch({ type: "DECLARATION_UPDATE_RESET" });
  dispatch({ type: "DECLARATION_ADD_RESET" });
};

export {
  addDeclaration,
  getAllDeclarations,
  getOneDeclaration,
  updateDeclaration,
  resetSuccessDeclaration,
};
