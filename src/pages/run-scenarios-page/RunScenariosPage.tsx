import {PageTemplate} from "../../components/page-template/PageTemplate.tsx";
import {useState} from "react";


export const RunScenariosPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | string[]>('')

  const handleSubmission = () => {

  }

  return (
    <PageTemplate
      title={'Run and Test Automation'}
      subTitle={'Test your automation by creating invoices or payments, and then clicking run to see expected results.'}
      validate={handleSubmission}
      errorMsg={errorMsg}
    >

    </PageTemplate>
  )
}