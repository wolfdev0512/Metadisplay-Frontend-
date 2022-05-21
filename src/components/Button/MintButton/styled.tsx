import styled from "styled-components";

export const MintButtonAction = styled.div<{ disabled?: boolean }>`
  height: 60px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  border: 3px solid #6b41cb;
  transition: 0.3s ease;
  font-size: 20px;
  box-shadow: 0.375em 0.375em 0 0 #343443;
  transition: 0.3s ease;
  position: relative;
  transform: translate(0);
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  &:hover {
    background: #6b41cb;
    transition: 0.3s ease;
    transform: translate(0.375em, 0.375em);
    box-shadow: 0 0 0 0 #343e47;
  }
`;
