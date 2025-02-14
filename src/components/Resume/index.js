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
      <ResumeItem title="Entradas" Icon={() => <FaRegArrowAltCircleUp size={24} style={{ color: "green" }} />} value={income} />
      <ResumeItem title="Saídas" Icon={() => <FaRegArrowAltCircleDown size={24} style={{ color: "red" }} />} value={expense} />
      <ResumeItem title="Total" Icon={FaDollarSign} value={total}/>
      {/* Adesivo de aviso */}
      <C.Sticker>
        <div className="icon">
          <FaPiggyBank size={20} />
        </div>
        <span>
          Experimente clicar no botão e obtenha sugestões de economia
          personalizadas de acordo com seus gastos!
        </span>
      </C.Sticker>
    </C.Container>
  );
};

export default Resume;
