import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaCheck } from 'react-icons/fa';

import { BackButton } from '../../components/Button';
import AvatarInput from './AvatarInput';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  PageHeader,
  SubmitButton,
  PageContent,
  FormGroup,
} from './styles';

export default function NewDeliveryman() {
  const [deliveryman, setDeliveryman] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    avatar_id: Yup.string().nullable(),
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
        toast.error(
          err.response ? err.response.data.error : 'Erro ao buscar entregador'
        );
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
        toast.success('Entregador cadastrado com sucesso');
        history.push('/deliverymen');
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response
            ? err.response.data.error
            : 'Erro ao cadastrar entregador'
        );
      }
    }

    async function updateDeliveryman() {
      try {
        await api.put(`/deliverymen/${deliveryman.id}`, {
          ...data,
          avatar_id: data.avatar_id || null,
        });

        setLoading(false);
        toast.success('Entregador atualizado com sucesso');
        history.push('/deliverymen');
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response
            ? err.response.data.error
            : 'Erro ao atualizar entregador'
        );
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
        <PageHeader>
          <h1>{`${deliveryman.id ? 'Edição' : 'Cadastro'} de entregadores`}</h1>

          <div>
            <BackButton url="/deliverymen" />

            <SubmitButton disabled={loading ? 1 : 0}>
              <FaCheck size={18} color="#fff" />
              SALVAR
            </SubmitButton>
          </div>
        </PageHeader>

        <PageContent>
          <FormGroup>
            <AvatarInput
              defaultValue={
                deliveryman.id
                  ? { id: deliveryman.avatar_id, ...deliveryman.avatar }
                  : undefined
              }
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="name">Nome</label>
            <Input id="name" name="name" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" />
          </FormGroup>
        </PageContent>
      </Form>
    </Container>
  );
}
