import styled from "styled-components";

export const Label = styled.label`
  margin-bottom: 16px;
  color: black;

  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
  }
`;

export const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  padding: 12px;
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const ImagePreview = styled.img`
  width: 30%;
  max-height: 200px;
`;

export const ImageInput = styled.input`
  display: none;
`;
export const TextArea = styled.textarea`
  width: 96.5%;
  resize: none;
  height: 280px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Button = styled.button`
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  color: #fff;
  background-color: #202540;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #282d4e;
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Spinner = styled.div`
  position: absolute;
  height: 50vh;
  width: 57rem;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffffb7;
`;

export const LoadingText = styled.div`
  font-size: 24px;
  text-align: center;
`;

export const Error = styled.div`
  color: red;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
`;
