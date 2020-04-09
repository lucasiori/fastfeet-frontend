import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

import {
  MenuButton,
  MenuContent,
  MenuItem,
} from '~/pages/_layout/default/styles';

export default function ActionsMenu({
  hidden,
  onToggleVisibility,
  onDetails,
  showCancelDeliveryButton,
  onCancelDelivery,
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

          {showCancelDeliveryButton && (
            <MenuItem onClick={onCancelDelivery}>
              <MdDeleteForever size={18} color="#de3b3b" />
              Cancelar entrega
            </MenuItem>
          )}
        </ul>
      </MenuContent>
    </MenuButton>
  );
}

ActionsMenu.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  showCancelDeliveryButton: PropTypes.bool,
  onCancelDelivery: PropTypes.func,
};

ActionsMenu.defaultProps = {
  showCancelDeliveryButton: true,
  onCancelDelivery: () => {},
};
