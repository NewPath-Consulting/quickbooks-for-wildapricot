# Quickbooks Config Assumptions



### Overview

WAQM’s configuration is defined inside of Integromat and is intended to map transactions from Wild Apricot to QuickBooks. WAQM creates IIF files formatted for import into QuickBooks Desktop or creates invoices directly inside Quickbooks Online.

This section describes the QuickBooks configuration that is expected to be in place to support WAQM. Most companies using QuickBooks will have an established configuration already. In most cases, the QuickBooks configuration can continue to be used as-is. In some cases, recommendations may be recommended to align with Wild Apricot.

Though QuickBooks Desktop has some functionally allowing Items, Accounts, and Taxes to automatically be created on IIF import, this is NOT recommended. These automatically created items are not fully set-up inside QuickBooks Desktop and can lead to unpredictable behavior. The one exception is Classes; they can be defined up-front in QuickBooks Desktop or can be created “on the fly” during IIF import to QuickBooks Desktop. This can be useful for cases where a SubClass will use the name of a Membership Level or Event. Quickbooks Online does not support this capability; Classes must be defined before used to create an invoice.

**General QB Configuration**

* Sales Taxes must be enabled. \(Settings/Preferences for the Company file\) If taxes are not used inside of Wild Apricot or Quickbooks, the scenarios must be customized to remove tax functionality.

![Sales Tax setting in QBD](../.gitbook/assets/1.png)

* “Use class tracking” must be enabled \(Transaction Settings/Preferences for the Company file\)

![Class tracking setting in QBD](../.gitbook/assets/2.png)

![Class tracking setting in QBO](../.gitbook/assets/screen-shot-2021-01-06-at-10.27.18-am.png)

**Customer Name and Billing Address**

The Customer Name and Billing Address fields in WAQM will load to the Customer and Bill To section of the Invoice or Sales Receipt. On IIF import, QuickBooks will either use an existing Customer or create a new Customer. The Customer name must match exactly.

To prevent duplicate customers inside QuickBooks, WAQM should be configured to use the same customer name format. See Data Store Configuration for more details and how tokens may be used to compile a text string from data inside Wild Apricot.

QBO will search for an existing customer match before invoice creation. If not found, a customer will be created with details from Wild apricot.

**Accounts**

These types of Accounts must be defined in Quickbooks.

* Receivables Account: Represents funds that are due to a company, but yet received. Many organizations will use a single AR account, but it is possible to have multiple AR accounts for multiple purposes.
* Income \(Revenue\) Account: An account representing the income generated from a Sales Item. It is common to have multiple income accounts. It is recommended to use income accounts that will be fairly stable instead of creating new Income Accounts frequently. Each time a new Wild Apricot related Income account is created, the WAQM config must be updated.
* Sales Tax Payable Account: If Sales Taxes are used, this represents the Sales Taxes that are expected to be paid to Taxing authorities.
* If Donations are used, it is common to have a separate Deposit or Bank account o use with the Sales Receipt created for a Donation

The recommended practice is to limit the number of accounts used. If further granularity is desired, classes and subclasses may be used in reporting.

NOTES:

* If an account is created during IIF import, it is automatically defined as a “bank” account.
* The example below is for illustration only. The list of chart accounts is filtered to show accounts with Membership in the name.
  * The list shows both the name and the account number. WAQM only uses the names.
  * “Membership Fees” is a Parent account
  * “Membership Fees:Affiliates Annual Dues” is a child account
  * For QBO, the system ID of the account required.  This is not typically accessible by a user, but may be identified in the QBO URL when reviewing the register for the desired account.

![QBD Example: list of accounts](../.gitbook/assets/3.png)

![QBO Example: Identifying the system ID for Accounts Receivable account](../.gitbook/assets/screen-shot-2021-01-06-at-11.17.35-am.png)

**Sales Items**

For each Order Type in Wild Apricot \(Membership, Events, Online Store, Manual Item\), a Sales Inventory List Item \(Product\) must exist inside Quickbooks. This may represent a good or a service. The Item links the Sales item to the proper Income accounts and displays on the Quickbooks internal Invoice.

