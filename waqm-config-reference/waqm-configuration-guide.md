# WAQM Configuration Guide

## WAQM Configuration

The Integromat Data Store holds the WAQM configuration needed to map items from Wild Apricot to QuickBooks. Only 1 record is used to drive all of the supported WAQM financial transactions. Additional records inside the data store represent backups from previous versions of the utility or represent test scenarios.

Recommendation: Before making significant changes to a configuration record, use the Config Backup scenario to backup the current config record. See instructions in the Maintenance document.

The following sections describe the WAQM Data Store configuration fields along with general guidelines for usage.

### **General configuration**

WA Org Name: The name for the Company. This does not drive mapping of records between Wild Apricot and QuickBooks. However, this field may be used in notification emails, folder name formats, and filename formats.

WA Config Record Name: Reference field to describe differences between configuration records. Example: DEV or TEST or PRD pr MASTER. **RECOMMEND:  Use the phrase "Master" within this field to designate which data store record is the current master record for scenarios.**  The Config BackupRecord scenario appends “-BACKUP" to the end of the value in this field.  This field is used in notifications to clarify which configuration was used in a run.

Org Time Zone: This specifies the primary time zone used by an organization.  All dates used inside the scenario, including the dates on the transactions will use this time zone.  The value used in this filed must exactly match the "TZ database name" from the internationally recognized Time Zone database referred to on this [wiki page](https://en.wikipedia.org/wiki/List\_of\_tz\_database\_time\_zones#List).

Config Last Updated: Date field used to signify when the configuration was last updated.  The Config BackupRecord scenario sets the current date and time for this field on the copied record.  **RECOMMEND: If other significant changes are done to a Master record, adjust this to the current date and time as a reference for when the changes were made.**

QB Version Info: These fields drive the scenario logic as different versions of QuickBooks have different requirements.  The values in **Bold** are the current options and are **REQUIRED** for scenario to function properly.

* QB Country: **CAD** (Canada) or  **US** (United States)
* QB Platform: **Desktop**  or   **Online**
* QBO Online Root URL:   e.g. app.company. qbo.intuit.com (allows notification emails to include links to the created transactions)  This does not typically change, but may be different if a client uses an Intuit Sandbox environment.

WAQM Version Info:  reference fields to indicate which version of WAQM is in place during configuration

* WAQM License Key: For each WAQM run, the key is checked to ensure it is still valid and unexpired.   Visit [https://newpathconsulting.com/waqm](https://newpathconsulting.com/waqm) to buy or extend a WAQM license.
* WAQM Invoice Scenario Version
* WAQM Payment Scenario Version
* WAQM Donation Scenario Version
* WAQM Transaction Loader Scenario Version (QBD or QBO)

### **Contact-Customer configuration**

Wild Apricot Field Names:  Since different organizations may use different field names for common Contact fields, this section allows that field name to be specified.  Use the display label without brackets.  Do not enter the System Code for the field.  Currently Supported fields:

* Wild Apricot System Fields - WAQM defaults in this name/config (may be changed if needed)
  * User ID
  * First Name
  * Last Name
  * Email
  * Phone
  * Organization
* Not a standard Wild Apricot field - must enter the Display Label from client's Wild Apricot account
  * Street Address 1
  * Street Address 2
  * City
  * Province (assumes a drop-down field is used to pick the Province/State)
  * Postal Code
  * Country (assumes a drop-down field is used to pick the Province/State)

Quickbooks Display Name Format: This field configures which fields from Wild Apricot are used to define the Customer (Member/Contact) Display Name on the Quickbooks transaction. The supported tokens listed below are supported inside WAQM.  (see example in screenshot below)

* {Organization} - pulls the Organization Name for the Wild Apricot Contact record
* {User Id} - pulls the User ID for the Wild Apricot Contact record
* {Display Name} - pulls the Display Name for Wild Apricot Contact record; the format for the Display Name is configured inside Wild Apricot.  This is used if nothing is specified inside the configuration.
* {Full Name} - uses the First Name and Last Name together
* {Email} - primary email address from Wild Apricot
* NOTES:&#x20;
  * The Customer Name field is truncated to 41 characters as that limit is enforced by QuickBooks.
  * The tokens assume that the WA field mappings in the previous section are properly configured.&#x20;

QB Desktop Billing Address Format: These fields configure which fields from Wild Apricot are used to define each line of the “Bill To” field on the QuickBooks transaction. 5 lines are allowed by QuickBooks Desktop. The supported tokens listed below are supported.  (see example in screenshot below)

* Address1: {Organization}, {Display Name}, {Full Name}, {User Id}, {Email}
  * {Display Name} is used if nothing specified inside the configuration.
* Address2: {Organization}, {Display Name}, {Full Name}, {User Id}, {Email}
  * {Organization} is used if nothin is specified in the configuration
* Address3: {Street Address 1}, {Street Address 2}, {City}, {Province}, {Postal Code}, {Country}&#x20;
  * {Street Address 1} is used if nothing specified inside the configuration.
* Address4: {Street Address 1}, {Street Address 2}, {City}, {Province}, {Postal Code}, {Country}
  * {Street Address 2} is used if nothing specified inside the configuration.
* Address5: {Street Address 1}, {Street Address 2}, {City}, {Province}, {Postal Code}, {Country}
  * {City}, {Province} {PostalCode} is used if nothing specified inside the configuration.
* NOTES:&#x20;
  * The Customer Name field is truncated to 41 characters as that limit is enforced by QuickBooks.
  * The tokens assume that the WA field mappings in the previous section are properly configured.&#x20;
  * N/A for Quickbooks Online

![](<../.gitbook/assets/Screen Shot 2021-01-20 at 10.04.00 AM.png>)

### **Invoice mapping configuration**

Invoices Enabled:  set to Yes to allow scenarios to run

Invoice Job Scheduling:  See the scheduling section below that describes scheduling options.  This allows automated scheduling or manual runs for explicit dates.

Invoice Mapping by Order Type:  Each Order Type will have a separate record that defines the Default mappings and Alternate mappings.   The supported Order Types from Wild Apricot must be entered exactly as shown here:

* MembershipApplication
* MembershipRenewal
* MembershipLevelChange
* EventRegistration
* OnlineStore
* Undefined (manual items)

Within the **Default Mappings** section of each Order Type, these values are specified.   These values will be used for an Invoice if an alternate mapping is not matched for a specific Invoice.

* QB Receivables Account: The QuickBooks AR account name used for the order type. Most organizations use “Accounts Receivable”.
* QBO Receivables Account ID:  (for QBO only) The corresponding system ID.
* QB Item Product:  The default Quickbooks Inventory List Item (Product) that will be used for all line items on an Invoice for this Order Type.&#x20;
* QBO Item Product ID:  (for QBO only) The corresponding system ID.
* QB Income Account: The default Quickbooks Income/Revenue account that will be used on all line items on an Invoice for this Order Type.&#x20;
  * NOTE: If a SubAccount is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. e.g. ParentAccount:ChildAccount  &#x20;
  * NOTE2:  A QBO ID is not required for Income Account.  QBO derives the income account internally using the Item Product specified.
* QB Txn Class: The QuickBooks Class that should be used for the Invoice.&#x20;
  * NOTE: If a Subclass is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentClass:ChildClass
* QBO Txn Class ID:  (for QBO only) The corresponding system ID.
* QB Payment Deposit Account:  special use.  This is not used specifically on an invoice.  If Payments are used, the linked Invoice may be used to map a specific Deposit-To account. &#x20;
* QBO Payment Deposit Account ID: (for QBO only) The corresponding system ID.

![Example configuration mapping for MembershipApplication showing Default mappings](<../.gitbook/assets/Screen Shot 2022-01-19 at 3.24.05 PM.png>)

Within the **Alternate Mappings** section of each Order Type, an "Alternate Mapping Filter" can be selected to specify different Quickbooks mappings than what is shown in the default for the order type.   Each Order Type uses different Wild Apricot values as the Mapping Filter as shown here:

* MembershipApplication -->  Membership Level Name
* MembershipRenewal -->  Membership Level Name
* MembershipLevelChange -->  Membership Level Name
* EventRegistration  -->  Event Tag
* OnlineStore  -->  n/a (no alternates available; future version will support product tags)
* Undefined (manual items)  --> n/a (no alternates available)

If an Invoice uses an "Alternate Mapping Filter" the below matched values are used during the invoice creation instead of the default values.   The description of each field is the same as described above. &#x20;

* QB Alt Item Product
* QBO Alt Item Product ID
* QB Alt Income Account
* QB Alt Txn Class
* QBO Alt Txn Class ID
* QB Alt Payment Deposit Account
* QBO Alt Payment Deposit Account

![Example configuration mapping for MembershipApplication showing Alternate mappings](<../.gitbook/assets/Screen Shot 2022-01-19 at 3.24.36 PM.png>)



WA Order ExtraCost Exceptions: As described in the OrderType section, all line items on an invoice will use the same Quickbooks mappings for Inventory Item, Account, and Class. This configuration section allows an individual invoice line item to use a different mapping based on the name of the ExtraCost field from Wild Apricot. (e.g. a New Member Fee line item should be mapped to a different account from the core Membership Dues line items) This Exception mapping will override the default mappings regardless of Order Type. Each exception requires these fields for configuration.

* ExtraCostName: Use the display label of the Extra Cost field as defined inside Wild Apricot
* EC QB Item Product: same definition as the Order Type sections
* EC QBO Item Product ID: same definition as the Order Type sections
* EC QB Income Account: same definition as the Order Type sections
* EC QB Class: same definition as the Order Type sections
* EC QBO Class ID:  same definition as the Order Type sections

![Example ExtraCost Line Item Mapping](<../.gitbook/assets/Screen Shot 2022-01-19 at 3.41.16 PM.png>)

****

### **Payment mapping configuration**

Payments Enabled:  set to Yes to allow scenarios to run

Payment Job Scheduling:  See the scheduling section below that describes scheduling options.  This allows automated scheduling or manual runs for explicit dates.

Payment Default Mapping:  This section defines the default accounts that will be used for all payment transactions.   By itself, a payment document does not have sufficient information to support alternate mappings.  However, if WAQM successfully links a Payment to an Invoice, the data on the invoice may be used to provide an alternate "Deposit-To" account.  This is configured separately in the Invoice Alternate Mapping section.  These values are supported for default mappings:

* QB Payment Deposit Account:  The account where the payment funds will be added.  Many organizations use "Undeposited Funds", however other "deposit-to" bank accounts may be used.
* QBO Payment Deposit Account ID: (for QBO only) The corresponding system ID.
* QB Receivables Account:  The QuickBooks AR account name used for the order type. Most organizations use “Accounts Receivable”.
* QBO Receivables Account ID: (for QBO only) The corresponding system ID.

Payment Tender Mapping:  This provides the mapping between Wild Apricot Payment Methods and Quickbooks Payment Methods.  The proper payment types must be created in both systems.  WAQM does not create a Payment Method Type (Tender) if it is not found.   These values are used for the mapping between systems:

* WA Payment Tender Name
* QB Payment Tender Name
* QBO Payment Tender ID (QBO only)

![Example mappings for Default Payment Accounts and Payment Tenders](<../.gitbook/assets/Screen Shot 2022-01-19 at 3.57.19 PM.png>)



### **Donation mapping configuration**

NOTES: &#x20;

* WAQM creates a Sales Receipt inside Quickbooks for each Donation.  This allows the income to be allocated to a revenue account and for the funds to be placed into a Deposit-To account.
* To support Alternate Mappings, a "Campaign" field may be created inside Wild Apricot that allows a donor to pick a different campaign for each donation.  WAQM assumes that the "Campaign" field is required on a Donation and is defined as a drop-down field with each value in  the drop-down representing a different Campaign.

![Example of a Campaign drop-down field](<../.gitbook/assets/Screen Shot 2021-05-13 at 3.33.57 PM.png>)



Donations Enabled:  set to Yes to allow scenarios to run

Donation Job Scheduling:  See the scheduling section below that describes scheduling options.  This allows automated scheduling or manual runs for explicit dates.

WA Donation Mapping (general):  This section defines values that will be used for all Donations. &#x20;

* WA Campaign Field Name:  If an organization does define Campaign types inside the Wild Apricot Donation, this field is used to list the Label (Display Name) for the custom field.   WAQM assumes this custom field is a drop down field, with different campaigns listed as choices within the drop-down.  The field name listed here is the overall field name, not the listings of individual campaign types.
* WA Donation Comment Field Name:  Wild Apricot provides a Comment field that a donor can use to provide notes on the Donation.  This is just the name (display label) of the Comment Field on the Donation.
* QB Exempt Tax Code for Donations:  Donations are assumed to be tax-exempt.  For organizations that do use taxes inside Quickbooks, a tax exempt code must be specified for the Sales Receipt.
* QBO Exempt Tax Code ID for Donations:  (for QBO only) The corresponding system ID.

![General Donation Mapping Values](<../.gitbook/assets/Screen Shot 2022-01-19 at 4.14.55 PM.png>)

Default Donation Mappings:   These values will be used for Donations (Sales Receipts) if an Alternate Mapping to a Campaign is not found.  The definitions of the fields are generally the same as the definitions listed in the Invoice section.

* QB Payment Deposit Account&#x20;
* QBO Payment Deposit Account ID
* QB Income Account
* QB Item Product
* QBO Item Product ID
* QB Donation Class
* QBO Donation Class ID
* QB Default Donation Line Description:  This allows default text and the name of the Donor's selected Campaign to be inserted into the QuickBooks Line Item Notes field on the Sales Receipt. This configuration assumes that the organization is using a custom drop-down field for selecting the Donation Type.  If this field is left blank, WAQM defaults to use: "Donation For: {Campaign}"&#x20;
  * Example: Amazing Donation For: {Campaign}

![Example Default Mapping for Donations](<../.gitbook/assets/Screen Shot 2022-01-19 at 4.15.09 PM.png>)

Donation Campaign Mapping: As described, a Campaign may be used to drive alternate mappings on a Donation.  These are the required configuration fields:

* Campaign Name: The name of the Campaign chosen by the Donor. This must match the Label of the drop down list item inside Wild Apricot exactly.  The custom drop down field name is configured separately at the beginning of the Donation mapping configuration.
* QB Alt Payment Deposit Account
* QBO Alt Payment Deposit Account ID&#x20;
* QB Alt Item Product
* QBO Alt Item Product ID
* QB Alt Income Account
* QB Alt Line Description Format
* QB Alt Txn Class
* QBO Alt Txn Class ID

![Example Alternate Donation Mapping for a Campaign](<../.gitbook/assets/Screen Shot 2022-01-19 at 4.15.47 PM.png>)

### **Sales Tax mapping configuration**

Sales Tax Types: This section maps the tax rates used in Wild Apricot to the taxes in Quickbooks and the associated required fields.  To avoid unexpected behavior, Wild Apricot, Quickbooks, and WAQM must have consistent Sales Tax configurations.

NOTE:  [Reference the separate "Sales Tax Scenario" section](../other-references/sales-tax-scenarios.md) of this document to understand some limitations for some combinations of Sales Taxes, especially for US versions.   This is due to design differences between Wild Apricot and Quickbooks.

* Sales Tax Name: The exact name defined in Wild Apricot. This is the current key used to map invoice details to the corresponding tax in Quickbooks.
* Sales Tax ID: The exact name defined in Wild Apricot. This is currently a reference item only.
* Sales Tax QB Code: The corresponding QuickBooks tax code.
* Sales Tax QB Code ID:  (for QBO only) The corresponding system ID.
* Sales Tax Rate: The Tax Rate as a whole or decimal number. (7 for 7% tax; 7.25 for 7.25% tax) For Online and CAD Quickbooks versions, this is a reference only as the tax amount is calculated internally to QuickBooks using the Tax Code and Sales Tax Items.
* Sales Tax QBD Account: The account used to receive Sales Taxes. This is required for US Desktop Quickbooks versions.  For other versions, this is a reference only as the account is mapped internally to QuickBooks using the Tax Code and Sales Tax Items.
* Sales Tax QBD Agency Name: The Quickbooks “vendor” used to represent the tax agency to which the sales taxes are due. This is required for US Desktop Quickbooks versions.  For other versions, this is a reference only as the tax agency is defined internally to QuickBooks using the Tax Code and Sales Tax Items.

NOTE: For US versions of Quickbooks, a “NoTax” mapping may be needed when no tax is defined for a line item in Wild Apricot.

![](<../.gitbook/assets/Screen Shot 2021-01-06 at 12.53.45 PM.png>)

SPECIAL CASE:   Some scenarios may exist where a client requires taxes inside their instance of QBO Canada, but no tax information is configured within their instance of Wild Apricot.  If this occurs, configuring a single Sales Tax entry with the Sales Tax WA ID = NoTaxInWA can be used to insert a single default Tax Code for all invoices.   (see screenshot) .This is introduced in Invoice-QBO v0.6.1.2.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-09-01 at 9.19.58 AM.png>)

Sales Tax Groups: Sales Tax Groups are used in Quickbooks when a line item uses a composite of multiple individual tax rates. (e.g. a city tax and a province tax) Sales Tax Groups do not exist inside Wild Apricot. This section maps which Quickbooks Tax Group is used when a single Wild Apricot line item uses 2 separate Sales Taxes.

* Sales Tax Group Name: The name of the Sales Tax Group. Used for reference only.
* Sales Tax QB Group Code: The Sales Tax Group code inside QuickBooks.
* Sales Tax QB Group Code ID:  (for QBO only) The corresponding system ID.
* Sales Tax QBD Group Account: Required for the US Desktop version of Quickbooks for successful IIF import.  The tax calculation is done based on the defined individual tax rates.   For other Quickbooks versions this is a reference only.  The account is defined internally to Quickbooks based on the Sales Tax QB Group Code.
* Sales Tax QBD Group Agency Name: Required for the US Desktop version of Quickbooks for successful IIF import. The tax calculation is done based on the defined individual tax rates. For other Quickbooks versions this is a reference only. The agency is defined internally to Quickbooks based on the Sales Tax QB Group Code.
* WA Tax IDs: Add each Sales Tax Name from Wild Apricot as a separate item in the Tax ID array.  This must exactly match Wild Apricot and the mapping in the individual sales tax rate section. &#x20;
  * Example: 1) GST 2) PST

