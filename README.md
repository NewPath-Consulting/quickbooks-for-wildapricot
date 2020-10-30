# Wild Apricot QuickBooks Manager Docs

## 

_DISCLAIMER: This documentation is NOT intended to describe proper sales taxes for items, buyers, or sellers. This documentation identifies how invoices, invoice line items, and sales taxes inside Wild Apricot may be mapped and imported to Quickbooks Desktop. It is the responsibility of each company to seek the advice of Accountants to ensure the proper taxes are being identified, collected, and paid. Likewise, this document does not support QuickBooks Online as it uses a different data structure for taxes and invoices._

| **Version** | **Date** | **Owner** | **Notes** |
| :--- | :--- | :--- | :--- |
| 0 | Sep 11, 2020 | D. Reed | First rough draft |
| 1 | Oct 18, 2020 | D. Reed | Updated documentation from initial deployment |

## Table of Contents:

[**Table of Contents:**]() **1**

[**WAQM Overview**]() **3**

[Current Integromat Components:]() 3

[**WAQM Installation**]() **3**

[Pre-Requisites]() 3

[Installation Steps Overview]() 4

[Detailed Steps to Clone Integromat scenario to new account and Configure]() 4

[**WAQM Maintenance**]() **6**

[Changing Scheduling Configuration and Running Manually]() 6

[Cloning Integromat Scenario for BackUp]() 7

[Backing Up Configuration record]() 7

[**WAQM Integromat Data Store Configuration**]() **7**

[Backup current Integromat configuration]() 8

[Integromat Data Store Configuration]() 8

[**REFERENCE - Sales Tax scenarios**]() **13**

[General]() 13

[Wild Apricot Sales Tax Treatment]() 13

[Quickbooks Desktop Sales Tax Treatment]() 14

[Potential limitations due to Wild Apricot and Quickbooks differences]() 15

[**QuickBooks Config Prerequisites**]() **16**

[General QB Configuration]() 16

[Customer Name and Billing Address]() 16

[Configuration per Order Type]() 16

[Tax Related Configuration]() 17

[Taxes for Canadian \(CAD\) Quickbooks Desktop versions:]() 17

[Taxes for United States \(US\) Quickbooks Desktop versions:]() 17

[QB List Item: Subtotal configuration]() 18

[**IIF Spec for importing WA Invoices to QB Desktop**]() **19**

[IIF Row Types and Associated Field Definitions]() 19

[IIF Row sequences for US Tax Scenarios]() 22

## 

## WAQM Overview

Wild Apricot QuickBooks Manager is an Integromat-based utility to extract data from Wild Apricot and transform to a properly formatted IIF file that can be imported into QuickBooks Desktop. \(Third-party utilities exist to allow an IIF file to be imported into QuickBooks Online.\) As of October 2020, WAQM supports Invoices and Donations from Wild Apricot imported into the Canada QuickBooks Desktop version.

This guide describes the WAQM components, installation, configuration, and run instructions. Additional reference information is provided on QuickBooks and required set-up before usage of WAQM.

### Current Integromat Components:

Data Structures:

WA-QB-Invoice-Config \(required\)

WA-QB-Invoice-IIF\_RAW \(required\)

WA-QB-Invoice-Line \(required\)

WA-QB-Invoice-IIF\_TRNS \(optional-documentation of structure\)

WA-QB-Invoice-IIF\_SPL \(optional-documentation of structure\)

Data Stores:

WA-QB-Invoice-Config

WA-QB-Invoice-TMP

Scenarios:

DEV-WA Invoice to QB IIF Monthly \(v0.4\)

DEV-WA Donation to QB IIF Monthly \(v0.1\)

WA-QB-Config-BackupRecord \(used for maintenance purposes\)

## WAQM Installation

### Pre-Requisites

* Wild Apricot account \(using Invoices and/or Donations\)
* QuickBooks account \(configured for Company’s requirements\) - using a sandbox copy of the QuickBooks Company file is suggested for initial testing
* Integromat account \(Basic level or higher - requires 2 Data Stores\)
* Mapping of Wild Apricot invoice types, items, and taxes to the corresponding items, accounts, classes

### Installation Steps Overview

1. Complete mapping document to prepare for configuration
2. Copy components to Integromat account
3. Configure Integromat Data Store and Scenarios per mapping
4. Perform test with filters to limit transactions - import to QuickBooks and confirm success
5. Make any adjustments to Wild Apricot, Integromat configuration, and/or QuickBooks
6. Configure and run WAQM \(scheduled or manual\)

### Detailed Steps to Clone Integromat scenario to new account and Configure

These detailed steps correspond to steps 2 and 3 in the Overview above.

