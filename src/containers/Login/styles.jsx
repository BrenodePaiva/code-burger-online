import styled, { keyframes } from 'styled-components'

import Background from '../../assets/background.svg'
import LoginImg from '../../assets/login-image.svg'
import LoginMobile from '../../assets/login-img-mobile.png'
import breakPoints from '../../styles/breakPoints'

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
  color: #333;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`

export const ProgressBar = styled.div`
  width: 80%;
  height: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
`

const load = keyframes`
  0% { width: 0; }
  50% { width: 80%; }
  100% { width: 100%; }
`

export const Progress = styled.div`
  height: 100%;
  width: 0;
  background-color: #007bff;
  animation: ${load} 43.037s linear infinite;
`

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${Background}');
  display: flex;
  justify-content: center;
  align-items: center;

  .image {
    height: 88%;
    width: 464.266px;
    background-image: url('${LoginImg}');
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px 0 0 10px;
  }

  @media ${breakPoints.xbig} {
    flex-direction: column;

    .image {
      height: 60px;
      width: 404px;
      background-image: url('${LoginMobile}');
      border-radius: 10px 10px 0 0;
    }
  }

  @media ${breakPoints.xsmall} {
    .image {
      width: 98%;
    }
  }
`

export const ContainerItens = styled.div`
  border-radius: 0 10px 10px 0;
  background: #373737;
  height: 88%;
  padding: 25px 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.13px;
    text-align: center;
    margin-top: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  @media ${breakPoints.xbig} {
    border-radius: 0 0 10px 10px;
  }

  @media ${breakPoints.xsmall} {
    width: 98%;
  }
`

export const Label = styled.p`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.06px;
  margin: 28px 0 5px;
`

export const Input = styled.input`
  height: 38px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 3px 3px 10px 0px rgba(74, 144, 226, 0.19);
  border: ${props => (props.className ? '2px solid #cc1717' : 'none')};
  outline: none;
  padding: 0 10px;
`

export const SignInLink = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  margin-bottom: 4px;
`
