import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

import AvatarGroup from '~/components/AvatarGroup';
import DeliveryStatus from './DeliveryStatus';
import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import SearchInput from '~/components/SearchInput';
import { AddButton } from '~/components/Button';
import Loading from '~/components/Loading';
import Details from './Details';
import ActionsMenu from './ActionsMenu';

import api from '~/services/api';
import history from '~/services/history';

import { PageHeader, ProblemsFilter, Button, PageContent } from './styles';

export default function Delivery() {
  const [loading, setLoading] = useState(true);
  const [deliveries, setDeliveries] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [problemsFilter, setProblemsFilter] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(undefined);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const response = await api.get('deliveries?status=all');

        setDeliveries(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response ? err.response.data.error : 'Erro ao buscar encomendas'
        );
      }
    }

    loadDeliveries();
  }, []);

  async function handleFilterDeliveries(page) {
    try {
      setLoading(true);
      setCurrentPage(page || 1);

      const params = { page: page || 1, q: filter };

      const url = problemsFilter
        ? 'problems/deliveries'
        : 'deliveries?status=all';
      const response = await api.get(url, { params });

      setDeliveries(response.data);
      setLoading(false);

      if (!page) {
        setItensAmount(Number(response.headers['x-total-count']));
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response ? err.response.data.error : 'Erro ao buscar encomendas'
      );
    }
  }

  useEffect(() => {
    handleFilterDeliveries();
  }, [problemsFilter]); // eslint-disable-line

  function handleDelete(id) {
    async function deleteDelivery(closeAlert) {
      try {
        closeAlert();
        setLoading(true);

        await api.delete(`/deliveries/${id}`);

        setItensAmount(itensAmount - 1);

        if (deliveries.length === 1) {
          if (currentPage > 1) {
            handleFilterDeliveries(currentPage - 1);
          } else {
            setLoading(false);
          }
        } else {
          setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
          setLoading(false);
        }

        toast.success('Entregada excluída com sucesso');
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response ? err.response.data.error : 'Erro ao excluir encomenda'
        );
      }
    }

    confirmAlert({
      customUI: (props) => (
        <Alert
          {...props}
          title="Atenção"
          message="Deseja realmente excluir a encomenda?"
          onConfirm={deleteDelivery}
        />
      ),
    });
  }

  function toggleActionsMenu(id) {
    setVisibleMenu(id !== visibleMenu ? id : undefined);
  }

  function handleKeyPress(keyCode) {
    if (keyCode === 13) {
      handleFilterDeliveries();
    }
  }

  function showDeliveryDetails(delivery) {
    confirmAlert({
      customUI: () => <Details delivery={delivery} />,
    });
  }

  return (
    <>
      <PageHeader>
        <h1>Gerenciando encomendas</h1>

        <div>
          <SearchInput
            placeholder="Buscar por encomendas"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e.which)}
          />

          <ProblemsFilter
            active={problemsFilter}
            onClick={() => setProblemsFilter(!problemsFilter)}
          >
            <Button type="button">
              {problemsFilter ? (
                <MdCheckBox size={18} color="#fff" />
              ) : (
                <MdCheckBoxOutlineBlank size={18} color="#fff" />
              )}
              Encomendas com problema
            </Button>
          </ProblemsFilter>

          <AddButton url="/deliveries/new" />
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
                <th id="recipientColumn">Destinatário</th>
                <th id="deliverymanColumn">Entregador</th>
                <th id="cityColumn">Cidade</th>
                <th id="stateColumn">Estado</th>
                <th id="statusColumn">Status</th>
                <th id="actionsColumn">Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>#{delivery.id}</td>
                  <td>{delivery.recipient.name}</td>
                  <td>
                    <AvatarGroup
                      src={
                        delivery.deliveryman.avatar
                          ? delivery.deliveryman.avatar.url
                          : undefined
                      }
                      name={delivery.deliveryman.name}
                    />
                  </td>
                  <td>{delivery.recipient.city}</td>
                  <td>{delivery.recipient.state}</td>
                  <td>
                    <DeliveryStatus status={delivery.status} />
                  </td>
                  <td>
                    <ActionsMenu
                      delivery={delivery}
                      hidden={visibleMenu !== delivery.id}
                      onToggleVisibility={() => toggleActionsMenu(delivery.id)}
                      onDetails={() => showDeliveryDetails(delivery)}
                      onEdit={() => history.push(`/deliveries/${delivery.id}`)}
                      onDelete={() => handleDelete(delivery.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </PageContent>

      {deliveries.length > 0 && (
        <Pagination
          itensAmount={itensAmount}
          currentPage={currentPage}
          handlePaginationPrev={() => handleFilterDeliveries(currentPage - 1)}
          handlePaginationNext={() => handleFilterDeliveries(currentPage + 1)}
        />
      )}
    </>
  );
}
