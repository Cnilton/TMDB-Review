import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 15,
  },
})`
  background-color: #eeeeee;
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
`;

export const MoviePoster = styled.Image`
  align-self: center;
  width: 127px;
  height: 190px;
`;

export const MovieName = styled.Text`
  margin: 10px 0;
  font-size: 16px;
  align-self: center;
  text-align: center;
  font-family: 'Roboto-Medium';
`;

export const MovieInfoTitle = styled.Text`
  font-weight: bold;
  font-family: 'Roboto-Medium';
`;

export const MovieInfo = styled.Text``;
