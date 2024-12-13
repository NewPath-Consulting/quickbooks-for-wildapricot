

export interface ISteps {
  stepNumber: number,
  title: string,
  subTitle: string
}

export const steps: ISteps[] = [
  {
    stepNumber: 1,
    title: "Create make account",
    subTitle: "Sign up at Make.com"
  },
  {
    stepNumber: 2,
    title: "Connections",
    subTitle: "Create your app connections",
  },
  {
    stepNumber: 3,
    title: "Customer Information",
    subTitle: "Information ",
  },
  {
    stepNumber: 4,
    title: "Map data",
    subTitle: "Configure your data",
  },
  {
    stepNumber: 5,
    title: "Run and Test",
    subTitle: "Test you app by running it",
  }
]