# General IIF Requirements and Behavior

These requirements are general and derived through research. They are not comprehensive. 

* IIF is Intuit Interchange Format intended for imported data INTO QuickBooks Desktop. \(Lists and Transactions\) Third party tools exist that can take IIF files and import them into QuickBooks Online. 
* An IIF is a tab-delimited text file with an extension of .iif. The file may be opened in Microsoft Excel or other text editors. 
* Intuit/Quickbooks does not support IIF files. They have been deprecated. A separate SDK does exist for creating client-side applications that transform data and load into QuickBooks. 
* QuickBooks is actively trying to shift customers away from QuickBooks Desktop to QuickBooks Online. Separate utilities and APIs exist for QuickBooks Online. 
* An IIF file includes headers that define the field names for each column and data type. A single file may have multiple types of List items or Transactions. 
* An [IIF Import toolkit](https://quickbooks.intuit.com/learn-support/en-us/manage-lists/iif-overview-import-kit-sample-files-and-headers/00/201577) is available from Intuit Quickbooks that provides example files and help for headers. This toolkit is NOT comprehensive and is focused on the US version of Quickbooks. 
* Known issues / bugs with IIF imports: 
  * Character limits exist for different fields. Exceeding the length will cause a transaction to fail import. [See this link for more info on character limits.](https://quickbooks.intuit.com/learn-support/en-us/set-up-printing/character-limitations-for-fields-in-quickbooks/00/201937)
  * Using a semicolon in an imported transaction will likely cause the transaction to fail. QuickBooks stops reading the transaction at the semi-colon. 
  * Carriage returns and New Lines also cause an imported transaction to fail as this disrupts the sequence of rows and columns in the IIF file parsing.
  * Inventory items must exist before import
  * Marking a Customer as Taxable at an Invoice Transaction header does not impact the Customer record inside Quickbooks.
  * Quickbooks requires "balanced" transactions.  Sometimes, rounding errors for taxes at the line items will sum and round to a different number at the header level.  This may cause an IIF import failure.

