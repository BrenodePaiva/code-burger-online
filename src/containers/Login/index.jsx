import { yupResolver } from '@hookform/resolvers/yup'
import GoogleIcon from '@mui/icons-material/Google'
import { useGoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import { Button, ErrorMessage, LoadScreen } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Container,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  LoadingContainer,
  ProgressBar,
  Progress
} from './styles'
import { LoadServer } from '../../components/LoadServer'

export function Login() {
  const history = useHistory()
  const { putUserData, userData } = useUser()
  const [load, setLoad] = useState(false)
  const [loadingApi, setLoadingApi] = useState(true)

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha de ter pelo menos 6 digitos')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      setLoad(true)
      const { data } = await toast.promise(
        api.post('sessions', {
          email: clientData.email,
          password: clientData.password
        }),
        {
          pending: 'Verificando dados',
          success: 'Seja Bem-Vindo',
          error: 'Verifique seu e-mail e senha'
        }
      )
      putUserData(data)

      setTimeout(() => {
        if (data.admin) {
          history.replace('/pedidos')
        } else {
          history.replace('/')
        }
      }, 500)
    } finally {
      setLoad(false)
    }
  }

  const redirectToGoogle = async () => {
    setLoad(true)
    const response = await api.get('/auth/google/url')
    window.location.href = response.data.url
  }

  useEffect(() => {
    fetch(`${api.defaults.baseURL}/health`)
      .then(() => setLoadingApi(false))
      .catch(() => setLoadingApi(false))

    const params = new URLSearchParams(window.location.search)
    const error = params?.get('error')

    const data = {
      token: params?.get('token'),
      name: params?.get('name'),
      email: params?.get('email'),
      id: params?.get('id'),
      google_id: params?.get('google')
    }

    if (data.token) {
      putUserData(data)
      toast.success('Seja Bem-Vindo')
      window.history.pushState({}, '', '/')
      history.replace('/')
    } else if (error) {
      toast.error('Desculpe, algo deu errado. Tente novamente mais tarde')
      window.history.pushState({}, '', '/erro-login')
    }
  }, [])

  if (loadingApi) {
    return <LoadServer />
  }

  return (
    <Container>
      {load && <LoadScreen />}
      <div className="image"></div>

      <ContainerItens>
        <img src={Logo} alt="logo-code-burger" />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>E-mail</Label>
          <Input
            type="email"
            {...register('email')}
            className={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            className={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ margin: '32px 0 25px' }}>
            Sign In
          </Button>
        </form>

        <SignInLink>
          Não possui conta?{' '}
          <Link to="/cadastro" style={{ color: '#fff' }}>
            Sign Up
          </Link>
        </SignInLink>
        <SignInLink>
          <Link to="/esqueceu-senha" style={{ color: '#fff' }}>
            Esqueceu sua senha?
          </Link>
        </SignInLink>
        <Button onClick={redirectToGoogle} style={{ marginTop: '10px' }}>
          <GoogleIcon style={{ marginRight: '5px', marginBottom: '3px' }} />
          Sign with Google
        </Button>
      </ContainerItens>
    </Container>
  )
}
