import {useRef, useState} from "react";
import './ConnectionComponent.css'
import * as React from "react";
export interface ConnectionComponentProps {
  title: string,
  img: string,
  description: string,
}

export const ConnectionComponent: React.FC<ConnectionComponentProps> = ({title, description, img}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`instruction-container mb-3`}>
      <div className={`instruction-header-container ${isExpanded ? "expanded" : ""}`}>
        <div className={"d-flex gap-3 align-items-center"}>
          <img src={img} className={"rounded-1"} width={40} alt={"predefined images for each step"}/>
          <div>
            <strong className={"fw-medium"}>{title}</strong>
            <p style={{color: "gray"}}>{description}</p>
          </div>
        </div>
        <div className={"d-flex gap-3 align-items-center"}>
          <p>Learn More <i className={'bi bi-chevron-down'}></i></p>
          <div style={{height: "10px", width: "2px", background: 'rgb(0, 0, 0, 0.2)'}}/>
          <button className={"d-flex align-items-center fw-bold"}><i style={{color: 'white'}} className={'bi bi-link-45deg fs-5 me-2'}></i> Connect</button>
        </div>
      </div>
    </div>
  )
}