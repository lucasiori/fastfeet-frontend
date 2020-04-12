import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import Loading from '~/components/Loading';
import ActionsMenu from './ActionsMenu';
import Details from './Details';

import api from '~/services/api';

import { PageContent } from './styles';

export default function Recipient() {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState(undefined);

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get('/problems');

        setProblems(response.data);

        setLoading(false);
        setItensAmount(Number(response.headers['x-total-count']));
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response
            ? err.response.data.error
            : 'Erro ao buscar problemas nas entregas'
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
        err.response
          ? err.response.data.error
          : 'Erro ao buscar problemas nas entregas'
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
          problems.map((problem) =>
            problem.delivery_id === id
              ? {
                  ...problem,
                  delivery: { ...problem.delivery, cancelable: false },
                }
              : problem
          )
        );

        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(
          err.response ? err.response.data.error : 'Erro ao cancelar entrega'
        );
      }
    }

    confirmAlert({
      customUI: (props) => (
        <Alert
          {...props}
          title="Atenção"
          message="Deseja realmente cancelar a entrega?"
          onConfirm={cancelDelivery}
        />
      ),
    });
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
      <header>
        <h1>Problemas na entrega</h1>
      </header>

      <PageContent>
        {loading ? (
          <Loading />
        ) : (
          <table>
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
                      problem={problem}
                      hidden={visibleMenu !== problem.id}
                      onToggleVisibility={() => toggleActionsMenu(problem.id)}
                      onDetails={() => showProblemDetails(problem)}
                      onCancelDelivery={() => handleCancelDelivery(problem.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </PageContent>

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
