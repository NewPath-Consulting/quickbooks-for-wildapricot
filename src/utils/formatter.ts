import {ICustomerInfo} from "../pages/customer-info-page/CustomerInformationPage.tsx";
import {Account, PaymentConfig} from "../pages/payment-config-page/PaymentConfigPage.tsx";
import {DonationFieldName, DonationMapping} from "../pages/donation-config-page/DonationConfigPage.tsx";
import {InvoiceConfiguration} from "../typings/InvoiceConfiguration.ts";


export const formatCustomerInfo = (customerInfo: ICustomerInfo) => {
  return {
    "Customer Field Config": {
      "WA Contact Field Names": {
        "User ID": customerInfo.userId || null,
        "First Name": customerInfo.firstName || null,
        "Last Name": customerInfo.lastName || null,
        "Email": customerInfo.email || null,
        "Phone": customerInfo.phoneNumber || null,
        "Organization": customerInfo.organization || null,
        "Street Address 1": customerInfo.address || null,
        "Street Address 2": null,
        "City": customerInfo.city || null,
        "Province": customerInfo.state || null,
        "Postal Code": null,
        "Country": customerInfo.country || null
      },
      "QB Display Name Format": customerInfo.displayName || null
    }
  };
}

export const formatPaymentConfig = (paymentConfig: PaymentConfig[], accountReceivable: Account, depositAccount: Account) => {

  return {
    "Payment Config": {
      "Payment Jobs Enabled": null,
      "Payment Job Scheduling": {
        "Payment Job Scheduling Type": null,
        "Manual Payment Job Config": {
          "Manual Start Date": null,
          "Manual End Date": null,
          "Manual Payment Doc Number": null
        },
        "Auto Scheduled Payment Job Config": {
          "Time Period Type for Each Run": null,
          "Number of Time Periods for Each Run": 1,
          "Weekly-Day of Week to Start Run": null,
          "Monthly-Day of Month to Start Run": null,
          "Start Time": "12:45 AM",
          "Last AutoRun for Payment": null
        }
      },
      "Default Payment Mapping": {
        "QB Payment Deposit Account": depositAccount?.accountName || null,
        "QBO Payment Deposit Account ID": depositAccount?.accountId || null,
        "QB Receivables Account": accountReceivable?.accountName || null,
        "QBO Receivables Account ID": accountReceivable?.accountId || null
      },
      "Payment Tender Mapping": paymentConfig?.map(row => {
        return {
          "WA Payment Tender Name": row.WATender || null,
          "QB Payment Tender Name": row.QBTender || null,
          "QBO Payment Tender ID": row.QBTenderId || null
        }
      })
    }
  }
}

interface DonationConfig {
  campaignName: DonationFieldName,
  commentName: DonationFieldName,
  defaultDonationConfig: DonationMapping,
  alternateDonationConfig: DonationMapping[]
}