1. Clone Data Structures [https://www.integromat.com/udts/197209](https://www.integromat.com/udts/197209)
   1. WA-QB-Invoice-Config \(required\)
   2. WA-QB-Invoice-IIF\_RAW \(required\)
   3. WA-QB-Invoice-Line \(required\)
   4. WA-QB-Invoice-IIF\_TRNS \(optional-documentation of structure\)
   5. WA-QB-Invoice-IIF\_SPL \(optional-documentation of structure\)
2. Create new Data Stores [https://www.integromat.com/datastores/](https://www.integromat.com/datastores/)
   1. WA-QB-Invoice-Config \(Use the WA-QB-Invoice-Config Data Structure. Use the minimum storage capacity =1 MB.\)
   2. WA-QB-Invoice-TMP \(Use the WA-QB-Invoice-IIF\_RAW. The storage capacity may need to vary depending on the number of records. 1-2 MB should be sufficient.\)
3. Create a record in new Data Store for the new client
   1. Option 1 - manual
      1. Reference record in NPC account.
      2. Config specific to the client must be done as well. Reference Excel mapping sheet and the Data Store section of this document for guidance.
   2. Option 2 - “create” from previous config record in NPC Lab
      1. In the originating Integromat Organization \(NPC Lab\), clone the scenario to the target organization: WA-QB-DS-Config-Webhook. During the clone process, check these configurations:
         1. Create a new Webhook connection \(choose any name as this a Temporary connection that is not needed after the config is copied\)
         2. Ensure the DataStore module inside the scenario points to the newly created Config Data Store in the target organization.
      2. From the cloned scenario inside the target organization, copy the URL from the Webhook module.
      3. Save and turn on the cloned Webhook scenario in the target organization. If the first Webhook module indicates that data structure determination is needed, see instructions in step vi.
      4. In the originating organization \(NPC Lab\), check the config of the scenario: WA-QB-DS-Config-SendJSON
         1. Ensure the “key” in the first Data Store module corresponds to the proper config record to be sent to the target organization
         2. Check the URL in the HTTP request module. Ensure it matches the URL copied from the Cloned scenario inside the target organization.
      5. Run the scenario in the originating org \(NPC Lab\): WA-QB-DS-Config-SendJSON
      6. In the target organization, confirm that the Webhook ran successfully. Confirm that the record was created in the Data Store in the target organization.

NOTE: If the receiving scenario did not run properly or add a Config record to the new data store, it is possible that the new Webhook needed to be “trained” to recognize the data structure. Reference this article: [https://support.integromat.com/hc/en-us/articles/360006249313-Webhooks](https://support.integromat.com/hc/en-us/articles/360006249313-Webhooks)

* * 1. Edit the newly created Config record in the Target Organization if needed.
    2. The Webhook Scenario may be deleted inside the Target Organization after the Config record is created.

1. Clone scenarios
   1. DEV-WA Invoice to QB IIF Monthly \(v0.4\)
   2. DEV-WA Donation to QB IIF Monthly \(v0.1\)
   3. WA-QB-Config-BackupRecord \(used for maintenance purposes\)

NOTE: During the clone process, you will be asked to update the connections and data stores. If the connections are new, login information may be needed to complete the clone process.

1. If needed, change config within the scenario:
   1. Configuration record key in the 1st module to read proper record from the Config Data Store
   2. Ensure any test filters are removed \(e.g. Invoice ID = \#\#\)
   3. Output modules for Box, DropBox, etc. \(folder, filename format, etc.\). NOTE: Box folder paths must be manually selected after cloning.
2. If needed, create/edit appropriate records inside QuickBooks to match the Data Store configuration.
   1. Configuration items that must be pre-defined and match config exactly:
      1. Sales Inventory List Item:
         1. These will show up on the Invoice or Donation Sales Receipt under the “Item” column.
         2. The definition of Account and Class inside the imported IIF file overwrites any definition of the List Item inside Quickbooks.
         3. For Wild Apricot integration purposes, it is recommended to keep the Inventory List Items generic and aligned to the Order Type. \(e.g. Membership, Chapter Event, Online Store Product, Manual Item\)
      2. Accounts: Accounts typically exist already inside QuickBooks and should be used as-is. The WAQM scenarios and config use the account names, excluding any account numbers.
      3. Sales Tax Items: Sales Taxes typically exist already inside QuickBooks and should be used as-is. See Data Store configuration sections for tax for more information.
      4. Sales Tax Codes: Sales Tax Groups typically exist already inside QuickBooks and should be used as-is. See Data Store configuration sections for tax for more information.
   2. Optional Quickbooks definition:
      1. Classes and Subclasses: These are automatically created on IIF import. They do not need to be configured in advance.

## WAQM Maintenance

### Changing Scheduling Configuration and Running Manually

The WAQM scenarios may be set-up to run on a specific schedule automatically or they may be run manually for a defined set of start and end dates. The Invoice or Donation Document Date from Wild Apricot is used.

Automatic Scheduling

1. In the configuration Data Store, go to the sections for Invoice Time Periods and/or Donation Time Periods.
   1. Make sure the “activation” field is set to Yes
   2. In the Scheduling Type field use: Scheduled
   3. In the Scheduled Number of Months Back field, insert the whole number of months back
   4. For reference, describe the planned Schedule Frequency in the Run Schedule field.
   5. Save Record
2. Go to each Scenario and set-up the schedule:
   1. Go to the scenario.
   2. In the upper right, select Scheduling from the Options menu. \(If you don’t see the option, you may be in edit mode. Exit the edit mode.\)
   3. Choose the Run Scenario - Days of Month.
   4. Select the day of the month and time when you want the scenario to run.
   5. Click OK
   6. Make sure the scenario toggle is turned On in the upper right corner.

At the specified schedule, the scenario\(s\) will run. When completed, an email will be sent to the designated email address with links to the resulting files.

Running Manually

1. In the configuration Data Store, go to the sections for Invoice Time Periods and/or Donation Time Periods.
   1. Make sure the “activation” field is set to Yes
   2. In the Scheduling Type field use: Manual Dates
   3. In the Manual Start Date field, enter the date in YYYY-MM-DD format
   4. In the Manual End Date field, enter the date in YYYY-MM-DD format
   5. Save Record
2. Go to the Scenario and run
   1. Go to the scenario
   2. Click and make sure it is in the Edit mode
   3. Click the Run Once button on the bottom left

NOTE: If the automatic schedule is set up on the scenario \(e.g. run automatically every month\), it will not work correctly if the configuration data store is not changed back to the “Scheduled” Scheduling Type.

### Backing Up Configuration record

### Recommendation: Before making significant changes to configuration, use the Config Backup scenario to backup the current config record.

### Open Integromat Scenario “WA-QB-Config-BackupRecord”.

### Confirm the first module is pointed to the correct record “key” that is currently being used by the Invoice and Donation scenarios.

### “Run Once” the “WA-QB-Config-BackupRecord” scenario.

### If successful, the record is copied and added to the Data Store with a new key. The “WA Org Env” field will copy the original value and add the suffix “-BACKUP-YYYY-MM-DD”.

### Changes can now be made to the original configuration record key.

### If needed, the Invoice and Donation scenarios can be changed to refer to different record keys \(in the 1st module of each scenario\).

### Re-pointing Integromat Scenarios to use a different Configuration Record

In most cases, this action is not required. Re-pointing scenarios to a different record in the Config Data Store is typically done when referring back to an old configuration record.

Background: Each record inside the Config Data Store has a unique “key,” which can be found in the first column of the record. Even though the Config Store may have multiple records, the scenarios only point to one active record. If a Configuration back-up is created, the back-up will have a new “key”. The original record still exists and still has the original “key”.

Steps:

1. Open the “WA-QB-Invoice-Config” Data Store.
2. Identify the record that should be used for running the Integromat scenarios.
3. Make a note of the key for that record. NOTE: Integromat does not allow this to be copied directly.
4. Go to the Invoice scenario and click to open.
5. Navigate \(drag the screen with mouse\) so that you can see the first module to the left \(Get WA-QB Config\).
6. Click on the module to open its properties.
7. Change the value in the Key field to match the key from the Config Data Store.
8. Click OK.
9. Click the Save icon on the bottom left of the screen.
10. Repeat steps 4-9 for the Donation scenario.

### Cloning Integromat Scenario for BackUp

Recommendation: Before making significant changes to a scenario, clone the scenario to create a backup of the scenario. These are standard Integromat steps:

1. From the Scenario listing or the Diagram screen: click Clone from the right hand drop-down menu. \(If you don’t see the option on the diagram view, you may be in Edit mode. Exit Edit Mode.\)
2. Choose a name for the cloned scenario or use the suggested name. Leave the target organization unchanged.
3. Click OK
4. Optional: from the scenario listing, Move the new scenario to a folder using the right hand drop-down menu.

## WAQM Integromat Data Store Configuration

The Integromat Data Store holds the configuration needed to map items from Wild Apricot to QuickBooks. Only 1 record is used to drive the Invoice and Donation Scenarios. Additional records represent backups from previous versions of the utility.

### Backup current Integromat configuration

Recommendation: Before making significant changes, use the Config Backup scenario to backup the current config record. See instructions in the Maintenance resection of this document.

### Integromat Data Store Configuration

In this section, each field in the Data Store is described along with general guidelines for usage.

WA Org Name: The name for the Company. This does not drive mapping of records between Wild Apricot and QuickBooks. However, this field may be used in notification emails, folder name formats, and filename formats.

QB Version: These fields drive the scenario logic as different versions of QuickBooks have different requirements.

* QB Country: CAD \(Canada\), US \(United States\)
* QB Platform: Desktop, Online

WA Org Env: Reference field to describe differences between configuration records. Example: TEST or PRD. The Config BackupRecord scenario appends “-BACKUP-YYYY-MM-DD” to this field in the copied record.

Customer Name: This field configures which fields from Wild Apricot are used to define the Customer Name on the Invoice/Donation inside QuickBooks. These supported tokens may be used as placeholders. WAQM will take the values from each Wild Apricot document and use them in the QuickBooks IIF import. Additional tokens may be added if the corresponding scenarios are customized to support them.

NOTE: This field is truncated to 41 characters as that limit is enforced by QuickBooks.

* {Company\_Name} - pulls the Company Name for the Wild Apricot Contact record
* {User\_Id} - pulls the User ID for the Wild Apricot Contact record
* {User\_DisplayName} - pulls the Display Name for Wild Apricot Contact record; the format for the Display Name is configured inside Wild Apricot
* {User\_Email} - pulls the Email address for the Wild Apricot Contact record

Customer Billing Address: These fields configure which fields from Wild Apricot are used to define each line of the “Bill To” field on the QuickBooks Invoice or Donation. 5 lines are allowed by QuickBooks. These supported tokens may be used as placeholders. WAQM will take the values from each Wild Apricot document and use them in the QuickBooks IIF import. Additional tokens may be added if the corresponding scenarios are customized to support them.

NOTE: This field is truncated to 41 characters as that limit is enforced by QuickBooks.

* Address1: {User\_DisplayName}
* Address2: {User\_Email}
* Address3: {AddressLine1} - pulls the 1st line of an Address
* Address4: {AddressLine2} - pulls the 2nd line of an address
* Address5: {City} {Province} {PostalCode}

WA INVOICE Time Periods: Defines the time periods used when the Invoice scenario runs.

* Activate Invoice Jobs: Yes or No \(allows scenario to be deactivated if not needed\)
* Invoice Job Scheduling Type:
  * Manual Dates → the scenario will use the Manual Start Date and End Date when it runs to define which Invoices are read from Wild Apricot.
  * Scheduled → assumes the scenario is scheduled to run on a pre-defined frequency. Each time the job runs, it will read invoices from “today” to the number of months back from “today”.
* Manual Start Date: format = YYYY-MM-DD
* Manual End Date: format = YYYY-MM-DD
* Scheduled Number of Months Back: format = \# \(e.g. 1 = 1 month back from “today”\)
* Scheduled-Reference-Run Schedule: reference notes to describe the configured schedule of the Invoice scenario. This must be configured directly on the scenario.

WA Order Type Items: Wild Apricot supports 5 Order Types: MembershipApplication, MembershipRenewal, EventRegistration, OnlineStore, Undefined \(Manual Items\). An “Item” must be added for each Order Type that is used by the Company. Each of these fields is defined and used for the “header” of the Invoice. NOTE: If the mapping for MembershipApplication and MembershipRenewal is the same, only MembershipApplication needs to be configured.

* Order Type: The Order Type name from Wild Apricot. Do not change from Wild Apricot standard.
* QB Receivables Account: The QuickBooks AR account name. Most organizations use “Accounts Receivable”
* QB Income Account Default: The defaultQuickbooks Income/Revenue account that will be used on all line items if not specifically defined for line item mappings. This value is not used on the Invoice Header. NOTE: If a SubAccount is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentAccount:ChildAccount
* QB Header Class: The QuickBooks Class that should be defined for the Invoice Header. Current scenario logic overrides this header value based on the Class defined for the specific line item Class if it is defined. NOTE: If a Subclass is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentClass:ChildClass

WA Order Line Item Mapping: Each Order Type uses different techniques to allow separate mappings based on the value at the line item level. All line items on an Invoice will use the same mapping unless an exception is defined for ExtraCosts. \(See the next section on ExtraCost Exceptions.\)

* Membership Invoices: The first line item defines the Membership Level. The Membership Level is read and is used as the “filter” for mapping.
* EventRegistration Invoices: The corresponding Event can use Tags. The Tag is read and used as the “filter” for mapping.
* OnlineStore Invoices: Though Wild Apricot does support Tags, these tags are not available to WAQM. Only 1 default mapping can be used.
* Manual Item \(Undefined\) Invoices: Only 1 mapping is supported.

Each Line Item Mapping requires these fields for configuration:

* OrderDetailFilter: The filter as defined above for each Order Type.
* QB Inventory Item: The QuickBooks Inventory List Item to be used for the line item. This will show on the QuickBooks Invoice before the line item notes.
* QB Income Account Override: The Income/Revenue account to be used inside QuickBooks. In QuickBooks, the Inventory List Item defines the income/revenue account for the line item. However, the IIF import format also requires the account to be defined. The value in the IIF file overrides what is configured inside QuickBooks. NOTE: If a SubAccount is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentAccount:ChildAccount
* QB SubClass: The Quickbooks Class to be used for the line item. If defined at the line item, this value will be used in place of the Class defined at the header Order Type level. NOTE: If a Subclass is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentClass:ChildClass

WA Order ExtraCost Exceptions: As described in the OrderType section, all line items will use the same mappings for Inventory Item, Account, and Class. This configuration section allows an individual line item to use a different mapping based on the name of the ExtraCost field from Wild Apricot. This will override the default mappings regardless of Order Type. Each exception requires these fields for configuration.

* ExtraCostName: Use this specific format: “Extras: &lt;Extra Cost Field Name from Wild Apricot&gt;”
* EC QB Inventory Item: same definition as the Line Item Mapping section
* EC QB Income Account: same definition as the Line Item Mapping section
* EC QB SubClass: same definition as the Line Item Mapping section

WA DONATION Time Periods: Defines the time periods used when the Donation scenario runs. This section is defined in the same manner as the INVOICE Time Periods section.

WA Donation Mapping: This section defines the header that will be used on the QuickBooks “Sales Receipt” for a Donation. These are the required configuration fields:

* QB Header Account: A Bank Account or Undeposited Funds to which the Donation will be added. NOTE: If a SubAccount is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentAccount:ChildAccount
* QB Income Account Default: If not defined in the Campaign Types, this Income/Revenue account will be used for the Donation Sales Receipt at the line item level. NOTE: If a SubAccount is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentAccount:ChildAccount
* QB Header Class: The QuickBooks Class that should be defined for the Donation Sales Receipt Header. Current scenario logic overrides this header value based on the Class defined for the specific line item Class if it is defined. NOTE: If a Subclass is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentClass:ChildClass
* QB Header Memo Format: This allows default text and placeholder tokens to be defined to pull values from the Donation and insert into the QuickBooks Memo field. Donations have limited standard fields. This section may require customization in the scenario to support specific choices.

Example: My donation supports the efforts of: {Name}-{Comment}

* QB Tax Code for Exempt: The tax code to be used on the line item to represent Zero Tax or Tax Exempt. Example: E

WA Donation Campaigns: This section allows different campaigns to be mapped differently inside QuickBooks. Wild Apricot doesn't have standard fields to define campaigns, so this area may require customization in the Donation Scenario to support. These are the required configuration fields:

* DonationFilter: The name of the Campaign. In the Donation Scenario, this filter must be mapped to the proper custom field in Wild Apricot.
* QB DON Inventory Item: The QuickBooks Inventory List Item to be used for Donations. This will show on the QuickBooks Sales Receipt before the line item notes.
* QB DON Income Account: The Income/Revenue account to be used for the Donation campaign. NOTE: If a SubAccount is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentAccount:ChildAccount
* QB DON Line Notes Format: This allows default text and placeholder tokens to be defined to pull values from the Donation and insert into the QuickBooks Line Item Notes field. Donations have limited standard fields. This section may require customization in the scenario to support specific choices.

Example: Donation is directed to: {CampaignName}

* QB DON SubClass: The Quickbooks Class to be used for the line item. If defined at the line item, this value will be used in place of the Class defined at the Donation header. NOTE: If a Subclass is desired, use the Quickbooks format for showing the Parent and child, separated by a colon. E.g. ParentClass:ChildClass

Sales Tax Types: This section maps the tax rates used in Wild Apricot to the taxes in Quickbooks and the associated required fields. The current Invoice scenario logic is keyed off the Wild Apricot Sales Tax Name. It can be customized to use the Sales Tax ID instead.

* Sales Tax Name: The exact name defined in Wild Apricot. This is the current key used to map invoice details to the corresponding tax in Quickbooks.
* Sales Tax ID: The exact name defined in Wild Apricot. This is currently a reference item only.
* Sales Tax QB Code: The corresponding QuickBooks tax code.
* Sales Tax Rate: The Tax Rate as a whole or decimal number. \(7 for 7% tax; 7.25 for 7.25% tax\) For CAD Quickbooks versions, this is a reference only as the tax amount is calculated internally to QuickBooks using the Tax Code and Sales Tax Items.
* Sales Tax Account: The account used to receive Sales Taxes. For CAD Quickbooks versions, this is a reference only as the account is mapped internally to QuickBooks using the Tax Code and Sales Tax Items.
* Sales Tax Agency Name: The Quickbooks “vendor” used to represent the tax agency to which the sales taxes are due. For CAD Quickbooks versions, this is a reference only as the tax agency is defined internally to QuickBooks using the Tax Code and Sales Tax Items.

NOTE: For US versions of Quickbooks, a “NoTax” mapping may be needed when no tax is defined for a line item in Wild Apricot.

Sales Tax Groups: Sales Tax Groups are used in Quickbooks when a line item uses a composite of multiple individual tax rates. \(e.g. a city tax and a province tax\) Sales Tax Groups do not exist inside Wild Apricot. This section maps which Tax Group is used when a single line item uses 2 separate Sales Taxes.

* Sales Tax Group Name: The name of the Sales Tax Group. Used for reference only.
* Sales Tax QB Group Code: The Sales Tax Group code inside QuickBooks.
* Sales Tax Group Account: n/a for CAD versions of Quickbooks. The account is defined internally to Quickbooks based on the Sales Tax QB Group Code.
* Sales Tax Group Agency Name: n/a for CAD versions of Quickbooks. The Agency is defined internally to Quickbooks based on the Sales Tax QB Group Code.
* WA Tax IDs: Add each Sales Tax Name from Wild Apricot as a separate item in the Tax ID array. Example: 1\) GST 2\) PST

Subtotal List Name: The QuickBooks Sales Inventory Item for Subtotals. n/a for CAD versions of QuickBooks.

Output File Location: This section defines the service, folder path, and filenames. The current scenarios are designed to use the “box” online storage service. The scenarios can be customized to use different services.

* Storage Service: The name of the service. Currently, this is just a reference field.
* Invoice Folder Path: For box this is just a reference field as the folder path must be configured inside the scenario. Other services may allow the folder to be defined using this field.
* Success Invoice Filename Format: This field defines the preferred filename format for the generated Invoice IIF files that are loaded to the online storage service. If the token {DateTime} is included, the current date and time will be inserted in the filename.
* Error Invoice Filename Format: If some invoices cannot be mapped successfully they will be listed in a separate ERROR file. This file is a tab-delimited text that can be opened in Excel or other text editors. This field defines the preferred filename format for the generated Invoice ERROR IIF files that are loaded to the online storage service. If the token {DateTime} is included, the current date and time will be inserted in the filename.
* Donation Folder Path: For box this is just a reference field as the folder path must be configured inside the scenario. Other services may allow the folder to be defined using this field.
* Success Donation Filename Format: This field defines the preferred filename format for the generated Donation IIF files that are loaded to the online storage service. If the token {DateTime} is included, the current date and time will be inserted in the filename.
* Error Donation Filename Format: If some donations cannot be mapped successfully they will be listed in a separate ERROR file. This file is a tab-delimited text that can be opened in Excel or other text editors. This field defines the preferred filename format for the generated Donation ERROR IIF files that are loaded to the online storage service. If the token {DateTime} is included, the current date and time will be inserted in the filename.

Notification Emails: This section defines the email addresses that will be used to send notifications when the scenarios run. The emails describe the dates used and provide a link to the generated file. To support notifications, an SMTP connection must be configured inside Integromat.

* Company Email Address: The To: email address.
* Support Email Address: The cc: email address.

## REFERENCE - Sales Tax scenarios

_DISCLAIMER: This documentation is NOT intended to describe proper sales taxes for items, buyers, or sellers. This documentation identifies how invoices, invoice line items, and sales taxes inside Wild Apricot may be mapped and imported to Quickbooks Desktop. It is the responsibility of each company to seek the advice of Accountants to ensure the proper taxes are being identified, collected, and paid. Likewise, this document does not support QuickBooks Online as it uses a different data structure for taxes and invoices._

### General

Sales taxes vary widely and can be dependent on where the buyer is located and/or where the seller is located. In rough terms, sales tax treatment on an invoice falls into these categories:

* Single tax rate applies to all line items on an invoice
* Single tax rate applies, but some items are taxable and some are not
* Different tax rates apply to different line items \(including some as taxed or not taxed\)
* Multiple tax rates apply to individual line items \(e.g. a provincial tax and a city tax\)

For some sales tax jurisdictions, certain customers may be considered as taxable or non-taxable. This may be applicable to an entire invoice or to specific types of items.

### Wild Apricot Sales Tax Treatment

_Consult Wild Apricot documentation for full descriptions of_ [_taxes_](https://gethelp.wildapricot.com/en/articles/44) _and_ [_invoices_](https://gethelp.wildapricot.com/en/categories/16-invoices)_. This summary is intended for context only._

General definition:

* Wild Apricot allows multiple sales tax codes to be defined by the user. e.g. City Sales Tax = 8.25%
* The default tax rate as well as an optional second tax rate for all transactions can be identified.
* Wild Apricot has the capability to use a customer’s address to automatically change which sales taxes applies to a purchase.
* For each invoice line item, up to 2 taxes may be added.
* A tax scope can be defined to determine which types of Wild Apricot transactions will automatically use tax.
* The Wild Apricot online store has [specific tax limitations](https://gethelp.wildapricot.com/en/articles/1570-online-store) addressed in the Wild Apricot documentation.

Resulting Invoice documents and data:

* Each line item in a Wild Apricot invoice may have no taxes, 1 tax rate, or 2 tax rates.
* When viewed, the aggregate sales tax is shown at the bottom of the invoice, not for each line item.
* Invoices exported from Wild Apricot using the Excel/XML format, show only the invoice totals. The export includes the total invoice amount and the amount of each sales tax. There are no line item details included in the invoice.
* Invoices exported from Wild Apricot using the [Quickbooks IIF format](https://gethelp.wildapricot.com/en/articles/69-exporting-to-quickbooks), do not support taxes. Only the total invoice amount is shown \(including any tax amount\).

### Quickbooks Desktop Sales Tax Treatment

_Consult Intuit_ [_Quickbooks Desktop documentation_](https://quickbooks.intuit.com/learn-support/en-us/set-up-sales-taxes/set-up-sales-tax-in-quickbooks-desktop/00/203720) _for full descriptions of taxes and invoices. This summary is intended for context only. Different versions of Quickbooks handle Sales Taxes using different techniques. \(by country; by Desktop vs Online\)_

General Definition:

* To support Sales taxes, the Company settings/preferences must have Sales Taxes “enabled”. By default, a “Sales Tax Payable” account is created when sales taxes are enabled.
* Sales Tax Items are used to define each tax rate. This includes the definition of the tax rate and the Taxing Agency to which the collected sales taxes must be paid.
* Sales Tax Groups are used to define a composite Sales Tax that is based on previously defined Sales Tax Items.
* Sales Tax Codes are used to define the Taxation on an Invoice line item. NOTE: For US Quickbooks versions, the Code is typically T \(taxable\) or blank. For Canada or UK versions, the Tax code can be defined to indicate which Tax Rates \(Sales Tax Items\) or combinations of Tax Rates \(Sales Tax Groups\) are applicable to a line item.
* Sales items may be defined as taxable or not taxable.
* Customers may be defined as taxable or not taxable.

Resulting Invoice documents and data:

* When properly defined, the following are the expected behaviors within Quickbooks Desktop when an invoice is created/imported:
  * Total invoice amount is posted to the identified “Accounts Receivable” account
  * Income/revenue for each line item is posted to the corresponding Income accounts
  * Collected Sales Taxes are posted to the Sales Tax Payable account
  * The Tax Liability report shows the proper amounts for Total Sales, Taxable/non-taxable sales, and sales tax, grouped by the Sales Tax Items. NOTE: sales amounts are repeated dor each Tax Item for reporting purposes.
  * The Tax Agency Vendor record shows the amount of Sales Tax due to the agency.
* Additional Notes for US Quickbooks Desktop version:
  * By default, a Quickbooks invoice lists line items as taxable or not-taxable. A single tax rate can be chosen to apply to the entire invoice. In addition, the invoice can mark the customer as taxable or not-taxable.
  * Quickbooks can use subtotals within the invoice details. When subtotals are used, a different tax rate may be used for each group of invoice line items.
  * Quickbooks also allows a Sales Tax Group to be identified at the invoice level \(instead of an individual tax rate\). Sales Tax Groups may not be used in the detail level with subtotals; they may only be used at the invoice level.
* Additional Notes for Canada Quickbooks Desktop version:
  * By default, a Quickbooks invoice lists line items with a Tax Code. The Tax Code defines whether the line item is taxable and which tax rate\(s\) apply to the line item.
  * No known limitation exists to the number or combination of tax codes on different line items.

### Potential limitations due to Wild Apricot and Quickbooks differences

* Wild Apricot allows 2 tax rates per invoice line item. These tax rates can be different on each line item.
* In Quickbooks US version, if 2 \(or more\) tax rates will apply to a line item \(a sales tax group\), the same sales tax group must apply to all line items.
* Quickbooks enforces “balanced” transactions. The invoice details must equal the invoice header. Sometimes, rounding of tax rates at the line item level before aggregation can lead to a discrepancy.

## 

## QuickBooks Config Prerequisites

WAQM’s configuration is defined inside of Integromat and is intended to map transactions from Wild Apricot to QuickBooks Desktop. WAQM creates IIF files formatted for import into QuickBooks Desktop.

This section describes the QuickBooks Desktop configuration that is expected to be in place to support WAQM. Most companies using QuickBooks will have an established configuration already. In most cases, the QuickBooks configuration can continue to be used. In some cases, recommendations will be made to align with Wild Apricot. These are suggestions only.

Though QuickBooks has some functionally allowing Items, Accounts, and Taxes to automatically be created on IIF import, this is NOT recommended. These automatically created items are not fully set-up inside QuickBooks and can lead to unpredictable behavior. The one exception is Classes; they can be defined up-front in QuickBooks or can be created “on the fly” during IIF import to QuickBooks. This can be useful for cases where a SubClass will use the name of a Membership Level or Event.

### General QB Configuration

* Sales Taxes must be enabled. \(Settings/Preferences for the Company file\) If taxes are not used inside of Wild Apricot or Quickbooks, the scenarios must be customized to remove tax functionality.
* “Use class tracking” must be enabled \(Transaction Settings/Preferences for the Company file\)

### Customer Name and Billing Address

The Customer Name and Billing Address fields in WAQM will load to the Customer and Bill To section of the Invoice or Sales Receipt. On IIF import, QuickBooks will either use an existing Customer or create a new Customer. The name must match exactly.

To prevent duplicate customers inside QuickBooks, WAQM should be configured to use the same customer name format. See Data Store Configuration for more details and how tokens may be used to compile a text string from data inside Wild Apricot.

### Configuration per Order Type

For each Order Type in Wild Apricot \(Membership, Events, Online Store, Manual Item\), the following items must be mapped. It is recommended that they be kept generic for each “header” order type.

Receivables Account

Income \(Revenue\) Account

Sales Inventory List Item

Class

It is also possible to map SubAccounts or SubClasses to specific line item types. \(e.g. a specific Membership Level\) See the Data Store configuration section for more info.

WAQM and IIF support parent and children accounts, items, and classes. Use this format with the Parent and Child separated by a colon if referencing child items. EXAMPLES:

Income:Events

Membership:Professional Memberships

NOTES:

* The account and class defined for a line item in the IIF file overrides the configuration of the Sales Inventory List Item inside QuickBooks.
* If an account is created during IIF import, it is automatically defined as a “bank” account.

### Tax Related Configuration

QuickBooks Desktop manages taxes differently for US and Canadian versions. Note the Quickbooks version used and which portions of configuration must be maintained.

#### Taxes for Canadian \(CAD\) Quickbooks Desktop versions:

A simple mapping of tax codes is required. Most of the tax calculation is managed by Quickbooks during the import process. Other fields exist inside the WAQM configuration and can be used as a reference.

This version supports any combination of tax rates on a single invoice.

Key configuration:

* For single taxes: Sales Tax Rate Name \(from Wild Apricot\) must be mapped to the Sales Tax Code \(from QuickBooks\). This Tax Code is inserted on every line item.
* For dual taxes: The Sales Tax Rate Names must be listed in the WAQM configuration. A Sales Tax Group must be created in the WAQM configuration that maps a single Sales Tax Code \(from Quickbooks\) to the 2 Sales Tax Rate Names \(from Wild Apricot\).

#### Taxes for United States \(US\) Quickbooks Desktop versions:

Sales taxes must be fully defined and formatted within the IIF file for each invoice. This includes these fields:

* Accounts
* Tax Agency Name
* Tax Rate
* Tax Amount
* and Sales Tax List Item

Though these items are defined in the IIF file, it is highly recommended that the same exact configuration of Tax Rates, Tax Names, Tax Agencies, and Tax Accounts exist inside QuickBooks. This will minimize unexpected behavior or confusion.

WAQM configuration maps the Wild Apricot tax names and rates to the corresponding QuickBooks Tax configuration \(name, rate, account, tax agency\). The WAQM scenario uses the tax rates to calculate the tax amount to list on the invoices. For untaxed invoices, a Sales Tax line with zero tax must still be created to allow IIF import into a QuickBooks Company that has Sales Taxes enabled.

Some limitations on tax scenarios exist based on QuickBooks limitations. These scenarios are supported:

* A single tax rate for an entire invoice \(different combinations of taxable and non-taxable items are okay\)
* Different single tax rates for different line items \(uses the Subtotal technique to define a tax line for the Subtotal\)
* A single Sales Tax Group for an entire invoice \(all line items have the same 2 taxes; taxable and nontaxable items are okay\)

These scenarios are not supported:

* An invoice where some line items have a single tax rate and other line items have 2 tax rates
* An invoice where different combinations of dual tax rates exist on different line items

#### QB List Item: Subtotal configuration

\(For some advanced tax scenarios, subtotal is used to group items with the same tax rates. The Integromat scenario only supports a single general “Subtotal” item.\)

* Create a List Item = Subtotal \(type subtotal\)
* If a different Subtotal item already exists \(different name\), change the Integromat config to use the correct name.

## 

## 

## IIF Spec for importing WA Invoices to QB Desktop

### General IIF requirements and information

These requirements are general and derived through research. They are not comprehensive.

* IIF is Intuit Interchange Format intended for imported data INTO QuickBooks Desktop. \(Lists and Transactions\) Third party tools exist that can take IIF files and import them into QuickBooks Online.
* An IIF is a tab-delimited text file with an extension of .iif. The file may be opened in Microsoft Excel or other text editors.
* Intuit/Quickbooks does not support IIF files. They have been deprecated. A separate SDK does exist for creating client-side applications that transform data and load into QuickBooks.
* QuickBooks is actively trying to shift customers away from QuickBooks Desktop to QuickBooks Online. Separate utilities and APIs exist for QuickBooks Online.
* An IIF file includes headers that define the field names for each column and data type. A single file may have multiple types of List items or Transactions.
* An [IIF Import toolkit is available](https://quickbooks.intuit.com/learn-support/en-us/manage-lists/iif-overview-import-kit-sample-files-and-headers/00/201577) that provides example files and help for headers. This toolkit is NOT comprehensive and is focused on the US version of Quickbooks.
* Known issues / bugs with IIF imports:
  * Character limits exist for different fields. Exceeding the length will cause a transaction to fail import. [See this link for more info on character limits.](https://quickbooks.intuit.com/learn-support/en-us/set-up-printing/character-limitations-for-fields-in-quickbooks/00/201937)
  * Using a semicolon in an imported transaction will likely cause the transaction to fail. QuickBooks stops reading the transaction at the semi-colon.
  * Inventory items must exist before import
* 
### IIF Row Types and Associated Field Definitions

**Customers**

* Default WA IIF file does not mark customers as taxable; need to modify IIF or do in QB interface

**TRNS Invoice Record**

Represents the header of the Invoice

* ROWTYPE = TRNS
* TRNSID = use the WA API level transaction ID for the invoice
* TRNSTYPE = INVOICE
* DATE = invoice date
* ACCNT = configured Accounts Receivable account
* NAME = Customer
* CLASS = Class for Invoice Header
* AMOUNT = Total invoice amount \(including taxes\)
* DOCNUM = WA Invoice Number
* MEMO = WA Invoice Internal Notes
* CLEAR = N
* TOPRINT = Y
* NAMEISTAXABLE = Y
* PAID = N
* INVMEMO = Invoice Public Memo
* ADDR1 = Bill-To address line 1
* ADDR2 = Bill-To address line 2
* ADDR3 = Bill-To address line 3
* ADDR4 = Bill-To address line 4
* ADDR5 = Bill-To address line 5
* PAYMETH \(not used\)

**SPL Invoice Sales Line Item \(Distribution\) Record**

SPL “distribution” lines represent the details of an invoice. They can be sales items, subtotals, or taxes. This definition is for a sales Line Item.

* ROWTYPE = SPL \(split transaction\)
* SPLID = use the WA API level transaction ID and line item \(for US versions, this sort is critical to ensure taxes are defined properly\)
* TRNSTYPE = INVOICE
* DATE = invoice date
* ACCNT = configured Income account corresponding to the order type or line item
* NAME = leave blank
* CLASS = per mapping for the line item order type or line item
* AMOUNT = negative of the net amount of line item without taxes
* DOCNUM = leave blank
* MEMO = line item notes for the Invoice line item - shows to the right of the Inventory Item
* CLEAR = N
* QNTY = -1
* PRICE = positive of the net amount f the line item without taxes
* INVITEM = Inventory Item \(category\) listed on Invoice Line item - notes show to the right
* TAXABLE = Y \(or N if no tax applied to line item\)
* SALESTAXCODE = single letter tax code
* VALADJ = N \(assumes that inventory quantities are not managed\)
* REIMBEXP = NOTHING
* EXTRA = not used
* PAYMETH

Additional Notes:

* Inside QB UI, INVITEM will show as the Item Name on the invoice along with the description.
* Account specified in the IIF file overrides any account specified inside the QB Sales Item definition.
* Taxable definition on the IIF line overrides the tax flag on the Sales Item definition in QB
* Import may work without INVITEM specified, but will show as blank item name in QB UI.

**SPL Invoice Tax Record \(not used for CAD QuickBooks version\)**

Tax records are formatted differently depending on the tax scenario. See following section for examples and exceptions. By default, QB assumes 1 SPL Tax line at the end of the IIF transaction to represent the single tax at the invoice level for all taxable items.

* ROWTYPE = SPL \(split transaction\)
* SPLID = use the WA API level transaction ID for the invoice line item
* TRNSTYPE = INVOICE
* DATE = invoice date
* ACCNT = Sales Tax Payable account
* NAME = Sales Tax Agency vendor name
* CLASS = leave blank
* AMOUNT = negative of the tax amount represented by the line item
* DOCNUM = WA Invoice Number
* MEMO = leave blank
* CLEAR = N
* QNTY = leave blank
* PRICE = Sales Tax Rate \(e.g. 6.5%\)
* INVITEM = Sales Tax Item name \(or Sales Tax Group\)
* TAXABLE = N
* SALESTAXCODE = not used for US version?
* VALADJ = N
* REIMBEXP = NOTHING
* EXTRA = AUTOSTAX
* PAYMETH = not used

Additional Notes:

* Even if all items are non-taxable, the SPL line item for tax is required \(if Sales Tax is enabled in QB\)
* Amount/Price/Tax Rate: IIF import does not calculate taxes. The Amount \(of tax\) on the resulting invoice will be listed as shown in the IIF regardless of the actual tax rate.
* DocNum: Invoice Doc Num \(optional? Still seems to get processed when left blank on SPL line\)
* Price: Tax rate \(e.g. 6.5%\)
  * Depending on IIF scenario this rate shows in the UI. It is not used to calculate taxes.
  * If different than the Sales Tax Item definition in QB, does NOT update the rate in the Sales Tax Item.
* QuickBooks requires “balanced” transactions. Sometimes, rounding errors for taxes at the line items will sum and round to a different number at the header level.

**SPL Invoice Subtotal record \(not used for CAD QuickBooks version\)**

Subtotals records are special cases for specific tax scenarios. Consult examples below to determine when to use.

* ROWTYPE = SPL
* SPLID = derive from the invoice number and the line item numbers
* TRNSTYPE = INVOICE
* DATE = invoice date
* ACCNT = leave blank
* NAME = leave blank
* CLASS = leave blank
* AMOUNT = leave blank
* DOCNUM = leave blank
* MEMO = leave blank
* CLEAR = N
* QNTY = leave blank
* PRICE = sum of the prices of the sales line items for which this record is a subtotal \(without tax\)
* INVITEM = Subtotal \(Item\)
* TAXABLE = N
* SALESTAXCODE = not used?
* VALADJ = N
* REIMBEXP = NOTHING
* EXTRA = leave blank
* PAYMETH = not used

NOTE: When used for separating tax rates, the SPL tax line follows this subtotal line. Sort ID \(SPLID\) is critical to make sure the lines are added in sequential order.

**SPL Invoice ENDGRP record \(not used for CAD QuickBooks version\)**

ENDGRP records are special cases for specific tax scenarios. This inserts a blank line on the invoice in the UI to separate items with different subtotals and tax rates. Consult examples below to determine when to use.

* ROWTYPE = SPL
* SPLID = derive from the invoice number and the line item numbers
* TRNSTYPE = INVOICE
* DATE = invoice date
* ACCNT = leave blank
* NAME = leave blank
* CLASS = leave blank
* AMOUNT = leave blank
* DOCNUM = leave blank
* MEMO = leave blank
* CLEAR = N
* QNTY = leave blank
* PRICE = leave blank
* INVITEM = leave blank
* TAXABLE = N
* SALESTAXCODE = not used?
* VALADJ = N
* REIMBEXP = NOTHING
* EXTRA = ENDGRP
* PAYMETH = not used

### IIF Row sequences for US Tax Scenarios

This section summarizes the format of SPL line items needed to support each tax scenario in the US Quickbooks Desktop versions. Canadian Quickbooks DEsktop versions do not require separate SPL tax lines. The Tax Code on each line item is sufficient.

IIF format for standard Single Tax / No Tax Scenario

* !TRNS
* !SPL
* !ENDTRNS
* TRNS
* SPL \(sales item\)
* SPL \(sales item\)
* SPL \(tax\)
* ENDTRNS

IIF format for Different Single Tax Rates for Different Lines

* !TRNS
* !SPL
* !ENDTRNS
* TRNS
* SPL \(sales item - group 1\)
* SPL \(sales item - group 1\)
* SPL \(subtotal\)
* SPL \(tax - for group 1\)
* SPL \(endgrp\)
* SPL \(sales item - group 2\)
* SPL \(sales item - group 2\)
* SPL \(subtotal\)
* SPL \(tax - for group 2\)
* SPL \(endgrp\)
* SPL \(tax - no tax record\)
* ENDTRNS

IIF format for Multiple Tax Rates \(Tax Group\) for single/all line items

* !TRNS
* !SPL
* !ENDTRNS
* TRNS
* SPL \(sales item\)
* SPL \(sales item\)
* SPL \(tax group\)
* SPL \(tax 1\)
* SPL \(tax 2\)
* ENDTRNS

