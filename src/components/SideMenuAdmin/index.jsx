import LogoutIcon from '@mui/icons-material/Logout'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { useUser } from '../../hooks/UserContext'
import listLinks from './menu-list'
import {
  ArrowIcon,
  Container,
  ItemContainer,
  ListLink,
  UserBox,
  UserIconStyled,
  UserInfo
} from './styles'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export function SideMenuAdmin({ path }) {
  const { logout, userData } = useUser()
  const [mobile, setMobile] = useState(false)
  const history = useHistory()

  const handleNavMobile = () => {
    !mobile ? setMobile(true) : setMobile(false)
  }

  const logoutUser = () => {
    logout()
    history.replace('/login')
  }

  return (
    <Container data-is-mobile={mobile}>
      <div className="warp-arrow" onClick={handleNavMobile}>
        <span className="arrow">
          <ArrowIcon fontSize="large" />
        </span>
      </div>
      <div className="warp" data-is-mobile={mobile}>
        <UserBox onClick={() => history.push('/user-edit')}>
          <UserIconStyled />
          <UserInfo>
            {userData.name}
            <span>Admin</span>
          </UserInfo>
        </UserBox>

        <hr></hr>
        {listLinks.map(item => (
          <ItemContainer
            key={item.id}
            isActive={path === item.link}
            to={item.link}
          >
            <item.icon className="icon" />
            <ListLink> {item.label} </ListLink>
          </ItemContainer>
        ))}

        <hr></hr>
        <ItemContainer too="/login" onClick={logoutUser}>
          <LogoutIcon style={{ color: '#e83b31' }} />
          <ListLink className="log-out">Sair</ListLink>
        </ItemContainer>
      </div>
    </Container>
  )
}

SideMenuAdmin.propTypes = {
  path: PropTypes.string
}
