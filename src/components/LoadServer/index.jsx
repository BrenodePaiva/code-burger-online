import React from 'react'
import { Container, LoadingContainer, Progress, ProgressBar } from './styles'

export function LoadServer() {
  return (
    <Container>
      <LoadingContainer>
        <h2>🔄 Iniciando servidor...</h2>
        <ProgressBar>
          <Progress />
        </ProgressBar>
        <p>Aguarde alguns segundos</p>
      </LoadingContainer>
    </Container>
  )
}
