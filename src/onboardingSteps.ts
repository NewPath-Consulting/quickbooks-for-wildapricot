

export interface ISteps {
  title: string,
  subTitle: string,
  endpoint: string
}

export const steps: ISteps[] = [
  {
    title: "Create make account",
    subTitle: "Sign up at Make.com",
    endpoint: "/"
  },
  {
    title: "Connections",
    subTitle: "Create your app connections",
    endpoint: "/create-connections"
  },
  {
    title: "Customer Information",
    subTitle: "Add your information",
    endpoint: "/customer-information"
  },
  {
    title: "Invoice Configuration",
    subTitle: "Configure your invoices",
    endpoint: "/invoice-config"
  },
  {
    title: "Payment Configuration",
    subTitle: "Configure your payments",
    endpoint: "/payment-config"
  },
  {
    title: "Donation Configuration",
    subTitle: "Configure your donations",
    endpoint: "/"
  },
  {
    title: "Run and Test",
    subTitle: "Test you app by running it",
    endpoint: "/"
  }
]