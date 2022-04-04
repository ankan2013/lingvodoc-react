import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import ducks from "./ducks";

export default combineReducers({
  ...ducks,
  router: routerReducer,
  form: formReducer
});
