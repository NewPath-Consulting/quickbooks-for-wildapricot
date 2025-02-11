import * as React from "react";
import {useNavigate} from "react-router-dom";

interface PageTemplateProps {
  title: string,
  subTitle: string,
  backUrl: string,
  nextUrl: string
}

export const PageTemplate = ({ title, subTitle, backUrl, nextUrl, children}: PageTemplateProps) => {

  const navigate = useNavigate();

  return (
    <main>
      <header>
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </header>
      {/*{errorMsg && <div style={{fontSize:'13px'}} className="alert alert-danger" role="alert">*/}
      {/*    <i style={{color: "#58151c"}} className={'bi bi-exclamation-circle'}></i> {errorMsg}*/}
      {/*</div>}*/}
      {children}
      <div className="mt-4">
        <button className={"border-black border-2 text-black me-3 bg-transparent c"} type={"submit"} onClick={() => navigate(backUrl)}>Back</button>
        <button className={"btn-success"} disabled={false} onClick={() => navigate(nextUrl)}>Next</button>
      </div>
    </main>
  )
}