import randomItem from 'random-item';

const colors = [
  { labelColor: '#a28fd0', background: '#f4effc' },
  { labelColor: '#cb946c', background: '#fcf4ee' },
  { labelColor: '#83cec9', background: '#ebfbfa' },
  { labelColor: '#cc7584', background: '#ffeef1' },
  { labelColor: '#a8d080', background: '#f4f9ef' },
  { labelColor: '#cccc8b', background: '#fcfcef' },
];

export default () => {
  const randomColor = randomItem(colors);

  return randomColor;
};
