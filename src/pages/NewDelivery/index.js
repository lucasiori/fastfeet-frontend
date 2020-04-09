import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

import RecipientsSelect from './RecipientsSelect';
import DeliverymenSelect from './DeliverymenSelect';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Header,
  BackButton,
  SubmitButton,
  Content,
  FormContainer,
  FormGroup,
} from './styles';

export default function NewRecipient() {
  const [delivery, setDelivery] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    recipient_id: Yup.string().required('* Campo Obrigatório'),
    deliveryman_id: Yup.string().required('* Campo Obrigatório'),
    product: Yup.string().required('* Campo Obrigatório'),
  });

  useEffect(() => {
    async function loadDelivery(id) {
      try {
        const response = await api.get(`/deliveries/${id}`);

        setDelivery(response.data);
      } catch (err) {
        toast.error(err.response.data.error || 'Erro ao buscar entrega');
      }
    }

    const { pathname } = history.location;
    const [, , param] = pathname.split('/');

    if (param !== 'new') {
      loadDelivery(param);
    }
  }, []);

  async function handleSubmit(data) {
    async function storeDelivery() {
      try {
        await api.post('/deliveries', data);

        setLoading(false);
        toast.success('Entrega cadastrada com sucesso');
        history.push('/deliveries');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error || 'Erro ao cadastradar entrega');
      }
    }

    async function updateDelivery() {
      try {
        await api.put(`/deliveries/${delivery.id}`, data);

        setLoading(false);
        toast.success('Entrega atualizada com sucesso');
        history.push('/deliveries');
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error || 'Erro ao atualizar entrega');
      }
    }

    setLoading(true);

    if (delivery && delivery.id) {
      updateDelivery();
    } else {
      storeDelivery();
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={delivery} onSubmit={handleSubmit}>
        <Header>
          <h1>
            {delivery.id ? 'Edição de encomendas' : 'Cadastro de encomendas'}
          </h1>

          <div>
            <Link to="/deliveries">
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
          <FormContainer>
            <FormGroup id="recipientFormGroup">
              <label htmlFor="recipient">Destinatário</label>
              <RecipientsSelect
                defaultValue={
                  delivery.id
                    ? {
                        value: delivery.recipient_id,
                        label: delivery.recipient.name,
                      }
                    : undefined
                }
              />
            </FormGroup>

            <FormGroup id="deliverymanFormGroup">
              <label htmlFor="deliveryman">Entregador</label>
              <DeliverymenSelect
                defaultValue={
                  delivery.id
                    ? {
                        value: delivery.deliveryman_id,
                        label: delivery.deliveryman.name,
                      }
                    : undefined
                }
              />
            </FormGroup>
          </FormContainer>

          <FormGroup>
            <label htmlFor="product">Nome do Produto</label>
            <Input id="product" name="product" />
          </FormGroup>
        </Content>
      </Form>
    </Container>
  );
}
