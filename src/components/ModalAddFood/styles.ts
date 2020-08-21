import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;
    transition: background-color 0.2s;

    display: flex;
    flex-direction: row;
    position: relative;
    /* align-items: center; */

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
      margin: 0 auto;
    }
  }

  @media (max-width: 450px) {
    padding: 36px 30px;
  }
`;
