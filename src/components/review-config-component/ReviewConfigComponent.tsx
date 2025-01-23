import {useRef, useState} from "react";
import './ReviewConfig.css'
import {useNavigate} from "react-router-dom";

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
    <div className={'p-3 rounded-2 review-container mb-4'} data-bs-toggle="collapse" data-bs-target={`#collapseExample-${img}`} role="button" aria-expanded="false" aria-controls="collapseExample" onClick={toggleCollapse}>
      <div className={'d-flex justify-content-between'}>
        <div className={'d-flex align-items-center gap-2'}>
          <div className={'review-icon'}>
            <i className={`bi ${img}`} style={{color: '#2bd5ec', fontSize: "20px"}}></i>
          </div>
          <h6 className={'m-0'}>{title}</h6>
        </div>
        <div className={'d-flex align-items-center gap-2'}>
          <button className={'edit-button'} onClick={() => navigate(urlLocation)}>Edit</button>
          <i className={`bi bi-chevron-down chevron ${!isCollapsed ? 'spin' : ''}`} style={{color: 'grey'}}></i>
        </div>
      </div>
      <div className="collapse" id={`collapseExample-${img}`}>
        {children}
      </div>
    </div>
  )
}