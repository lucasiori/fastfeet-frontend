import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import arraySort from 'array-sort';
import { IoIosArrowBack } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

import ZipCodeInput from './ZipCodeInput';
import StatesSelect from './StatesSelect';

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
  const [states, setStates] = useState([]);
  const [recipient, setRecipient] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('* Campo Obrigatório'),
    address: Yup.string().required('* Campo Obrigatório'),
    address_number: Yup.string().required('* Campo Obrigatório'),
    complement: Yup.string(),
    city: Yup.string().required('* Campo Obrigatório'),
    state: Yup.string().required('* Campo Obrigatório'),
    zip_code: Yup.string().required('* Campo Obrigatório'),
  });

  useEffect(() => {
    async function loadStates() {
      try {
        const response = await api.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        );

        setStates(
          arraySort(
            response.data.map((s) => ({
              value: s.nome,
              label: s.nome,
            })),
            'label'
          )
        );
      } catch (err) {
        toast.error('Erro ao buscar estados');
      }
    }

    loadStates();
  }, []);

  useEffect(() => {
    async function loadRecipient(id) {
      try {
        const response = await api.get(`/recipients/${id}`);

        setRecipient(response.data);
      } catch (err) {
        toast.error(err.response.data.error || 'Erro ao buscar destinatário');
      }
    }

    const { pathname } = history.location;
    const [, , param] = pathname.split('/');

    if (param !== 'new') {
      loadRecipient(param);
    }
  }, []);

  async function handleSubmit(data) {
    async function storeRecipient() {
      try {
        await api.post('/recipients', data);

        setLoading(false);
        toast.success('Destinatário cadastrado com sucesso');
        history.push('/recipients');
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response.data.error || 'Erro ao cadastrar destinatário'
        );
      }
    }

    async function updateRecipient() {
      try {
        await api.put(`/recipients/${recipient.id}`, data);

        setLoading(false);
        toast.success('Destinatário atualizado com sucesso');
        history.push('/recipients');
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response.data.error || 'Erro ao atualizar destinatário'
        );
      }
    }

    setLoading(true);

    if (recipient && recipient.id) {
      updateRecipient();
    } else {
      storeRecipient();
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={recipient} onSubmit={handleSubmit}>
        <Header>
          <h1>
            {recipient.id
              ? 'Edição de destinatários'
              : 'Cadastro de destinatários'}
          </h1>

          <div>
            <Link to="/recipients">
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

          <FormContainer>
            <FormGroup id="addressFormGroup">
              <label htmlFor="address">Endereço</label>
              <Input id="address" name="address" />
            </FormGroup>

            <FormGroup id="addressNumberFormGroup">
              <label htmlFor="address_number">Número</label>
              <Input id="address_number" name="address_number" />
            </FormGroup>

            <FormGroup id="complementFormGroup">
              <label htmlFor="complement">Complemento</label>
              <Input id="complement" name="complement" />
            </FormGroup>
          </FormContainer>

          <FormContainer>
            <FormGroup id="cityFormGroup">
              <label htmlFor="city">Cidade</label>
              <Input id="city" name="city" />
            </FormGroup>

            <FormGroup id="stateFormGroup">
              <label htmlFor="state">Estado</label>

              <StatesSelect
                options={states}
                defaultValue={recipient.state || undefined}
              />
            </FormGroup>

            <FormGroup id="zipCodeFormGroup">
              <label htmlFor="zip_code">CEP</label>
              <ZipCodeInput
                defaultValue={
                  recipient.id ? String(recipient.zip_code) : undefined
                }
              />
            </FormGroup>
          </FormContainer>
        </Content>
      </Form>
    </Container>
  );
}
