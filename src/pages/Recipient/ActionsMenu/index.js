import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';

import { Button, Content, Item } from '~/components/ActionsMenu';

export default function ActionsMenu({
  hidden,
  onToggleVisibility,
  onEdit,
  onDelete,
}) {
  return (
    <Button onClick={onToggleVisibility}>
      <FaEllipsisH size={16} color="#c6c6c6" />

      <Content hidden={hidden ? 1 : 0}>
        <ul>
          <Item onClick={onEdit}>
            <MdEdit size={18} color="#4d85ee" />
            Editar
          </Item>
          <Item onClick={onDelete}>
            <MdDeleteForever size={18} color="#de3b3b" />
            Excluir
          </Item>
        </ul>
      </Content>
    </Button>
  );
}

ActionsMenu.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
