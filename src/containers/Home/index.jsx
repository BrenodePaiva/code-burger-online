import React, { useEffect, useState } from 'react'

import HomeLogo from '../../assets/home-logo.svg'
import { CategoryCarrousel, OffersCarrousel } from '../../components'
import { Container, HomeImg } from './styles'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

export function Home() {
  const history = useHistory()

  useEffect(() => {
    fetch(`${api.defaults.baseURL}/health`).catch(() => {
      history.replace('/login')
    })
  }, [history])

  return (
    <Container>
      <HomeImg src={HomeLogo} alt="logo-home" />
      <CategoryCarrousel />
      <OffersCarrousel />
    </Container>
  )
}
