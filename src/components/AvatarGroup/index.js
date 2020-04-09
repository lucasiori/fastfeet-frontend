import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import generateRandomColor from '~/utils/generateRandomColor';

import { Wrapper, Avatar, Default } from './styles';

export default function AvatarGroup({ src, name, showFullName }) {
  const [avatarText, setAvatarText] = useState('');
  const [colors, setColors] = useState({});

  useEffect(() => {
    if (name) {
      const arrText = name.split(' ');

      setAvatarText(
        `${arrText[0].charAt(0).toUpperCase()}${
          arrText[1] ? arrText[1].charAt(0).toUpperCase() : ''
        }`
      );
    }

    setColors(generateRandomColor());
  }, [name]);

  return (
    <Wrapper>
      {src ? (
        <Avatar src={src} />
      ) : (
        <Default color={colors.labelColor} background={colors.background}>
          {avatarText}
        </Default>
      )}

      {showFullName && name}
    </Wrapper>
  );
}

AvatarGroup.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  showFullName: PropTypes.bool,
};

AvatarGroup.defaultProps = {
  src: undefined,
  name: '',
  showFullName: true,
};