![](<../.gitbook/assets/Screen Shot 2021-01-06 at 1.00.51 PM.png>)

Subtotal List Name: The QuickBooks Sales Inventory Item for Subtotals. This is used for US Desktop versions of Quickbooks. &#x20;

![](../.gitbook/assets/19.png)

### **WAQM scheduling configuration**

WAQM scheduling is defined separately for each transaction type, but works consistently for each.   This section uses Invoice scheduling as the explicit example.

WA Invoice Job Scheduling Type:  _(must enter the keyword phrase in **bold** exactly)_

* **Manual** → the scenario will use the Manual Start Date and End Date when it runs to define which Invoices are read from Wild Apricot.  Use the settings inside the Manual Scheduling section.
* **Scheduled** → each time the job runs, it will read invoices during the defined time period.  Use the settings inside the Auto Run Schedule section.

**Manual** Job Invoice Config:&#x20;

* Manual Start Date: format = YYYY-MM-DD hh:mm A
* Manual End Date: format = YYYY-MM-DD hh:mm A
* Manual Invoice Doc Number:  The customer visible Invoice doc number inside Wild Apricot.  If this is specified, only this invoice document will be returned from the job.  If left blank, all invoice documents will be returned from the manual start and end date time period.
* NOTE: For Donation transactions, use the Donation doc number that is visible inside Wild Apricot.
* NOTE:  For Payment transactions, a customer visible document number does not exist.  The internal Wild Apricot Payment ID may be used as the Doc Number.  This can be seen by looking at the URL when looking at the payment inside Wild Apricot (see screenshot for example).

