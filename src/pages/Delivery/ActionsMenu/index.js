import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

import { Button, Content, Item } from '~/components/ActionsMenu';

export default function ActionsMenu({
  delivery,
  hidden,
  onToggleVisibility,
  onDetails,
  onEdit,
  onDelete,
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

          {delivery.editable && (
            <Item onClick={onEdit}>
              <MdEdit size={18} color="#4d85ee" />
              Editar
            </Item>
          )}

          {delivery.deletable && (
            <Item onClick={onDelete}>
              <MdDeleteForever size={18} color="#de3b3b" />
              Deletar
            </Item>
          )}
        </ul>
      </Content>
    </Button>
  );
}

ActionsMenu.propTypes = {
  delivery: PropTypes.shape({
    editable: PropTypes.bool,
    deletable: PropTypes.bool,
  }).isRequired,
  hidden: PropTypes.bool.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

ActionsMenu.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};
