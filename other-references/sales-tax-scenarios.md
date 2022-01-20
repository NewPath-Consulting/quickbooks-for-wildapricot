# Sales Tax Scenarios



_DISCLAIMER: This documentation is NOT intended to describe proper sales taxes for items, buyers, or sellers. This documentation identifies how invoices, invoice line items, and sales taxes inside Wild Apricot may be mapped and imported to Quickbooks Desktop. It is the responsibility of each company to seek the advice of Accountants to ensure the proper taxes are being identified, collected, and paid._&#x20;

#### General

Sales taxes vary widely and can be dependent on where the buyer is located and/or where the seller is located. In rough terms, sales tax treatment on an invoice falls into these categories:

* Single tax rate applies to all line items on an invoice
* Single tax rate applies, but some items are taxable and some are not
* Different tax rates apply to different line items (including some as taxed or not taxed)
* Multiple tax rates apply to individual line items (e.g. a provincial tax and a city tax)

For some sales tax jurisdictions, certain customers may be considered as taxable or non-taxable. This may be applicable to an entire invoice or to specific types of items.

#### Wild Apricot Sales Tax Treatment

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
* Invoices exported from Wild Apricot using the [Quickbooks IIF format](https://gethelp.wildapricot.com/en/articles/69-exporting-to-quickbooks), do not support taxes. Only the total invoice amount is shown (including any tax amount).

#### Quickbooks Desktop Sales Tax Treatment

_Consult Intuit_ [_Quickbooks Desktop documentation_](https://quickbooks.intuit.com/learn-support/en-us/set-up-sales-taxes/set-up-sales-tax-in-quickbooks-desktop/00/203720) _for full descriptions of taxes and invoices. This summary is intended for context only. Different versions of Quickbooks handle Sales Taxes using different techniques. (by country; by Desktop vs Online)_

General Definition:

* To support Sales taxes, the Company settings/preferences must have Sales Taxes “enabled”. By default, a “Sales Tax Payable” account is created when sales taxes are enabled.
* Sales Tax Items are used to define each tax rate. This includes the definition of the tax rate and the Taxing Agency to which the collected sales taxes must be paid.
* Sales Tax Groups are used to define a composite Sales Tax that is based on previously defined Sales Tax Items.
* Sales Tax Codes are used to define the which Sales Tax Item or Group is applicable on an Invoice line item.&#x20;
  * For US Quickbooks Desktop versions, the Code at the line item is typically T (taxable) or blank.   The specific Tax is defined on separate rows of an IIF file.
  * For Canada versions, the Tax code can be defined to indicate which Tax Rates (Sales Tax Items) or combinations of Tax Rates (Sales Tax Groups) are applicable to a line item.
* Sales items may be defined as taxable or not taxable.
* Customers may be defined as taxable or not taxable.

Resulting Invoice documents and data:

* When properly defined, the following are the expected behaviors within Quickbooks when an invoice is created/imported:
  * Total invoice amount is posted to the identified “Accounts Receivable” account
  * Income/revenue for each line item is posted to the corresponding Income accounts
  * Collected Sales Taxes are posted to the Sales Tax Payable account
  * The Tax Liability report shows the proper amounts for Total Sales, Taxable/non-taxable sales, and sales tax, grouped by the Sales Tax Items. NOTE: sales amounts are repeated for each Tax Item for reporting purposes.
  * The Tax Agency Vendor record shows the amount of Sales Tax due to the agency.
* Additional Notes for US Quickbooks Desktop version:
  * By default, a Quickbooks invoice lists line items as taxable or not-taxable. A single tax rate can be chosen to apply to the entire invoice. In addition, the invoice can mark the customer as taxable or not-taxable.
  * Quickbooks can use subtotals within the invoice details. When subtotals are used, a different tax rate may be used for each group of invoice line items.
  * Quickbooks also allows a Sales Tax Group to be identified at the invoice level (instead of an individual tax rate). Sales Tax Groups may not be used in the detail level with subtotals; they may only be used at the invoice level.
* Additional Notes for Canada Quickbooks versions:
  * By default, a Quickbooks invoice lists line items with a Tax Code. The Tax Code defines whether the line item is taxable and which tax rate(s) apply to the line item.
  * No known limitation exists to the number or combination of tax codes on different line items.
* Additional Notes for US Quickbooks Online versions:
  * US Quickbooks Online uses AST (Auto Sale Tax) determination to determine proper taxing authorities and tax rates based on the address of the buyer and the seller.  &#x20;
  * AST overrides any specific tax codes that WAQM specifies during invoice creation.
  * The collect tax amount specified by WAQM is still used on the invoice, but it may be split proportionally to different taxing agencies based on Quickbooks Online AST logic.

#### Potential limitations due to Wild Apricot and Quickbooks differences

* Wild Apricot allows 2 tax rates per invoice line item. These tax rates can be different on each line item.
* In Quickbooks US version, if 2 (or more) tax rates will apply to a line item (a sales tax group), the same sales tax group must apply to all line items.
* Quickbooks enforces “balanced” transactions. The invoice details must equal the invoice header. Sometimes, rounding of tax rates at the line item level before aggregation can lead to a discrepancy.
