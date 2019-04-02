import styled from "styled-components/native/index";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export const ComponentContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 0;
  position: relative;
  padding: 0;
`;

export const InputContainer = styled.View`
  flex: 1;
`;

export const ShowPasswordTouchable = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  bottom: auto;
  top: 30px;
  right: 0;
  opacity: 0.4;
`;

export const EyeIcon = styled(Icon)`
  text-align: center;
  line-height: 32px;
`;
