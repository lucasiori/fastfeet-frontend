import styled from 'styled-components';

export const Content = styled.section`
  margin-top: 30px;
  overflow: auto;

  @keyframes loading {
    to {
      transform: rotate(0deg);
    }

    from {
      transform: rotate(360deg);
    }
  }

  > svg {
    display: block;
    margin: 50px auto;
    animation: loading 1s linear infinite;
  }

  table {
    table-layout: fixed;
  }

  th#deliveryColumn {
    width: 120px;
  }

  th#descriptionColumn {
    width: 800px;

    @media screen and (max-width: 500px) {
      width: 500px;
    }
  }

  th#actionsColumn {
    width: 76px;
  }

  td.limited-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
