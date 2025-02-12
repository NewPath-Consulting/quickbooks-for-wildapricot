import {useOnBoarding} from "../../hooks/useOnboarding.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {PageTemplate} from "../../components/page-template/PageTemplate.tsx";
import './Scheduling.css'
import {SchedulingComponent} from "../../components/scheduling-component/SchedulingComponent.tsx";

export const SchedulingPage = () => {
  const { setCurrentStep } = useOnBoarding()
  const navigate = useNavigate()

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setCurrentStep(7)

  }, []);

  const handleSubmission = () => {
    navigate('/clone-scenarios')
  }

  return (
    <PageTemplate
      title={'Job Scheduling'}
      subTitle={'Schedule your workflows either manually or automatically.'}
      backUrl={'/donation-config'}
      validate={handleSubmission}
      errorMsg={errorMsg}
    >
      <SchedulingComponent title={'Invoice'}/>
      <SchedulingComponent title={'Payment'}/>
      <SchedulingComponent title={'Donation'}/>

    </PageTemplate>
  )
}