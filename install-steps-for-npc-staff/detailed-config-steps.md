# Detailed Config Steps

This section provides an overview of the configuration steps that may be needed in Quickbooks, Wild Apricot, and inside WAQM.  The detailed configuration reference can be found on these pages.

[Quickbooks Config Assumptions](../waqm-config-reference/quickbooks-config-assumptions.md)

[Wild Apricot Config Assumptions](../waqm-config-reference/wild-apricot-config-assumptions.md)

[WAQM Configuration Guide](../waqm-config-reference/waqm-configuration-guide.md)

A\) Determine if any configuration changes are needed inside of Quickbooks itself to match the WAQM configuration.  

1. Configuration items that must be pre-defined and match config exactly: 
   1. Sales Inventory List Item:
      1. These will show up on the Invoice or Donation Sales Receipt under the “Item” column.
      2. The definition of Account and Class inside the imported IIF file overwrites any definition of the List Item inside Quickbooks. 
      3. For Wild Apricot integration purposes, it is recommended to keep the Inventory List Items generic and aligned to the Order Type. \(e.g. Membership, Chapter Event, Online Store Product, Manual Item\) 
   2. Accounts: Accounts typically exist already inside QuickBooks and should be used as-is. The WAQM scenarios and config use the account names, excluding any account numbers. 
   3. Sales Tax Items: Sales Taxes typically exist already inside QuickBooks and should be used as-is. See Data Store configuration sections for tax for more information. 
   4. Sales Tax Codes: Sales Tax Groups typically exist already inside QuickBooks and should be used as-is. See Data Store configuration sections for tax for more information. 
2. Optional Quickbooks definition: Classes and Subclasses: These are automatically created on IIF import. They do not need to be configured in advance.  NOTE: More recent versions of Quickbooks Desktop may require Classes to be created in advance.

B\) Determine if any configuration changes are needed inside of Wild Apricot to match the WAQM and Quickbooks configuration.  

1. Membership Level names and ExtraCosts 
2. Event Tags 
3. Sales Tax Names and Rates 
4. Customer \(Member\) Name formats

C\) Review the WAQM Data Store configuration and adjust as needed. See [WAQM Configuration Guide](../waqm-config-reference/waqm-configuration-guide.md) for detailed descriptions of each configuration section.