![Example Manual Schedule Config](<../.gitbook/assets/Screen Shot 2022-01-19 at 5.19.01 PM.png>)

![Example of a Payment internal ID in the URL of Wild Apricot](<../.gitbook/assets/Screen Shot 2022-01-20 at 11.49.40 AM.png>)

Auto **Schedule** Job Invoice Config:  These settings define when the job runs and the time period used for each run.

* Time Period Type for Each Run:  The supported types are **Daily**, **Weekly**, and **Monthly**.  The bold value must be entered exactly.
* Number of Time Periods for Each Run:  This should be an integer number that defines the number of periods for the run.     (e.g. 2 "weeks", 1 "month", etc.)
* Weekly-Day of Week to Start Run:  The short 3-character name of the week that defines the day of the week a Weekly run will start.  (e.g.  Mon, Thu)
* Monthly-Day of Month to Start Run:  The integer number representing the day of the month that defines the day of the Month a Monthly run will start.  (e.g.  1--> 1st day of month)
* Start Time for Run (reference only): The time of day when the run should start.  This is configured separately inside Integromat, but recording here is a good reference point.  If all transactions are used, the times should be offset by 15 minutes or more to prevent conflicts (1st: Invoice;  2nd: Payment; 3rd: Donation) ****  NOTE: This does not impact the time period in which transactions are extracted.
* Last Inv AutoRun (do not edit): This should not be changed.  The Integromat job will populate this automatically after a successful auto-run and will be used to determine when the next run should occur. &#x20;

