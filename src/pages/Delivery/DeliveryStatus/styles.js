import styled from 'styled-components';

const Status = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  align-items: center;
  border-radius: 30px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding: 2px 10px;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const Started = styled(Status)`
  background: #bad2ff;
  color: #4d85ee;

  &::before {
    background: #4d85ee;
  }
`;

export const Finalized = styled(Status)`
  background: #dff0df;
  color: #2ca42b;

  &::before {
    background: #2ca42b;
  }
`;

export const Canceled = styled(Status)`
  background: #fab0b0;
  color: #de3b3b;

  &::before {
    background: #de3b3b;
  }
`;

export const Pending = styled(Status)`
  background: #f0f0df;
  color: #c1bc35;

  &::before {
    background: #c1bc35;
  }
`;
