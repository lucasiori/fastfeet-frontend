import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const Default = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 5px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  padding: 6px;
`;
