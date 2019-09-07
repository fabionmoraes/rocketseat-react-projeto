import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 20px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li a {
    display: flex;
    color: #fff;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 12px;
    background: #3f2e7a;
    flex: 1;
    justify-content: center;
    align-items: center;

    &:hover {
      color: #fff;
      background: #7159c1;
    }
  }

  /** Dar margin somente no segundo item */
  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      span {
        color: #ccc;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      font-size: 11px;
      margin-top: 5px;
      color: #999;
    }
  }
`;
