

export interface ISteps {
  stepNumber: number,
  title: string,
  subTitle: string,
  endpoint: string
}

export const steps: ISteps[] = [
  {
    stepNumber: 1,
    title: "Create make account",
    subTitle: "Sign up at Make.com",
    endpoint: "/"
  },
  {
    stepNumber: 2,
    title: "Connections",
    subTitle: "Create your app connections",
    endpoint: "/create-connections"
  },
  {
    stepNumber: 3,
    title: "Customer Information",
    subTitle: "Information ",
    endpoint: "/customer-information"
  },
  {
    stepNumber: 4,
    title: "Map data",
    subTitle: "Configure your data",
    endpoint: "/"
  },
  {
    stepNumber: 5,
    title: "Run and Test",
    subTitle: "Test you app by running it",
    endpoint: "/"
  }
]