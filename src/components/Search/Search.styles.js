import styledNative from "styled-components/native";
import {themed} from "../../utils/common";

export const SearchBox = styledNative.View`
  display: flex;
  padding: 11px 0;
  flex-direction: row;
`;

export const SearchInput = themed(styledNative.TextInput`
  font-size: 18px;
  border: 0;
  opacity: 0.6;
  line-height: 1.33;
  margin-left: 8px;
  &::placeholder {
    color: black;
    font-style: italic;
  }
  &:focus {
    outline-width: 0;
  }
`);
