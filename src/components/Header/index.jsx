import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Person from '../../assets/person.svg'
import { useUser } from '../../hooks/UserContext'
import {
  Container,
  ContainerLeft,
  ContainerRight,
  ContainerText,
  NavBurgue,
  NavMobile,
  PageLink,
  SettingsBox,
  SettingsItens,
  UserBox,
  UserImg,
  UserInfoBox
} from './styles'
import paths from '../../constants/paths'
import { Badge, IconButton, styled } from '@mui/material'
import { useCart } from '../../hooks/CartContext'

export function Header() {
  const {
    replace,
    push,
    location: { pathname }
  } = useHistory()

  const { logout, userData } = useUser()
  const { cartProducts, cartQuantity } = useCart()

  const logoutUser = () => {
    logout()
    replace('/login')
  }

  const [openBox, setOpenBox] = useState(false)
  const [mobile, setMobile] = useState(false)

  const handleOpenBox = () => {
    !openBox ? setOpenBox(true) : setOpenBox(false)
  }

  const handleMobile = () => {
    !mobile ? setMobile(true) : setMobile(false)
    setOpenBox(false)
  }

  const StyledBadge = styled(Badge)({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid #fff`,
      padding: '0 4px'
    }
  })

  return (
    <Container>
      <ContainerLeft>
        <PageLink
          onClick={() => {
            push('/')
            setOpenBox(false)
          }}
          data-is-active={pathname === '/'}
        >
          Home
        </PageLink>
        <PageLink
          onClick={() => push('/produtos')}
          data-is-active={pathname.includes('produtos')}
        >
          Ver Produtos
        </PageLink>
      </ContainerLeft>

      <ContainerRight>
        <NavBurgue onClick={handleMobile} data-is-mobile={mobile}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </NavBurgue>
        <NavMobile data-is-mobile={mobile}>
          <PageLink>
            <IconButton
              aria-label="cart"
              onClick={() => {
                push('/carrinho')
                setMobile(false)
              }}
            >
              <StyledBadge badgeContent={cartQuantity} color="secondary">
                <ShoppingCartIcon
                  style={{ color: '#9758a6', fontSize: '28px' }}
                />
              </StyledBadge>
            </IconButton>
          </PageLink>

          <div className="line"></div>

          <UserBox onClick={handleOpenBox} data-open-box={openBox}>
            <UserImg>
              <img src={Person} alt="usuário-imagem" />
            </UserImg>

            <ContainerText>
              <p>Olá, {userData.name}</p>
            </ContainerText>
          </UserBox>
        </NavMobile>
        <SettingsBox data-open-box={openBox}>
          <UserInfoBox>
            <AccountCircleIcon fontSize="large" />
            <div>
              <p>{userData.name}</p> <span>{userData.email}</span>
            </div>
          </UserInfoBox>

          <SettingsItens
            onClick={() => {
              push('/user-edit')
              setOpenBox(false)
              setMobile(false)
            }}
            data-is-active={pathname.includes('user-edit')}
          >
            <ManageAccountsIcon /> <p>Configuraçôes</p>
          </SettingsItens>

          <SettingsItens
            onClick={() => {
              push('/meus-pedidos')
              setOpenBox(false)
              setMobile(false)
            }}
          >
            <ShoppingBagIcon /> <p>Meus Pedidos</p>
          </SettingsItens>

          <SettingsItens onClick={logoutUser}>
            <LogoutIcon style={{ color: '#9758a6' }} />
            <p style={{ fontWeight: 'bold', color: '#9758a6' }}>Sair</p>
          </SettingsItens>

          {userData.admin && (
            <SettingsItens onClick={() => push(paths.Order)}>
              <ContactEmergencyIcon style={{ color: '#9758a6' }} />
              <p style={{ fontWeight: 'bold', color: '#9758a6' }}>Admin</p>
            </SettingsItens>
          )}
        </SettingsBox>
      </ContainerRight>
    </Container>
  )
}
