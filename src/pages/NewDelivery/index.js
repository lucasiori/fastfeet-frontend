import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { PageHeader } from '~/pages/_layout/default/styles';
import { Content } from './styles';

export default function NewDelivery() {
  return (
    <>
      <PageHeader />

      <Content />
    </>
  );
}
