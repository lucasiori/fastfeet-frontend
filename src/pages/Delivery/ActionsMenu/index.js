import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

import {
  MenuButton,
  MenuContent,
  MenuItem,
} from '~/pages/_layout/default/styles';

export default function ActionsMenu({
  delivery,
  hidden,
  onToggleVisibility,
  onDetails,
  onEdit,
  onDelete,
}) {
  return (
    <MenuButton onClick={onToggleVisibility}>
      <FaEllipsisH size={16} color="#c6c6c6" />

      <MenuContent hidden={hidden ? 1 : 0}>
        <ul>
          <MenuItem onClick={onDetails}>
            <IoMdEye size={18} color="#8e5be8" />
            Visualizar
          </MenuItem>

          {!delivery.start_date && !delivery.canceled_at && (
            <MenuItem onClick={onEdit}>
              <MdEdit size={18} color="#4d85ee" />
              Editar
            </MenuItem>
          )}

          {(!delivery.start_date ||
            (delivery.start_date && delivery.end_date) ||
            delivery.canceled_at) && (
            <MenuItem onClick={onDelete}>
              <MdDeleteForever size={18} color="#de3b3b" />
              Deletar
            </MenuItem>
          )}
        </ul>
      </MenuContent>
    </MenuButton>
  );
}

ActionsMenu.propTypes = {
  delivery: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    canceled_at: PropTypes.string,
  }).isRequired,
  hidden: PropTypes.bool.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onDetails: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

ActionsMenu.defaultProps = {
  onDetails: () => {},
  onEdit: () => {},
  onDelete: () => {},
};
