import {Dimensions} from "react-native";
import {SET_DIMENSIONS} from "../actions/types";

const initialDimensions = Dimensions.get("window");

const getSize = ({width}) => {
  switch (true) {
    case width < 768:
      return "S";
    case width < 1024:
      return "M";
    default:
      return "L";
  }
};

const initialState = {
  ...initialDimensions,
  size: getSize(initialDimensions),
};
export default (state = initialState, {type, ...dimensions}) => {
  switch (type) {
    case SET_DIMENSIONS:
      return {
        ...state,
        ...dimensions,
        size: getSize(dimensions),
      };
    default:
      return state;
  }
};
