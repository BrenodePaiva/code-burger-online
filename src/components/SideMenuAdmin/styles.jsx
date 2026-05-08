import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import breakPoints from '../../styles/breakPoints'

export const Container = styled.div`
  background-color: #3c3c3c;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.15);
  width: 230px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  transition: width 0.5s ease-in-out;

  hr {
    margin: 30px 15px;
  }

  .warp-arrow {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    pointer-events: none;

    .arrow {
      transition: all 1s ease;
      transform: ${props => props['data-is-mobile'] && 'rotateY(180deg)'};
    }
  }

  @media ${breakPoints.xbig} {
    width: ${props => (props['data-is-mobile'] ? '230px' : '50px')};

    .warp-arrow {
      pointer-events: all;
    }

    .warp {
      transform: ${props =>
        props['data-is-mobile'] ? 'translateX(0px)' : 'translateX(-400px)'};
      transition: transform 0.5s linear;
    }
  }
`

export const ArrowIcon = styled(ArrowForwardIcon)`
  opacity: 0;
  color: #fff;

  @media ${breakPoints.xbig} {
    opacity: 1;
    cursor: pointer;
  }
`

export const UserBox = styled.div`
  display: flex;
  padding: 0px 20px 0 20px;
  margin-top: 20px;
  color: #fff;
  cursor: pointer;
`
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  span {
    font-size: 12px;
    font-weight: 300;
  }
`

export const UserIconStyled = styled(AccountCircleIcon)`
  margin-right: 6px;
`

export const ItemContainer = styled(Link)`
  height: 60px;
  display: flex;
  align-items: center;
  background: ${props => (props.isActive ? '#565656' : 'none')};
  border-radius: 2px;
  margin: 8px;
  padding-left: 20px;

  text-decoration: none;

  .icon {
    color: #fff;
  }

  .log-out {
    color: #e83b31;
  }

  &:hover {
    background: #565656;
  }
`

export const ListLink = styled.p`
  font-size: 14px;
  color: #fff;
  margin-left: 8px;
`