export const formatDonationConfig = (donationConfig: DonationConfig) => {

  return {
    "Donation Config": {
      "Donations Jobs Enabled": null,
      "Donation Job Scheduling": {
        "Donation Job Scheduling Type": null,
        "Manual Donation Job Config": {
          "Manual Start Date": null,
          "Manual End Date": null,
          "Manual Donation Doc Number": null
        },
        "Auto Scheduled Donation Job Config": {
          "Time Period Type for Each Run": null,
          "Number of Time Periods for Each Run": 1,
          "Weekly-Day of Week to Start Run": null,
          "Monthly-Day of Month to Start Run": null,
          "Start Time": "12:20 AM",
          "Last AutoRun for Donation": null
        }
      },
      "WA Donation Mapping": {
        "WA Campaign Field Name": donationConfig?.campaignName?.FieldName || null,
        "WA Donation Comment Field Name": donationConfig?.commentName?.FieldName || null,
        "QB Donor Comment Format": "{Comment}",
        "QB Exempt Tax Code for Donations": null,
        "QBO Exempt Tax Code ID for Donations": null,
        "Default Donation Mappings": {
          "QB Payment Deposit Account": donationConfig.defaultDonationConfig?.depositAccount || null,
          "QBO Payment Deposit Account ID": donationConfig.defaultDonationConfig?.depositAccountId || null,
          "QB Income Account": donationConfig.defaultDonationConfig?.IncomeAccount || null,
          "QB Item Product": donationConfig.defaultDonationConfig?.QBProduct || null,
          "QBO Item Product ID": donationConfig.defaultDonationConfig?.QBProductId || null,
          "QB Txn Class": donationConfig.defaultDonationConfig?.class || null,
          "QBO Txn Class ID": donationConfig.defaultDonationConfig?.classId || null,
          "QB Donation Line Description Format": null
        },
        "Donation Campaign Mapping": donationConfig.alternateDonationConfig?.map(config => {
          return {
            "AlternateMappingFilter": config?.WAFieldName || null,
            "QB Alt Payment Deposit Account": config?.depositAccount || null,
            "QBO Alt Payment Deposit Account ID": config?.depositAccountId || null,
            "QB Alt Item Product": config?.QBProduct || null,
            "QBO Alt Item Product ID": config?.QBProductId || null,
            "QB Alt Income Account": config?.IncomeAccount || null,
            "QB Alt Line Description Format": "{Campaign}",
            "QB Alt Txn Class": config?.class || null,
            "QBO Alt Txn Class ID": config?.classId || null
          }
        })
      }
    }
  }
}

export const formatInvoiceConfig = (invoiceConfig: InvoiceConfiguration[]) => {

  return {
    "Invoice Config": {
      "Invoices Jobs Enabled": null,
      "Invoice Job Scheduling": {
        "Invoice Job Scheduling Type": null,
        "Manual Invoice Job Config": {
          "Manual Start Date": null,
          "Manual End Date": null,
          "Manual Invoice Doc Number": null
        },
        "Auto Scheduled Invoice Job Config": {
          "Time Period Type for Each Run": null,
          "Number of Time Periods for Each Run": 1,
          "Weekly-Day of Week to Start Run": null,
          "Monthly-Day of Month to Start Run": null,
          "Start Time for Run": "12:00 AM",
          "Last AutoRun for Invoice": null
        }
      },
      "WA Invoice Mapping": invoiceConfig.map(config => {
        return {
          "Invoice Order Type": config?.invoiceOrderType || null,
          "Default Invoice Mappings": {
          "QB Receivables Account": config?.accountReceivable?.accountName || null,
            "QBO Receivables Account ID": config?.accountReceivable?.accountId || null,
            "QB Item Product": config?.defaultInvoiceMapping?.QBProduct || null,
            "QBO Item Product ID": config?.defaultInvoiceMapping?.QBProductId || null,
            "QB Income Account": config?.defaultInvoiceMapping?.IncomeAccount || null,
            "QBO Income Account ID": null,
            "QB Txn Class": config?.defaultInvoiceMapping?.class || null,
            "QBO Txn Class ID": config?.defaultInvoiceMapping?.classId || null,
            "QB Payment Deposit Account": null,
            "QBO Payment Deposit Account ID": null,
            "Use Membership Application Mapping for All Membership Order Types": null
        },
          "Alternate Invoice Mappings": config?.alternateInvoiceMapping?.map(value => {
            return  {
              "AlternateMappingFilter": value?.WAFieldName || null,
              "QB Alt Item Product": value?.QBProduct || null,
              "QBO Alt Item Product ID": value?.QBProductId || null,
              "QB Alt Income Account": value?.IncomeAccount || null,
              "QB Alt Txn Class": value?.class || null,
              "QBO Alt Txn Class ID": value?.classId || null,
              "QB Alt Payment Deposit Account": null,
              "QBO Alt Payment Deposit Account ID": null
            }
          })
        }
      }),
      "WA Invoice Line Item ExtraCost Exceptions": []
    },
  }
}