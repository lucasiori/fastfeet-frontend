import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';

import {
  MenuButton,
  MenuContent,
  MenuItem,
} from '~/pages/_layout/default/styles';

export default function ActionsMenu({ hidden, onToggleVisibility, onDelete }) {
  return (
    <MenuButton onClick={onToggleVisibility}>
      <FaEllipsisH size={16} color="#c6c6c6" />

      <MenuContent hidden={hidden ? 1 : 0}>
        <ul>
          <MenuItem>
            <MdEdit size={16} color="#4d85ee" />
            Editar
          </MenuItem>
          <MenuItem onClick={onDelete}>
            <MdDeleteForever size={16} color="#de3b3b" />
            Excluir
          </MenuItem>
        </ul>
      </MenuContent>
    </MenuButton>
  );
}

ActionsMenu.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