![Example AutoRun Schedule Config](<../.gitbook/assets/Screen Shot 2022-01-19 at 5.19.17 PM.png>)

Additional Notes regarding dates and scheduling:

* Scheduled runs are intended to process transactions for an entire period.  e.g. from the 1st day of a month through the last day of a month.  To ensure all documents from the entire time period are included, the following scheduling assumptions are used by WAQM:
  * The start date for a scheduled run uses midnight as the start time.   00:00:00
  * When the scenario runs, the end date is set as just before midnight of the previous day. 23:59:59
  * Example:   A **Monthly** scenario runs on Dec 1 and is set to run for **1** period back.  The start date is set for Nov 1 at the time of 00:00:00.  The end date is set for Nov 30 at 23:59:59.
* Manual Dates allow date, hour, and minute to be specified.  Because seconds cannot be specified inside Integromat, WAQM assumes 00 seconds for the start date and 59 seconds for the end date.
* See the "EXAMPLE: Scheduled" sheet inside the WAQM Mapping Guide for additional examples of AutoRun **Schedule** settings.



### **WAQM output file location  (Quickbooks Desktop only)**&#x20;

This section defines the service, folder path, and filenames used for Quickbooks Desktop versions. (not used for Quickbooks Online)  This is the location where IIF files are loaded that can later be imported into Quickbooks Desktop.  The current scenarios are designed to use the “box” online storage service. The scenarios can be customized to use different services.

