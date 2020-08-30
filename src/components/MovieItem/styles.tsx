import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Container = styled.TouchableOpacity`
  border-radius: 3px;
  background-color: #ddd;
  padding: 10px;
  flex-direction: row;
  height: 210px;
  flex: 1;
`;

export const Item = styled.View`
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
`;

export const MovieImage = styled(FastImage)`
  align-self: flex-start;
  width: 127px;
  height: 190px;
  /* flex: 1; */
`;

export const MovieInfo = styled.Text`
  font-family: 'Roboto-Medium';
`;
