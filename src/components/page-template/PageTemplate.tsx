import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

interface PageTemplateProps {
  title: string,
  subTitle: string,
  backUrl: string,
  validate: () => void,
  errorMsg: string
}

export const PageTemplate = ({ title, subTitle, backUrl, validate, children, errorMsg}: PageTemplateProps) => {

  const errorRef = useRef(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMsg && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [errorMsg]);

  return (
    <main ref={errorRef}>
      <header>
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </header>
      {errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">
          <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}
      </div>}
      {children}
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate(backUrl)}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={validate}>Next</button>
      </div>
    </main>
  )
}