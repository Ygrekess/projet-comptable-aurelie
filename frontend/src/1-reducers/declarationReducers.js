const addDeclarationReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_ADD_REQUEST":
      return { loading: true };
    case "DECLARATION_ADD_SUCCESS":
      return { loading: false, success: true };
    case "DECLARATION_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATION_ADD_RESET":
      return {};
    default:
      return state;
  }
};

const allDeclarationsGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "DECLARATIONS_GET_REQUEST":
      return { loading: true };
    case "DECLARATIONS_GET_SUCCESS":
      return { loading: false, declarations: action.payload };
    case "DECLARATIONS_GET_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const oneDeclarationGetReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_GET_REQUEST":
      return { loading: true };
    case "DECLARATION_GET_SUCCESS":
      return { loading: false, declaration: action.payload };
    case "DECLARATION_GET_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const declarationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_UPDATE_REQUEST":
      return { loading: true };
    case "DECLARATION_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "DECLARATION_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATION_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

export {
  addDeclarationReducer,
  allDeclarationsGetReducer,
  oneDeclarationGetReducer,
  declarationUpdateReducer,
};
