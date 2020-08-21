import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #c72828;
  padding: 30px 0;

  header {
    width: 85%;
    margin: 0 auto;
    padding: 0 0 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    img {
      margin-bottom: 64px;
    }

    nav {
      width: 100%;
      margin: 0 auto;

      div {
        button {
          width: 100%;
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          position: relative;

          transition: background-color 0.2s;

          &:hover {
            background: ${shade(0.2, '#39b100')};
          }

          .text {
            padding: 16px 24px;
          }

          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 0 8px 8px 0;
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }

  @media (min-width: 700px) {
    header {
      max-width: 1280px;
      flex-direction: row;
      padding: 0 0 160px;

      img {
        margin-bottom: 0;
      }

      nav {
        margin: 0;
        width: unset;

        div {
          button {
            .text {
            }
            .icon {
              position: relative;
            }
          }
        }
      }
    }
  }
`;
