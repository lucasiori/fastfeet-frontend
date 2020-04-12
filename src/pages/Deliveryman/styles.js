import styled from 'styled-components';

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;

  > div {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    @media screen and (max-width: 450px) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }
  }
`;

export const PageContent = styled.section`
  margin-top: 30px;
  overflow: auto;

  th#nameColumn,
  th#emailColumn {
    min-width: 200px;
  }
`;
