# QBWA Usage and Maintenance Overview

This section provides a high level overview of QBWA usage and maintenance.

**Normal Usage:**  In general, QBWA is designed so that it can be automatically run on a regular monthly, weekly, or daily schedule.   When it runs, data is automatically pulled from Wild Apricot and transformed into the proper Quickbooks format.  &#x20;

* For Quickbooks Desktop, IIF text files are generated in the proper format to be imported into Quickbooks.  &#x20;
* For Quickbooks Online, the transaction is directly created inside Quickbooks Online. &#x20;

For normal **Scheduled Usage**, no changes or intervention is needed for QBWA to operate.  Each transaction type (Invoice, Payment, Donation), is managed in a different Make.com scenario and for Quickbooks Desktop will generate separate IIF files.  Any changes to scheduling configuration must be done for each transaction type.

**Manual Usage:**  When needed, QBWA can be adjusted to run for a manual set of start and end dates.   The [QBWA Scheduling Options](../qbwa-maintenance/waqm-scheduling-options.md) page describes how to adjust QBWA for this purpose.   This change will be needed for each scenario (transaction type).  Remember to adjust back to automatically scheduled, if desired.

**Changing QBWA Configuration:**    When changes are made in Wild Apricot (e.g. Member Levels, Event Tags, Sales Taxes) or Quickbooks  (e.g. Accounts, Inventory Items/Products, Classes, Sales Taxes), the WAQM configuration must be updated to match.   These pages can be referenced when configuration changes need to be made inside Make.com: [QBWA Configuration Guide](../qbwa-config-reference/waqm-configuration-guide.md) and  [Managing Config Key Records](../qbwa-maintenance/managing-config-key-records.md) (including Backing up an existing configuration).

