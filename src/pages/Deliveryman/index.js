import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { MdSearch, MdAdd } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import AvatarGroup from '~/components/AvatarGroup';
import ActionsMenu from './ActionsMenu';

import api from '~/services/api';

import { PageHeader, Button, Table } from '~/pages/_layout/default/styles';
import { Content } from './styles';

export default function Deliveryman() {
  const [loading, setLoading] = useState(true);
  const [deliverymen, setDeliverymen] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [visibleMenu, setVisibleMenu] = useState({});

  useEffect(() => {
    async function loadDeliverymen() {
      try {
        const response = await api.get('deliverymen');

        setDeliverymen(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao buscar entregadores');
      }
    }

    loadDeliverymen();
  }, []);

  async function handlePagination(page) {
    try {
      setLoading(true);

      const params = { page };

      if (filter) params.q = filter;

      const response = await api.get('deliverymen', { params });

      setDeliverymen(response.data);

      setLoading(false);
      setCurrentPage(page);
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao buscar entregadores');
    }
  }

  function handleFilter(keyCode) {
    if (keyCode !== 13) return;

    async function filterDeliverymen() {
      try {
        setLoading(true);
        setCurrentPage(1);

        const params = { currentPage };

        if (filter) params.q = filter;

        const response = await api.get('deliverymen', { params });

        setDeliverymen(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao buscar entregadores');
      }
    }

    filterDeliverymen();
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
            handlePagination(currentPage - 1);
          } else {
            setLoading(false);
          }
        } else {
          setDeliverymen(
            deliverymen.filter((deliveryman) => deliveryman.id !== id)
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        toast.error('Erro ao excluir entregador');
      }
    }

    const customUI = ({ onClose }) => (
      <Alert
        title="Atenção"
        message="Deseja realmente excluir o entregador?"
        onCancel={onClose}
        onConfirm={() => deleteDeliveryman(onClose)}
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
        <h1>Gerenciando entregadores</h1>

        <div>
          <input
            name="search"
            placeholder="Buscar por entregadores"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyPress={(e) => handleFilter(e.which)}
          />

          <MdSearch size={18} color="#999" />

          <Link to="/deliverymen/new">
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
                      onDelete={() => handleDelete(deliveryman.id)}
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
