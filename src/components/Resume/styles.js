import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  width: 98%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  margin-top: -50px;
  justify-content: space-around;
`;

export const Sticker = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f8fa;
  border: 2px dashed #003366;
  border-radius: 10px;
  padding: 15px 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-weight: bold;
  color: #333;
  gap: 10px;
  max-width: 200px;
  text-align: center;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #003366;
    color: white;
    border-radius: 50%;
    padding: 5px;
  }
`;