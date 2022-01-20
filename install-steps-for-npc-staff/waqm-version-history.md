---
description: >-
  Track version changes for WAQM and highlight key differences relative to new
  installs and upgrades from previous versions.    NOTE: Detailed version
  history has not been tracked before version v0.6.1.
---

# WAQM Version History

## WAQM v0.7.test

NOTE:  This is a major release with new features and completely refactored from previous versions.

### **Scope of Change:**

* All scenarios, data structures, and data stores from previous versions

### Key changes:

* Added support for Payment transactions (in addition to Invoices and Donations)
* Total re-work of Config Data Store Structure and Fields (to improve clarity and decrease confusion)
* Reworked Mapping Guide to match and improved structure/wording for clarity
* Improved Scheduling options for improved functionality and decreased confusion.
  * Monthly, Weekly, and Daily options
  * With the exception of Job Start Time, all scheduling is configured inside the Data Store. (scenarios run every day and check to see if "today" is a real run.
  * Manual run now includes the option to run for a specified Document number from the source system.
  * Updating AutoRun scheduling examples in Mapping Guide to match
* Improved Summary email that is generated at the end of each job. &#x20;
  * Included error handling messaging improvements from previous versions. &#x20;
  * Added a transaction count (total ,success, and error).  Success/error only for QBO.
  * Include info about the run type and the specific time periods used.
* Miscellaneous client facing changes:
  * Added TimeZone config to carry through scenario (to eliminate discrepancies between NPC Staff and Client time zones)
  * Updated Donation logic to include Donation Document Number (now available from Wild Apricot API)
  * Updated QBO Transaction Creation to search for existing customers using "Display Name" since this is Quickbooks' unique key.  This should reduce the umber of "false" duplicate customer warnings.  This also requires configuring the WAQM Display Name format to match Quickbooks.
* Architecture changes support NPC roadmap
  * Refactored Core scenarios to use common logic and process (supports future goal of further refactoring away to support DevOps models and to support different source systems)
  * Refactored Transaction Creation QBO scenario to support all QBO transaction types with a single scenario.
  * Refactored Transaction Creation QBD branch to a new scenario AND updated the scenario to support all QBD transaction types with a single scenario.

### Installation impacts:

* Major changes.   Basic process is the same, but the specific list of Data Structures and Scenarios has changed.   Consult install guide for updates.

### Upgrade impacts to existing customers:

* Major.  If a customer wishes to upgrade to this version, it is effectively a re-install as the Config Data Store structure has changed. &#x20;
* If possible, work with the customer to populate the new version of the Mapping Guide.  Depending on how old the customer is, some new data may be required.
* Still pending - an Integromat utility to help transfer data store configuration from previous versions to this version.

## WAQM v0.6.1.3

### **Scope of Change:**

* Invoice QBO v0.6.1.3 (other scenarios not changed)

### Key changes:

* Updated customer search query to look for variations of single quote and replace with an escaped simple single quote.

### Installation impacts:

* Any Wild Apricot Member names (customers) including a quote (e.g. O'Brien) will be searched and created inside Quickbooks with a simple single quote.  Depending on previous administration, some existing Quickbooks customers may be treated as different than the Wild Apricot customer.

### Upgrade impacts to existing customers:

* no impact; upgrade not required

## WAQM v0.6.1.2

### **Scope of Change:**

* Invoice QBO v0.6.1.2 (other scenarios not changed)

### Key changes:

* Updated tax logic to insert a default tax code for QBO Canada when one cannot be derived from Wild Apricot.

### Installation impacts:

* For customers requiring this feature, a "NoTaxInWA" entry is required in the WAQM config.  See special case note inside the WAQM configuration section.

### Upgrade impacts to existing customers:

* no impact; upgrade not required

## WAQM v0.6.1.1

### **Scope of Change:**

* Invoice QBO v0.6.1.1 (other scenarios not changed)

### Key changes:

* improved Invoice-QBO scenario error handling and notification message to show Duplicate Customer and Duplicate Invoice numbers more clearly
* updated Tax code specification on QBO invoice creation so that the same scenario can be used for US and Canadian customers.

### Installation impacts:

* none

### Upgrade impacts to existing customers:

* minor tweak to customers using v0.6.1.  Either tweak the scenario in the existing client environment or clone the new scenario and make sure the config key and HTTP URLs are updated to match the customer's previous scenario.
* If tweaking, this is the summary of changes:
  * Invoice-QBO scenario: (no changes to Core scenario)
    * remove US customer filter after the first router
    * new error handling route after QBO customer creation
    * update the logic for QB Tax Code ID inside module 219: Inv Line array in QBO format
    * update the Resume Error Handler module after QBO invoice creation
    * update the link in module 252: Create Invoice html row
    * Update the Mailgun module:  subject line and initial text paragraph
  * Repeat with small differences in the Donation-QBO scenario\


## WAQM v0.6.1

### Scope of Change:&#x20;

* Invoice QBD and QBO
* Donation QBD and QBO

### Key changes:

* Refactored scenarios to allow QBO portions (and connections) to be in a secondary QBO scenario.  In previous versions, QBD clients had redundant QBO connections that were not needed and could cause warnings. &#x20;
* Added a License Key check that confirms a client is running an unexpired, licensed version.
* Removed default values from Data Structures.  The default values would populate into blank sections of a client's config each time it was edited.

### Installation impacts:

* New "WAQM License Key" configuration field needed to support License check.  This has been added to the mapping sheet and is added to the WAQM Config data structure, and must be populated as part of the WAQM version section of the data store configuration.  &#x20;
* Work with NewPath Consulting to get a valid license key.   It is typically in the format of XXXX-XXXX-XXXX-XXXX.
* 2 separate scenarios exist for Invoices and for Donations.   QBO clients require all scenarios.   QBD clients only need the Core scenarios.
* New data structures for cloning:   &#x20;
  * WAQM QBO Cust ID
  * WAQM QB Tax Code&#x20;
  * WAQM-Invoice-QBOPayload
  * WAQM-Donation-QBOPayload

### Upgrade considerations:

* WAQM configuration data structure only has minor changes from recent versions.   It may be easier to edit the existing data structure and data store instead of creating a new data structure and data store.  This would require re-entering config data in the new data store.
* If an existing QBD client has customizations related to the Storage location for IIF files (e.g. OneDrive, box, or other), these same customizations will need to be carried forward to the newly cloned scenarios.



