import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import { Button, ErrorMessage } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import { Container, ContainerItens, Label, Input, SignInLink } from './styles'

export function Register() {
  const { userData } = useUser()
  const history = useHistory()

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha de ter pelo menos 6 digitos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser inguais')
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
      const { status } = await toast.promise(
        api.post(
          'users',
          {
            name: clientData.name,
            email: clientData.email,
            password: clientData.password
          },
          {
            validateStatus: () => true
          }
        ),
        {
          pending: 'Verificando dados...',
          error: 'Falha no sistema'
        }
      )
      if (status === 201 || status === 200) {
        toast.success('Cadastrado com sucesso')
        setTimeout(() => {
          history.replace('/login')
        }, 300)
      } else if (status === 409) {
        toast.error('E-mail já cadastrado')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error(`Falha no sistema. Error:${err.errors}`)
    }
  }

  useEffect(() => {
    if (userData.token) {
      history.push('/')
    }
  }, [userData, history])

  return (
    <Container>
      <div className="image"></div>

      <ContainerItens>
        <img src={Logo} alt="logo-code-burger" />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label className={errors.name?.message}>Nome</Label>
          <Input {...register('name')} className={errors.name?.message} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label className={errors.name?.message}>E-mail</Label>
          <Input
            type="email"
            {...register('email')}
            className={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label className={errors.name?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            className={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label className={errors.name?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            className={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ margin: '25px 0' }}>
            Sign Up
          </Button>
        </form>

        <SignInLink>
          Já possui conta?{' '}
          <Link to="/login" style={{ color: '#fff' }}>
            Sign In
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
