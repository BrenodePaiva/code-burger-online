import { yupResolver } from '@hookform/resolvers/yup'
import GoogleIcon from '@mui/icons-material/Google'
import { useGoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import { Button, ErrorMessage, LoadScreen } from '../../components'
import api from '../../services/api'
import { Container, ContainerItens, Label, Input } from './styles'

export function ResetPass() {
  const schema = Yup.object().shape({
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha de ter pelo menos 6 digitos'),
    confirmPass: Yup.string().oneOf(
      [Yup.ref('password')],
      'As senhas devem ser iguais'
    )
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const [load, setLoad] = useState(false)
  const { token } = useParams()
  const history = useHistory()

  const formSubmit = async formData => {
    try {
      setLoad(true)
      await toast.promise(
        api.post(`resetPassword/${token}`, {
          password: formData.password
        }),
        {
          pending: 'Verificando...',
          success: 'Senha alterada',
          error: 'O token está inválido ou expirado'
        }
      )
      setTimeout(() => {
        history.replace('/login')
      }, 900)
    } finally {
      setLoad(false)
    }
  }

  return (
    <Container>
      {load && <LoadScreen />}
      <ContainerItens>
        <img src={Logo} alt="logo-code-burger" />
        <h1>Redefinir senha</h1>

        <form noValidate onSubmit={handleSubmit(formSubmit)}>
          <Label>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            className={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPass')}
            className={errors.confirmPass?.message}
          />

          <ErrorMessage>{errors.confirmPass?.message}</ErrorMessage>

          <Button type="submit" style={{ margin: '32px 0 25px' }}>
            Redefinir
          </Button>
        </form>
      </ContainerItens>
    </Container>
  )
}
