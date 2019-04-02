import {createStore, applyMiddleware, compose} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "../../reducers";
import {isWeb, isDev} from "../common";

export const createHistory = isWeb
  ? require("history").createBrowserHistory
  : require("history").createMemoryHistory;

export const history = createHistory();

const initialState = {};
const composeEnhancers =
  (isWeb && isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
);

export default store;
