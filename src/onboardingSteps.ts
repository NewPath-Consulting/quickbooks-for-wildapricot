

export interface ISteps {
  title: string,
  subTitle: string,
  endpoint: string
}

export const steps: ISteps[] = [
  {
    title: "Create Make account",
    subTitle: "Sign up at Make.com",
    endpoint: "/"
  },
  {
    title: "Create Connections",
    subTitle: "Create your app connections",
    endpoint: "/create-connections"
  },
  {
    title: "General Information",
    subTitle: "Provide your company information",
    endpoint: "/general-information"
  },
  {
    title: "Customer Information",
    subTitle: "Map your field names",
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
    endpoint: "/donation-config"
  },
  {
    title: "Scheduling",
    subTitle: "Schedule your workflows",
    endpoint: "/job-scheduling"
  },
  {
    title: "Review and Clone",
    subTitle: "Automate your work flows",
    endpoint: "/clone-scenarios"
  },
]