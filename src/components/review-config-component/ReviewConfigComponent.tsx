import {useRef, useState} from "react";
import './ReviewConfig.css'
import {useNavigate} from "react-router-dom";
import * as url from "url";

interface IReviewConfig{
  img: string,
  title: string,
  urlLocation: string,
  children ?: any
  subTitle ?: string
}

export const ReviewConfigComponent = (props: IReviewConfig) => {
  const {img, children, subTitle, title, urlLocation} = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  };

  return (
    <div className={'p-3 rounded-2 review-container mb-4'} data-bs-toggle="collapse" data-bs-target={`#collapseExample-${urlLocation}`} role="button" aria-expanded="false" aria-controls="collapseExample" onClick={toggleCollapse}>
      <div className={'d-flex justify-content-between'}>
        <div className={'d-flex align-items-center gap-2'}>
          <div className={'review-icon'}>
            <i className={`bi ${img}`} style={{color: '#2bec4b', fontSize: "clamp(15px, 2vw, 20px)"}}></i>
          </div>
          <h6 className={'m-0'} style={{fontSize: 'clamp(14px, 2vw, 16px)'}}>{title}</h6>
        </div>
        <div className={'d-flex align-items-center gap-2'}>
          <button className={'edit-button'} onClick={() => navigate(urlLocation)}>Edit</button>
          <i className={`bi bi-chevron-down chevron ${!isCollapsed ? 'spin' : ''}`} style={{color: 'grey'}}></i>
        </div>
      </div>
      <div className="collapse" style={{fontSize: 'clamp(14px, 2vw, 16px)'}} id={`collapseExample-${urlLocation}`}>
        {children}
      </div>
    </div>
  )
}