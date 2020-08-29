import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-radius: 3px;
  background-color: #ddd;
  padding: 10px;
  flex-direction: row;
`;

export const Item = styled.View`
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
`;

export const MovieImage = styled.Image`
  align-self: flex-start;
  max-width: 50%;
  height: 234px;
  flex: 1;
  border-color: #efe;
  border-width: 1px;
  border-radius: 4px;
`;
