import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import AvatarGroup from '~/components/AvatarGroup';
import SearchInput from '~/components/SearchInput';
import { AddButton } from '~/components/Button';
import Loading from '~/components/Loading';
import ActionsMenu from './ActionsMenu';

import api from '~/services/api';
import history from '~/services/history';

import { PageHeader, PageContent } from './styles';

export default function Deliveryman() {
  const [loading, setLoading] = useState(true);
  const [deliverymen, setDeliverymen] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [visibleMenu, setVisibleMenu] = useState(undefined);

  useEffect(() => {
    async function loadDeliverymen() {
      try {
        const response = await api.get('deliverymen');

        setDeliverymen(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response ? err.response.data.error : 'Erro ao buscar entregadores'
        );
      }
    }

    loadDeliverymen();
  }, []);

  async function handleFilterDeliverymen(page) {
    try {
      setLoading(true);
      setCurrentPage(page || 1);

      const params = { page: page || 1, q: filter };

      const response = await api.get('deliverymen', { params });

      setDeliverymen(response.data);
      setLoading(false);

      if (!page) {
        setItensAmount(Number(response.headers['x-total-count']));
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response ? err.response.data.error : 'Erro ao buscar entregadores'
      );
    }
  }

  function handleDelete(id) {
    async function deleteDeliveryman(closeAlert) {
      try {
        closeAlert();
        setLoading(true);

        await api.delete(`/deliverymen/${id}`);

        setItensAmount(itensAmount - 1);

        if (deliverymen.length === 1) {
          if (currentPage > 1) {
            handleFilterDeliverymen(currentPage - 1);
          } else {
            setLoading(false);
          }
        } else {
          setDeliverymen(
            deliverymen.filter((deliveryman) => deliveryman.id !== id)
          );
          setLoading(false);
        }

        toast.success('Entregador excluído com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response ? err.response.data.error : 'Erro ao excluir entregador'
        );
      }
    }

    confirmAlert({
      customUI: (props) => (
        <Alert
          {...props}
          title="Atenção"
          message="Deseja realmente excluir o entregador?"
          onConfirm={deleteDeliveryman}
        />
      ),
    });
  }

  function handleKeyPress(keyCode) {
    if (keyCode === 13) {
      handleFilterDeliverymen();
    }
  }

  function toggleActionsMenu(id) {
    setVisibleMenu(id !== visibleMenu ? id : undefined);
  }

  return (
    <>
      <PageHeader>
        <h1>Gerenciando entregadores</h1>

        <div>
          <SearchInput
            placeholder="Buscar por entregadores"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e.which)}
          />

          <AddButton url="/deliverymen/new" />
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
                <th id="avatarColumn">Foto</th>
                <th id="nameColumn">Nome</th>
                <th id="emailColumn">Email</th>
                <th id="actionsColumn">Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymen.map((deliveryman) => (
                <tr key={deliveryman.id}>
                  <td>#{deliveryman.id}</td>
                  <td>
                    <AvatarGroup
                      src={
                        deliveryman.avatar ? deliveryman.avatar.url : undefined
                      }
                      name={deliveryman.name}
                      showFullName={false}
                    />
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    <ActionsMenu
                      hidden={visibleMenu !== deliveryman.id}
                      onToggleVisibility={() =>
                        toggleActionsMenu(deliveryman.id)
                      }
                      onEdit={() =>
                        history.push(`/deliverymen/${deliveryman.id}`)
                      }
                      onDelete={() => handleDelete(deliveryman.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </PageContent>

      {deliverymen.length > 0 && (
        <Pagination
          itensAmount={itensAmount}
          currentPage={currentPage}
          handlePaginationPrev={() => handleFilterDeliverymen(currentPage - 1)}
          handlePaginationNext={() => handleFilterDeliverymen(currentPage + 1)}
        />
      )}
    </>
  );
}
