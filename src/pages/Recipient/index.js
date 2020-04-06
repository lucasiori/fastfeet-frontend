import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { MdSearch, MdAdd } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import ActionsMenu from './ActionsMenu';

import api from '~/services/api';
import history from '~/services/history';

import { PageHeader, Button, Table } from '~/pages/_layout/default/styles';
import { Content } from './styles';

export default function Recipient() {
  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [visibleMenu, setVisibleMenu] = useState({});

  useEffect(() => {
    async function loadRecipients() {
      try {
        const response = await api.get('recipients');

        setRecipients(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao buscar destinatários');
      }
    }

    loadRecipients();
  }, []);

  async function handlePagination(page) {
    try {
      setLoading(true);

      const params = { page };

      if (filter) params.q = filter;

      const response = await api.get('recipients', { params });

      setRecipients(response.data);

      setLoading(false);
      setCurrentPage(page);
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao buscar destinatários');
    }
  }

  function handleFilter(keyCode) {
    if (keyCode !== 13) return;

    async function filterRecipients() {
      try {
        setLoading(true);
        setCurrentPage(1);

        const params = { currentPage };

        if (filter) params.q = filter;

        const response = await api.get('recipients', { params });

        setRecipients(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao buscar destinatários');
      }
    }

    filterRecipients();
  }

  function handleDelete(id) {
    async function deleteRecipient(closeAlert) {
      try {
        closeAlert();
        setLoading(true);

        await api.delete(`/recipients/${id}`);

        setItensAmount(itensAmount - 1);

        if (recipients.length === 1) {
          if (currentPage > 1) {
            handlePagination(currentPage - 1);
          } else {
            setLoading(false);
          }
        } else {
          setRecipients(recipients.filter((recipient) => recipient.id !== id));
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao excluir destinatário');
      }
    }

    const customUI = ({ onClose }) => (
      <Alert
        title="Atenção"
        message="Deseja realmente excluir o destinatário?"
        onCancel={onClose}
        onConfirm={() => deleteRecipient(onClose)}
      />
    );

    customUI.propTypes = {
      onClose: PropTypes.func.isRequired,
    };

    confirmAlert({ customUI });
  }

  function toggleActionsMenu(id) {
    setVisibleMenu(id !== visibleMenu ? id : undefined);
  }

  return (
    <>
      <PageHeader>
        <h1>Gerenciando destinatários</h1>

        <div>
          <input
            name="search"
            placeholder="Buscar por destinatários"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyPress={(e) => handleFilter(e.which)}
          />

          <MdSearch size={18} color="#999" />

          <Link to="/recipients/new">
            <Button type="button">
              <MdAdd size={18} color="#fff" />
              Cadastrar
            </Button>
          </Link>
        </div>
      </PageHeader>

      <Content>
        {loading ? (
          <AiOutlineLoading size={100} color="#7159c1" />
        ) : (
          <Table>
            <thead>
              <tr>
                <th id="idColumn">ID</th>
                <th id="nameColumn">Nome</th>
                <th id="addressColumn">Endereço</th>
                <th id="actionsColumn">Ações</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td>#{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>{`${recipient.address}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}</td>
                  <td>
                    <ActionsMenu
                      hidden={visibleMenu !== recipient.id}
                      onToggleVisibility={() => toggleActionsMenu(recipient.id)}
                      onEdit={() => history.push(`/recipients/${recipient.id}`)}
                      onDelete={() => handleDelete(recipient.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Content>

      <Pagination
        itensAmount={itensAmount}
        currentPage={currentPage}
        handlePaginationPrev={() => handlePagination(currentPage - 1)}
        handlePaginationNext={() => handlePagination(currentPage + 1)}
      />
    </>
  );
}
