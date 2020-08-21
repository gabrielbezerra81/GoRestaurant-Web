import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw !important;
  height: 100vh;
  max-width: 100% !important;

  @media (min-width: 700px) {
    max-width: 100% !important;
  }
`;

export const FoodsContainer = styled.div`
  width: 85%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 0;
  margin-top: -100px;

  > div {
    margin-bottom: 48px;
  }

  @media (min-width: 750px) {
    width: 90%;
    max-width: 1280px;
    margin-top: -140px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;

    > div {
      margin-bottom: 0;
    }
  }

  @media (max-width: 1120px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }
`;
