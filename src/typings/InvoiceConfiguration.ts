import {InvoiceMapping} from "../pages/invoice-configuration-page/InvoiceConfigPage.tsx";
import {Account} from "../pages/payment-config-page/PaymentConfigPage.tsx";

export interface InvoiceConfiguration {
  invoiceOrderType: string,
  defaultInvoiceMapping: InvoiceMapping,
  alternateInvoiceMapping: InvoiceMapping[],
  accountReceivable: Account
}