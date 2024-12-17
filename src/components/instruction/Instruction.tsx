import {JSX, useRef, useState} from "react";
import './Instruction.css'
import * as React from "react";
export interface IInstructionProps {
  stepNumber: number,
  img: string,
  description: string,
}

export const Instruction: React.FC<IInstructionProps> = ({stepNumber, description, children, img}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`instruction-container`}>
      <div onClick={() => setExpanded(prev => !prev)} className={`instruction-header-container ${isExpanded ? "expanded" : ""}`}>
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <img src={img} width={30} alt={"predefined images for each step"}/>
          <div>
            <strong>Step {stepNumber}</strong>
            <p>{description}</p>
          </div>
        </div>
        <i className={!isExpanded ? "bi bi-chevron-right" : "bi bi-chevron-down"} ></i>
      </div>
      { isExpanded && <div ref={contentRef} className={`instruction-content ${isExpanded ? "expand" : ""}`}>
          {children}
      </div>
      }
    </div>
  )
}