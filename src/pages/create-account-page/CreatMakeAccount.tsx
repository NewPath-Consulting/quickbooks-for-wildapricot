import './CreateMakeAccount.css'
import {Instruction} from "../../components/instruction/Instruction.tsx";

const steps: {description: string, img: string}[] = [
  {
    description: "Go to make.com and sign up for free",
    img: "make.png"
  },
  {
    description: "Get the pro version subscription",
    img: "payment.png"
  },
  {
    description: "Add an access token to your account",
    img: "token.png"
  },
  {
    description: "Copy and paste the API key and Base URL here to verify",
    img: "verify.png"
  }
]

export const CreatMakeAccountPage = () => {

  return (
    <main>
      <header>
        <h2>Create a Make account</h2>
        <p>Lets get your Make account set up!</p>
      </header>
      <div className={"instructions-container"}>
        {
          steps.map((step, index) => <Instruction stepNumber={index+1} img={step.img} description={step.description} />)
        }
      </div>
    </main>
  )
}