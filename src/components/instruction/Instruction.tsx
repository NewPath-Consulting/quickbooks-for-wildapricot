import {JSX} from "react";
import './Instruction.css'
import * as React from "react";
export interface IInstructionProps {
  stepNumber: number,
  img: string,
  description: string,
}

export const Instruction: React.FC<IInstructionProps> = ({stepNumber, description, children, img}) => {

  return (
    <div className={"instruction-container"}>
      <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
        <img src={img} width={30} alt={"predefined images for each step"}/>
        <div>
          <strong>Step {stepNumber}</strong>
          <p>{description}</p>
        </div>
      </div>
      <i className={"bi bi-chevron-right"}></i>
    </div>
  )
}