* Storage Service: The name of the service. Currently, this is just a reference field.
* Invoice Folder Path: For 'box' this is just a reference field as the folder path must be configured inside the scenario. Other services allow the folder to be mapped using this field.
* Success Invoice Filename Format: This field defines the preferred filename format for the generated Invoice IIF files that are loaded to the online storage service. If the token {DateTime} is included, the current date and time will be inserted in the filename.
* Payment Folder Path, Success Payment Filename Format, Donation Folder Path, and Filename Format: These fields have the same purpose as the Invoice items above and allow a separate folder and filename for Donation related files.

![](<../.gitbook/assets/Screen Shot 2021-01-06 at 1.35.39 PM.png>)

### **Notification Emails**&#x20;

This section defines the email addresses that will be used to send notifications when the scenarios run. There are generally 2 email notifications that may be generated per run.  Both types will describe the dates used for a WAQM run and other reference information.&#x20;

* A "success" email:  This lists the invoices that were successfully processed by WAQM.  The Quickbooks Desktop version provides a link to the IIF file that is generated and loaded to the storage service.   The Quickbooks Online version provides links to each transaction that was created.   &#x20;
* A "mapping error" email:  This lists the transactions that were not mapped successfully based on the WAQM config and the info that was extracted from Wild Apricot.  This email will not be generated if there are no mapping errors.

Configuration items to support notification emails:

* From Email Address:  The email address (from the client's organization) that will be used as the "from" email for these notifications.   This email must match the email configured inside Mailgun (see below).
* To: Email Addresses: The To: email addresses on the notification emails.   This should be the list of emails from the client that will receive notifications when WAQM runs.
* BCC: Email Address: The bcc: email addresses.  This is typically the NewPath Consulting support email address(es) that will receive notifications when WAQM runs.
* Mailgun Domain Name:  The email domain name configured inside the Mailgun utility for this client.  This utility allows Integromat to generate and send notification emails on your behalf.  Additional DNS changes are needed in the client's domain provider to setup Mailgun.  This process and settings are described elsewhere.

![Example Email Notification Config](<../.gitbook/assets/Screen Shot 2022-01-19 at 5.38.32 PM.png>)



##
