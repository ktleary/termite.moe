import styled from "styled-components";

const Input = styled.input`
  background: rgba(32, 35, 41, 1);
  border: 1px solid rgba(61, 65, 72, .6);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.87);
  font-size: 16px;
  height: 40px;
  padding: 8px;
  width: 100%;
  &:hover {
    border: 1px solid rgba(82,100,159, 0.6);
  }
  &:focus {
    border: 1px solid rgba(82,100,159, 1);
    outline: 0;
  }

  &:active {
    border: 1px solid rgba(65,79,125, 1);
    outline: 0;
  }
`;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-left: 0;
  padding-left: 12px;
  @media (max-width: 444px) {
    padding-left: 8px;
  }
`;

export { Input, InputContainer };
