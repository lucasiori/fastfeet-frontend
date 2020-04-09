import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';

import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import ActionsMenu from './ActionsMenu';
import Details from './Details';

import api from '~/services/api';

import { PageHeader, Table } from '~/pages/_layout/default/styles';
import { Content } from './styles';

export default function Recipient() {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState({});

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get('problems');

        setProblems(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response.data.error || 'Erro ao buscar problemas nas entregas'
        );
      }
    }

    loadProblems();
  }, []);

  async function handleFilterProblems(page) {
    try {
      setLoading(true);
      setCurrentPage(page);

      const response = await api.get('deliverymen', { page });

      setProblems(response.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response.data.error || 'Erro ao buscar problemas nas entregas'
      );
    }
  }

  function handleCancelDelivery(id) {
    async function cancelDelivery(closeAlert) {
      try {
        closeAlert();
        setLoading(true);

        await api.delete(`/problems/${id}/cancel-delivery`);

        setProblems(
          problems.map((problem) => ({
            ...problem,
            delivery: {
              id: problem.delivery.id,
              canceled_at:
                problem.id === id ? new Date() : problem.delivery.canceled_at,
            },
          }))
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data.error || 'Erro ao cancelar entrega');
      }
    }

    const customUI = ({ onClose }) => (
      <Alert
        title="Atenção"
        message="Deseja realmente cancelar a entrega?"
        onCancel={onClose}
        onConfirm={() => cancelDelivery(onClose)}
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

  function showProblemDetails(problem) {
    confirmAlert({
      customUI: () => <Details problem={problem} />,
    });
  }

  return (
    <>
      <PageHeader>
        <h1>Problemas na entrega</h1>
      </PageHeader>

      <Content>
        {loading ? (
          <AiOutlineLoading size={100} color="#7159c1" />
        ) : (
          <Table>
            <thead>
              <tr>
                <th id="deliveryColumn">Encomenda</th>
                <th id="descriptionColumn">Problema</th>
                <th id="actionsColumn">Ações</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem.id}>
                  <td>#{problem.delivery_id}</td>
                  <td className="limited-content">{problem.description}</td>
                  <td>
                    <ActionsMenu
                      hidden={visibleMenu !== problem.id}
                      onToggleVisibility={() => toggleActionsMenu(problem.id)}
                      onDetails={() => showProblemDetails(problem)}
                      showCancelDeliveryButton={
                        problem.delivery.canceled_at === null
                      }
                      onCancelDelivery={() => handleCancelDelivery(problem.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Content>

      {problems.length > 0 && (
        <Pagination
          itensAmount={itensAmount}
          currentPage={currentPage}
          handlePaginationPrev={() => handleFilterProblems(currentPage - 1)}
          handlePaginationNext={() => handleFilterProblems(currentPage + 1)}
        />
      )}
    </>
  );
}
