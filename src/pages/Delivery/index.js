import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import {
  MdSearch,
  MdAdd,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

import AvatarGroup from '~/components/AvatarGroup';
import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import Details from './Details';
import ActionsMenu from './ActionsMenu';

import api from '~/services/api';
import history from '~/services/history';

import getDeliveryState from '~/utils/getDeliveryState';

import { Button, Table } from '~/pages/_layout/default/styles';
import { DeliveryPageHeader, ProblemsFilter, Content, Status } from './styles';

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
        toast.error(err.response.data.error || 'Erro ao buscar encomendas');
      }
    }

    loadDeliveries();
  }, []);

  async function handleFilterDeliveries(page) {
    try {
      setLoading(true);
      setCurrentPage(page || 1);

      const params = { page: page || 1 };

      if (filter) {
        params.q = filter;
      }

      const response = await api.get(
        problemsFilter ? 'problems/deliveries' : 'deliveries',
        { params }
      );

      setDeliveries(
        response.data.map((delivery) => ({
          ...delivery,
          state: getDeliveryState(delivery),
        }))
      );

      setLoading(false);

      if (!page) {
        setItensAmount(Number(response.headers['x-total-count']));
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.error || 'Erro ao buscar encomendas');
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
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error || 'Erro ao excluir encomenda');
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
      <DeliveryPageHeader>
        <h1>Gerenciando encomendas</h1>

        <div>
          <input
            name="search"
            placeholder="Buscar por encomendas"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyPress={(e) => {
              if (e.which === 13) handleFilterDeliveries();
            }}
          />

          <MdSearch size={18} color="#999" />

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

          <Link to="/deliveries/new">
            <Button type="button">
              <MdAdd size={18} color="#fff" />
              Cadastrar
            </Button>
          </Link>
        </div>
      </DeliveryPageHeader>

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
          </Table>
        )}
      </Content>

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
