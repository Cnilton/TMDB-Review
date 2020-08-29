import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import TMDBLogo from '../../assets/images/logo.svg';

export const Container = styled.View`
  flex: 1;
`;

export const Gradient = styled(LinearGradient)`
  flex: 1;
  padding: 20px 20px 0px 20px;
`;

export const Logo = styled(TMDBLogo)`
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
  align-self: center;
`;

export const Loading = styled.ActivityIndicator`
  background-color: #ffffff66;
  align-self: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

export const Separator = styled.View`
  margin: 5px 0;
  background-color: #00000000;
  width: 100%;
  height: 0;
`;
