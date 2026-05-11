import styled, { keyframes } from 'styled-components'

import Background from '../../assets/background.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${Background}');
  display: flex;
  justify-content: center;
  align-items: center;
`

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
