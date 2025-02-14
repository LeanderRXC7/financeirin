import React from "react";
import * as C from "./styles";
import ResumeItem from "../ResumeItem";

import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
  FaPiggyBank,
} from "react-icons/fa";

const Resume = ({income, expense, total}) => {
  return (
    <C.Container>
      <ResumeItem title="Entradas" Icon={FaRegArrowAltCircleUp} value={income} />
      <ResumeItem title="Saídas" Icon={FaRegArrowAltCircleDown} value={expense}/>
      <ResumeItem title="Total" Icon={FaDollarSign} value={total}/>
      {/* Adesivo de aviso */}
      <C.Sticker>
        <div className="icon">
          <FaPiggyBank size={20} />
        </div>
        <span>
          Filtre suas despesas e experimente clicar no botão para obter sugestões de economia
          personalizadas!
        </span>
      </C.Sticker>
    </C.Container>
  );
};

export default Resume;
