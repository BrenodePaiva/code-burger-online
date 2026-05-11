import React, { useEffect, useState } from 'react'

import HomeLogo from '../../assets/home-logo.svg'
import { CategoryCarrousel, OffersCarrousel } from '../../components'
import { Container, ContainerServer, HomeImg } from './styles'
import api from '../../services/api'
import { LoadServer } from '../../components/LoadServer'

export function Home() {
  const [loadingApi, setLoadingApi] = useState(true)

  useEffect(() => {
    fetch(`${api.defaults.baseURL}/health`)
      .then(() => setLoadingApi(false))
      .catch(() => setLoadingApi(false))
  }, [])

  if (loadingApi) {
    return (
      <ContainerServer>
        <LoadServer />
      </ContainerServer>
    )
  }

  return (
    <Container>
      <HomeImg src={HomeLogo} alt="logo-home" />
      <CategoryCarrousel />
      <OffersCarrousel />
    </Container>
  )
}