For Quickbooks Desktop:  The recommended practice is to use a single Item per category, such as “Membership”. The specific line item details will also be listed on each line item \(e.g. Gold Membership Level renewal\) and each may be mapped to separate income accounts.  If further granularity is desired, classes and subclasses may be used in reporting.

For Quickbooks Online:  Income accounts are not explicitly mapped by WAQM.  If a different income account is required for a type of Wild Apricot transaction, a different Inventory List Item \(Product\) must be defined and used in the mapping.

NOTES:

* The example below shows a list of the Sales Items with “professional” in the name.
* For Quickbooks Desktop:  The account and class defined for a line item in the IIF file overrides the configuration of the Sales Inventory List Item inside QuickBooks.

![](../.gitbook/assets/4.png)

**Sub- Accounts, Items, and Classes**

To designate child accounts in WAQM for QBD IIF files, use this format with the Parent and Child separated by a colon if referencing child items.

EXAMPLES:

Income:Events

Membership:Professional Memberships



**Tax Related Configuration**

QuickBooks manages taxes differently for US and Canadian versions as well as some differences for Quickbooks Desktop vs Quickbooks Online. Note the Quickbooks version used and which portions of configuration must be maintained.

**Taxes for Canadian \(CAD\) Quickbooks Desktop versions:**

A simple mapping of tax codes is required for WAQM. Most of the tax calculation is managed by Quickbooks during the import process. Other fields exist inside the WAQM configuration and can be used as a reference.

Sales Tax Item: For each Sales Tax used, a Sales Tax Item must be configured inside Quickbooks. This defines the name, account, tax rate, and taxing agency. The name is used in the WAQM configuration for proper mapping.

Sales Tax Group: For each Sales Tax Group used \(a combination of tax rates applied to a single item\), a Sales Tax Group must be configured inside Quickbooks. This defines the combination of Tax Rates included in the Tax Group. The name is used in the WAQM configuration for proper mapping.

The examples below show a list of Sales Tax Items and Sales Tax Groups in addition to the configuration options for each type.

![](../.gitbook/assets/5.png)

![](../.gitbook/assets/6.png) ![](../.gitbook/assets/7.png)

**Taxes for United States \(US\) Quickbooks Desktop versions:**

Sales taxes must be fully defined and formatted within the IIF file for each invoice. This includes these fields:

* Accounts
* Tax Agency Name
* Tax Rate
* Tax Amount
* Sales Tax List Item

Though these items are defined in the IIF file, it is highly recommended that the same exact configuration of Tax Rates, Tax Names, Tax Agencies, and Tax Accounts exist inside QuickBooks. This will minimize unexpected behavior or confusion.

WAQM configuration maps the Wild Apricot tax names and rates to the corresponding QuickBooks Tax configuration \(name, rate, account, tax agency\). The WAQM scenario uses the tax rates to calculate the tax amount to list on the invoices. For untaxed invoices, a Sales Tax line with zero tax must still be created to allow IIF import into a QuickBooks Company that has Sales Taxes enabled.

Some limitations on tax scenarios exist based on QuickBooks US limitations. These scenarios are supported:

* A single tax rate for an entire invoice \(different combinations of taxable and non-taxable items are okay\)
* Different single tax rates for different line items \(uses the Subtotal technique to define a tax line for the Subtotal\)
* A single Sales Tax Group for an entire invoice \(all line items have the same 2 taxes; taxable and nontaxable items are okay\)

These scenarios are not supported:

* An invoice where some line items have a single tax rate and other line items have 2 tax rates
* An invoice where different combinations of dual tax rates exist on different line items

**QB List Item: Subtotal configuration**

\(For some advanced tax scenarios, subtotal is used to group items with the same tax rates. The Integromat scenario only supports a single general “Subtotal” item.\)

* Create a List Item = Subtotal \(type subtotal\)
* If a different Subtotal item already exists \(different name\), change the Integromat config to use the correct name.

