import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { MdSearch, MdAdd } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

import AvatarGroup from '~/components/AvatarGroup';
import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import Details from './Details';
import ActionsMenu from './ActionsMenu';

import api from '~/services/api';

import getDeliveryState from '~/utils/getDeliveryState';

import { PageHeader, Button, Table } from '~/pages/_layout/default/styles';
import { Content, Status } from './styles';

export default function Delivery() {
  const [loading, setLoading] = useState(true);
  const [deliveries, setDeliveries] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [visibleMenu, setVisibleMenu] = useState(undefined);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const response = await api.get('deliveries');

        setDeliveries(
          response.data.map((delivery) => ({
            ...delivery,
            state: getDeliveryState(delivery),
          }))
        );

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao buscar encomendas');
      }
    }

    loadDeliveries();
  }, []);

  async function handlePagination(page) {
    try {
      setLoading(true);

      const params = { page };

      if (filter) params.q = filter;

      const response = await api.get('deliveries', { params });

      setDeliveries(
        response.data.map((delivery) => ({
          ...delivery,
          state: getDeliveryState(delivery),
        }))
      );

      setLoading(false);
      setCurrentPage(page);
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao buscar encomendas');
    }
  }

  function handleFilter(keyCode) {
    if (keyCode !== 13) return;

    async function filterDeliveries() {
      try {
        setLoading(true);
        setCurrentPage(1);

        const params = { currentPage };

        if (filter) params.q = filter;

        const response = await api.get('deliveries', { params });

        setDeliveries(
          response.data.map((delivery) => ({
            ...delivery,
            state: getDeliveryState(delivery),
          }))
        );

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao buscar encomendas');
      }
    }

    filterDeliveries();
  }

  function handleDelete(id) {
    async function deleteDelivery(closeAlert) {
      try {
        closeAlert();
        setLoading(true);

        await api.delete(`/deliveries/${id}`);

        setItensAmount(itensAmount - 1);

        if (deliveries.length === 1) {
          if (currentPage > 1) {
            handlePagination(currentPage - 1);
          } else {
            setLoading(false);
          }
        } else {
          setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao excluir encomenda');
      }
    }

    const customUI = ({ onClose }) => (
      <Alert
        title="Atenção"
        message="Deseja realmente excluir a encomenda?"
        onCancel={onClose}
        onConfirm={() => deleteDelivery(onClose)}
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
          <input
            name="search"
            placeholder="Buscar por encomendas"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyPress={(e) => handleFilter(e.which)}
          />

          <MdSearch size={18} color="#999" />

          <Button type="button">
            <MdAdd size={18} color="#fff" />
            Cadastrar
          </Button>
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
                    <Status
                      color={delivery.state.labelColor}
                      background={delivery.state.background}
                    >
                      {delivery.state.description}
                    </Status>
                  </td>
                  <td>
                    <ActionsMenu
                      hidden={visibleMenu !== delivery.id}
                      onToggleVisibility={() => toggleActionsMenu(delivery.id)}
                      onDetails={() => showDeliveryDetails(delivery)}
                      onDelete={() => handleDelete(delivery.id)}
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
