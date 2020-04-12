import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

import { Button, Content, Item } from '~/components/ActionsMenu';

export default function ActionsMenu({
  problem,
  hidden,
  onToggleVisibility,
  onDetails,
  onCancelDelivery,
}) {
  return (
    <Button onClick={onToggleVisibility}>
      <FaEllipsisH size={16} color="#c6c6c6" />

      <Content hidden={hidden ? 1 : 0}>
        <ul>
          <Item onClick={onDetails}>
            <IoMdEye size={18} color="#8e5be8" />
            Visualizar
          </Item>

          {problem.delivery.cancelable && (
            <Item onClick={onCancelDelivery}>
              <MdDeleteForever size={18} color="#de3b3b" />
              Cancelar entrega
            </Item>
          )}
        </ul>
      </Content>
    </Button>
  );
}

ActionsMenu.propTypes = {
  problem: PropTypes.shape({
    delivery: PropTypes.shape({
      cancelable: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  hidden: PropTypes.bool.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  onCancelDelivery: PropTypes.func,
};

ActionsMenu.defaultProps = {
  onCancelDelivery: () => {},
};
