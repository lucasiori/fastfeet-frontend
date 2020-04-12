import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import Alert from '~/components/Alert';
import Pagination from '~/components/Pagination';
import SearchInput from '~/components/SearchInput';
import { AddButton } from '~/components/Button';
import Loading from '~/components/Loading';
import ActionsMenu from './ActionsMenu';

import api from '~/services/api';
import history from '~/services/history';

import { PageHeader, PageContent } from './styles';

export default function Recipient() {
  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [visibleMenu, setVisibleMenu] = useState(undefined);

  useEffect(() => {
    async function loadRecipients() {
      try {
        const response = await api.get('recipients');

        setRecipients(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response
            ? err.response.data.error
            : 'Erro ao buscar destinatários'
        );
      }
    }

    loadRecipients();
  }, []);

  async function handleFilterRecipients(page) {
    try {
      setLoading(true);
      setCurrentPage(page || 1);

      const params = { page: page || 1, q: filter };

      const response = await api.get('recipients', { params });

      setRecipients(response.data);
      setLoading(false);

      if (!page) {
        setItensAmount(Number(response.headers['x-total-count']));
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response ? err.response.data.error : 'Erro ao buscar destinatários'
      );
    }
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
            handleFilterRecipients(currentPage - 1);
          } else {
            setLoading(false);
          }
        } else {
          setRecipients(recipients.filter((recipient) => recipient.id !== id));
          setLoading(false);
        }

        toast.success('Destinatário excluído com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response
            ? err.response.data.error
            : 'Erro ao excluir destinatário'
        );
      }
    }

    confirmAlert({
      customUI: (props) => (
        <Alert
          {...props}
          title="Atenção"
          message="Deseja realmente excluir o destinatário?"
          onConfirm={deleteRecipient}
        />
      ),
    });
  }

  function handleKeyPress(keyCode) {
    if (keyCode === 13) {
      handleFilterRecipients();
    }
  }

  function toggleActionsMenu(id) {
    setVisibleMenu(id !== visibleMenu ? id : undefined);
  }

  return (
    <>
      <PageHeader>
        <h1>Gerenciando destinatários</h1>

        <div>
          <SearchInput
            placeholder="Buscar por destinatários"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e.which)}
          />

          <AddButton url="/recipients/new" />
        </div>
      </PageHeader>

      <PageContent>
        {loading ? (
          <Loading />
        ) : (
          <table>
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
                  <td>{`${recipient.address}, ${recipient.address_number}, ${recipient.city} - ${recipient.state}`}</td>
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
          </table>
        )}
      </PageContent>

      {recipients.length > 0 && (
        <Pagination
          itensAmount={itensAmount}
          currentPage={currentPage}
          handlePaginationPrev={() => handleFilterRecipients(currentPage - 1)}
          handlePaginationNext={() => handleFilterRecipients(currentPage + 1)}
        />
      )}
    </>
  );
}
