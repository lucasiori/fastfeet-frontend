export default (delivery) => {
  if (delivery.canceled_at) {
    return {
      description: 'Cancelada',
      labelColor: '#de3b3b',
      background: '#fab0b0',
    };
  }

  if (delivery.end_date) {
    return {
      description: 'Entregue',
      labelColor: '#2ca42b',
      background: '#dff0df',
    };
  }

  if (delivery.start_date) {
    return {
      description: 'Retirada',
      labelColor: '#4d85ee',
      background: '#bad2ff',
    };
  }

  return {
    description: 'Pendente',
    labelColor: '#c1bc35',
    background: '#f0f0df',
  };
};
