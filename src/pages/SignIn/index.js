import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import { Wrapper, Container, FormGroup, SubmitButton } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Informe um email válido')
      .required('* Campo obrigatório'),
    password: Yup.string().required('* Campo obrigatório'),
  });

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Wrapper>
      <Container>
        <img src={logo} alt="FastFeet" width="250" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="email">SEU E-MAIL</label>
            <Input type="email" id="email" name="email" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">SUA SENHA</label>
            <Input type="password" id="password" name="password" />
          </FormGroup>

          <SubmitButton type="submit" loading={loading ? 1 : 0}>
            {loading ? 'Carregando...' : 'Entrar no Sistema'}
          </SubmitButton>
        </Form>
      </Container>
    </Wrapper>
  );
}
