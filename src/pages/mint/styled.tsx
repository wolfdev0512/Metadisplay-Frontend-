// @styled components
import styled from "styled-components";

//-------------------------------------------------------------------------

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

//----------------------------------

export const MintForm = styled.div`
  width: 50%;
  height: fit-content;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #15151d;
  box-shadow: 0 0 24px 0 rgba(75, 75, 88, 54%);
  border-radius: 15px;
  margin: 50px auto;
  padding: 50px;
`;

//----------------------------------

export const MintSoon = styled.div`
  font-family: "Smooch", cursive;
  font-size: 100px;
  color: white;
`;

//----------------------------------

export const ImageLayout = styled.div`
  width: 50%;
`;
export const ImageContainer = styled.div`
  img {
    width: 80%;
    height: 80%;
    border-radius: 20px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TextSupply = styled.div`
  color: #6b41cb;
  text-align: center;
  padding-top: 20px;
  font-size: 20px;
  font-weight: 600;
`;

//----------------------------------
export const MintLayout = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.div`
  color: white;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;
