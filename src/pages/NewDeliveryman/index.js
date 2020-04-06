import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Header,
  BackButton,
  SubmitButton,
  Content,
  FormGroup,
} from './styles';

export default function NewDeliveryman() {
  const [deliveryman, setDeliveryman] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('* Campo Obrigatório'),
    email: Yup.string()
      .email('Informe um email válido')
      .required('* Campo Obrigatório'),
  });

  useEffect(() => {
    async function loadDeliveryman(id) {
      try {
        const response = await api.get(`/deliverymen/${id}`);

        setDeliveryman(response.data);
      } catch (err) {
        toast.error('Erro ao buscar entregador');
      }
    }

    const { pathname } = history.location;
    const [, , param] = pathname.split('/');

    if (param !== 'new') {
      loadDeliveryman(param);
    }
  }, []);

  function handleSubmit(data) {
    async function storeDeliveryman() {
      try {
        await api.post('/deliverymen', data);

        setLoading(false);
        history.push('/deliverymen');
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao salvar entregador');
      }
    }

    async function updateDeliveryman() {
      try {
        await api.put(`/deliverymen/${deliveryman.id}`, data);

        setLoading(false);
        history.push('/deliverymen');
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao atualizar entregador');
      }
    }

    setLoading(true);

    if (deliveryman && deliveryman.id) {
      updateDeliveryman();
    } else {
      storeDeliveryman();
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={deliveryman} onSubmit={handleSubmit}>
        <Header>
          <h1>Cadastro de entregadores</h1>

          <div>
            <Link to="/deliverymen">
              <BackButton>
                <IoIosArrowBack size={18} color="#fff" />
                VOLTAR
              </BackButton>
            </Link>

            <SubmitButton disabled={loading ? 1 : 0}>
              <FaCheck size={18} color="#fff" />
              SALVAR
            </SubmitButton>
          </div>
        </Header>

        <Content>
          <FormGroup>
            <label htmlFor="name">Nome</label>
            <Input id="name" name="name" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" />
          </FormGroup>
        </Content>
      </Form>
    </Container>
  );
}
