# WAQM Usage and Maintenance Overview

This section provides a high level overview of WAQM usage and maintenance.

**Normal Usage:**  In general, WAQM is designed so that it can be automatically run on a regular monthly or daily schedule.   When it runs, data is automatically pulled from Wild Apricot and transformed into the proper Quickbooks format.   

* For Quickbooks Desktop, IIF text files are generated in the proper format to be imported into Quickbooks.   
* For Quickbooks Online, the invoice or Donation is directly created inside Quickbooks Online.  

For normal usage, no changes or intervention is needed for WAQM to operate.  If both Invoices and Donations are used, these are managed in different Integromat scenarios and for Quickbooks Desktop will generate separate IIF files.

**Manual Usage:**   When needed, WAQM can be adjusted to run for a manual set of start and end dates.   The [WAQM Scheduling Options](../waqm-maintenance/waqm-scheduling-options.md) page describes how to adjust WAQM for this purpose.   This change will be needed for both Invoices and Donation if both are used.  Remember to adjust back to automatically scheduled if desired.

**Changing WAQM Configuration:**    When changes are made in Wild Apricot \(e.g. Member Levels, Event Tags, Sales Taxes\) or Quickbooks  \(e.g. Accounts, Inventory Items/Products, Classes, Sales Taxes\), the WAQM configuration must be updated to match.   These pages can be referenced when configuration changes need to be made: [WAQM Configuration Guide](../waqm-config-reference/waqm-configuration-guide.md) and  [Managing Config Key Records](../waqm-maintenance/managing-config-key-records.md) \(including Backing up an existing configuration\)



