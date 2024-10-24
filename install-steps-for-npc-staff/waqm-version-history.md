---
description: >-
  Track version changes for QBWA and highlight key differences relative to new
  installs and upgrades from previous versions.    NOTE: Detailed version
  history has not been tracked before version v0.6.1.
---

# QBWA Version History

## QBWA v0.8.0.1 (2024-10-21)

### Scope of Change:

* Fixed refactoring errors in v0.8 Core scenarios (Invoice, Payment, and Donation)

### Key changes:

* Issue:  Variables for transactions are persisting from one invoice to the next invoice, causing mapping errors.
* Changes:
  * Transaction Type / Detail Type:
    * Router 414 (just after "Order Type and Contact Variables" module):  ensure all branches set all of the variables that are retrieved inside module 420 -  "Get Matched Tag and Alt Mappings".   If not used by a branch, set the variable to null.  This includes all the branches for Invoice detail type and the Donation branch.   The key variables of concern are: "Matched Event Tag" and "Products Array".
    * Router 459 (Invoice Order Detail Types): Undefined branch:  Update name and remove filter.  Set this branch as a fallback branch.   This ensures that only 1 route for the Invoice Detail Type is used.
    * Module 420 - "Get Matched Tag and Alt Mappings":  Remove the variable "Matched Product Tag".  It is not used at the transaction level and is not used in the rest of the scenario.
  * Transaction Line Item Alternate Mappings:
    * Router 460 (just after "Iterate Txn Lines" iterator:  ensure all branches set all of the variables that are retrieved inside module 434 -  "Get Matched EC-Product Mapping".   If not used by a branch, set the variable to null.  This includes all the branches for Extra Cost and Online Store branches.   The key variables of concern are: "Matched Extra Cost Mapping" and "Matched Product Mapping".
    * Router 428 (Line Item Detail Types): Add a "none of the above" branch:  This ensures that only 1 route for the router is used and sets variable sto null if the line item is not Extra Cost or Online Store.
      * Filter:  Name = Not EC or OnlineStore Line;  Route = fallback route
      * Set variables module:
        * Name = Null EC and Store Variables
        * Variables set to Null = "Matched Extra Cost Mapping" and "Matched Product Mapping".
        * Other Variables:  Invoice Bundle Position and Invoice Line Item Position; use formula/mapping from other branches.   This is primarily used for troubleshooting errors.
    * Module 434 - "Get Matched EC-Product Mapping":  No changes

### Installation impacts:

* No change to process for installation.  Use Txn and Core scenario versions v0.8.0.1 for core scenarios.  Other scenarios and data structures are unchanged and remain at v0.7.0.6.

### Upgrade impacts to existing customers:

* For customers using v0.8, make the above changes directly inside the Core scenarios and update the version number of the scenario.
* For customers upgrading from prior versions, use the same instructions defined in v0.8.

## QBWA v0.8

### Scope of Change:

* Added Support for Online Store Product Tags.
* Core scenarios (Invoice, Payment, Donation) updated to support:
  * Added Support for Online Store Product Tags
  * Refactored to decrease operations usage (moved Invoice Alt Mapping, Event Tag, and Product Tag mappings to separate route)

### Key changes:

* See GitHub issues # 54
  * 54 : Add Online Store Product Tag support
  * Refactoring:  Transaction Level Mapping Reference moved to separate route.  Decreases operation usage; Event Tag determination is only done for Event invoices.
  * Refactoring:  Transaction Line Alt Mapping moved to separate route.  Decreases operation usage; Extra Cost and Product Tag determination is only done for Event invoices.

### Installation impacts:

* No change to process for installation.  Use Txn and Core scenario versions v0.8 for core scenarios.  Other scenarios and data structures are unchanged and remain at v0.7.0.6.

### Upgrade impacts to existing customers:

* Upgrading existing customers with v0.7.x installations.
* From the repository, clone the Core (Invoice, Payment, Donation) scenarios into the client's Make.com environment.
* For each Core scenario:
  * Update the name of the scenario to include the client's name.
  * Ensure the Config Key in the first module matches the Data Store Config used by the client.
  * Ensure the last HTTP module (Send to QBO-TxnPayload) is using the correct URL.  The correct URL is in the webhook (first module) of the corresponding Txn-QBO scenario.
  * Update the scenario's scheduling to match the scheduling of the previous scenarios.
* Update "installed version" inside the active data store record. (nice to do; not required)

## QBWA v0.7.0.6

### Scope of Change:

* Core scenarios (Invoice, Payment, Donation) require logic updates in the transformation section to handle Extra Cost variations from Wild Apricot and to correct the logic for Donation Campaign identification.  Also added Sleep module to "slow down" the execution as it exceeded WildApricot API rate limits sometimes.
* NOTE: moved version of QBO Txn scenario to v0.7.0.6 for consistency. &#x20;

### Key changes:

* See GitHub issues # 105 and 106.
  * 105: Donation Campaign Mapping Logic
  * 106: Extra Cost field mapping variations

### Installation impacts:

* No change to process for installation.  Use Txn and Core scenario versions v0.7.0.6.  No other changes. &#x20;

### Upgrade impacts to existing customers:

* Github issues Impact all clients on v0.6 or after.  &#x20;
  * Issue #105 only impacts clients that use Donations with different mappings for different Donation Campaigns.
  * Issue #106 only impacts clients that use Extra Cost Charge mappings inside QBWA.
* Change summary:  (see screenshots to see exact change)
  * In each of the Core scenarios:
    * issue #105:  Module 291 - Order Type Default Mappings: Update the Logic for "Donation Campaign Name" variable.  "1.Label" --> "1.1.Label"
    * issue #106: update and insert modules for handling Extra Cost mapping variations just after module 372 - Iterate Txn Lines.
  * Update version number in title of each scenario
* Update "installed version" inside the active data store record

<figure><img src="../.gitbook/assets/Screenshot 2023-02-15 at 1.09.50 PM.png" alt=""><figcaption><p>issue 105 1.1.Label</p></figcaption></figure>

<div>

<figure><img src="../.gitbook/assets/Screenshot 2023-02-15 at 1.10.29 PM.png" alt=""><figcaption><p>modules impacted by issue 106</p></figcaption></figure>

 

<figure><img src="../.gitbook/assets/Screenshot 2023-02-15 at 1.11.23 PM.png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../.gitbook/assets/Screenshot 2023-02-15 at 1.11.44 PM.png" alt=""><figcaption></figcaption></figure>

</div>

<div>

<figure><img src="../.gitbook/assets/Screenshot 2023-02-15 at 1.11.55 PM.png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../.gitbook/assets/Screenshot 2023-02-15 at 1.12.09 PM.png" alt=""><figcaption></figcaption></figure>

 

<figure><img src="../.gitbook/assets/Screenshot 2023-02-15 at 1.12.20 PM.png" alt=""><figcaption></figcaption></figure>

</div>

## QBWA v0.7.0.5

### Scope of Change:

* Core scenarios (Invoice, Payment, Donation) require a: updated License Check URL; b) a small logic update in 1 filter for license key check; and c) subsequent route for license renewal email.
* Also in Core scenarios, inserted TestMode variables in first module and 5 filters in scenarios to facilitate installation testing by CRMs.  &#x20;
* NOTE: moved version of QBO Txn scenario to v0.7.0.5 for consistency. &#x20;

### Key changes:

* See GitHub issues # 87 and 94
  * 87: Update License Checker Webhook URL
  * 94: Insert Grace Period for License Check to allow renewal payment success
* TestMode support inside Core scenarios.   Allows true/false variables to be set in first module to allow simple installation testing at each client, without actually modifying scenarios.   No Emails (suppresses emails), License Check Only (stops scenario before data gets pulled from Wild Apricot to conserve Make.com operations consumption), No Transactions Processed (prevents payload from being sent to secondary QBO or QBD Txn scenarios.    Before client is activated all of these variables must be set to "false".

### Installation impacts:

* No change to process for installation.  Use Txn and Core scenario versions v0.7.0.5.  No other changes. &#x20;

### Upgrade impacts to existing customers:

* Github issues Impact all clients on v0.6 or after.&#x20;
* Change summary:  (see screenshots to see exact change)
  * In each of the Core scenarios:
    * 87: update the URL in the HTTP License Check module (module 374) to [http://newpathconsulting.com/check](http://newpathconsulting.com/check)
    * 94: update filter after HTTP license check module to insert a 3 day grace period; add route (and new filter) for email to send a license renewal warning email.
  * Update version number in title of each scenario
* Update "installed version" inside the active data store record
* NOTE: TestMode changes were only made in NPC repositories to use for future clients.

![Change existing filter title and logic](<../.gitbook/assets/Screen Shot 2022-07-27 at 2.49.12 PM.png>) ![New filter and Warning Emails](<../.gitbook/assets/Screen Shot 2022-07-27 at 2.50.21 PM.png>) ![New filter logic](<../.gitbook/assets/Screen Shot 2022-07-27 at 2.50.54 PM.png>)

## QBWA v0.7.0.4

### Scope of Change:

* QBO Txn scenario and Core scenarios (Invoice, Payment, Donation) require a small logic update in 3 modules and in 1 filter. &#x20;
* NOTE: moved version of QBO Txn scenario from v0.7 to v0.7.0.4 for consistency. &#x20;

### Key changes:

* See GitHub issues # 88, 89, 90, 91
  * 88: Line Item Description on a Sales Receipt (Donation) does not populate
  * 89: AutoRun schedule may not work properly for Donations
  * 90: Sales Receipt (Donation) creation fails for some clients
  * 91: Event without tags should use Default mappings (not an Alternate mapping)

### Installation impacts:

* No change to process for installation.  Use Txn and Core scenario versions v0.7.0.4.  No other changes. &#x20;

### Upgrade impacts to existing customers:

* Impacts clients that use Donations.   For future proofing, recommend updating all clients to new version.
* Change summary:  (see screenshots to see exact change)
  * In the QBO Txn scenario:
    * 89: add filter in Sales Receipt route before Data Store update (module 370)
    * 90: remove "Private Note" property from Sales Receipt API call (module 389)
  * In each of the Core scenarios:
    * 88: update logic for Line Item Description field (module 374).
    * 91: u\[date logic for Matched Event Tag (module 291).
  * Update version number in title of each scenario
  * Update "installed version" inside the active data store record

![filter for issue #89](<../.gitbook/assets/Screen Shot 2022-06-28 at 1.05.27 PM.png>) ![issue #90 before](<../.gitbook/assets/Screen Shot 2022-06-28 at 1.06.53 PM.png>) ![issue #90 after](<../.gitbook/assets/Screen Shot 2022-06-28 at 1.08.27 PM.png>)

![issue #88 before](<../.gitbook/assets/Screen Shot 2022-06-28 at 1.10.00 PM.png>) ![issue #88 after](<../.gitbook/assets/Screen Shot 2022-06-28 at 1.11.19 PM.png>) ![issue #91](<../.gitbook/assets/Screen Shot 2022-06-30 at 1.28.12 PM.png>)

## QBWA v0.7.0.3

### Scope of Change:

* Core scenarios (Invoice, Payment, Donation) require a small logic update in 1 filter. &#x20;

### Key changes:

* Bug from Make.com migration.   The "array value" is not correct in the filter between the iterator in module 293 and the aggregator in module 294.    Text editor shows:  \{{293.value\[]\}}
* Manually reselecting the array value corrects this issue in the scenario.   Text editor shows:  \{{293.value\}}

### Installation impacts:

* No change to process.  Use Core scenario versions v0.7.0.3.  No other changes.  Txn scenarios v0.7 are still valid.

### Upgrade impacts to existing customers:

* For clients that use multiple Event Tag business logic mappings, this change is required for proper mapping.   For other clients it is a "nice to do change" to ensure the scenario will work in the future if they choose to start using different Event tag mappings.
* Change summary:  (repeat for each Core scenario)
  * Go to the filter between module 293 and 294
  * Delete the 293.Value portion (the entire box/value)
  * Reselect the 293 Value Array form the inspector.   (see screenshot to see what it should look like when done.
  * Save the filter.
  * Update the scenario version to v0.7.0.3
  * Save the scenario

![INCORRECT](<../.gitbook/assets/Screen Shot 2022-06-07 at 10.49.05 AM.png>) ![CORRECT](<../.gitbook/assets/Screen Shot 2022-06-07 at 10.49.18 AM (1).png>)

## QBWA v0.7.0.2

### Scope of Change:

* Core scenarios (Invoice, Payment, Donation) require a small logic update in 1 module. &#x20;

### Key changes:

* Minor improvement to Summary Email message in scenario where the Default mapping is used because no matched Alternate mapping was found.  This change clarifies which Default mapping was used.  e.g.  MemberApplication or DonationPayment.     The change is in a single module (295) in each of the core scenarios where the "Matched Order Alternate Mapping" is found".

### Installation impacts:

* No change to process.  Use Core scenario versions v0.7.0.2.  No other changes.  Txn scenarios v0.7 are still valid.

### Upgrade impacts to existing customers:

* Nice to do change only for clients with v0.7 or v0.7.0.1.   Clarifies the Email Summary message as described above.
* Change summary:
  * Go to module 295 - Alternate Mapping Match & Contact Values" . &#x20;
  * The logic is changed in the first variable - "Matched Order Alternate Mapping". &#x20;
  * CAUTION - the logic in this variable is very complex and can easily be broken. &#x20;
  * At the end of the logic, find "NoAltMatch-UseDefault"
  * Replace with (taking care not to change the parenthesis:   NoMatch-Use\{{291.`Txn Source Order Type`\}}Default
  * When pasted in Make.com the brackets will not be visible.   (see image)
* This change should be made to all 3 Core scenarios: Invoice, Payment, and Donation.

![](<../.gitbook/assets/Screen Shot 2022-05-20 at 11.19.13 AM.png>)

im

## QBWA v0.7.0.1

### Scope of Change:

* Core scenarios (Invoice, Payment, Donation) require a small error handling tweak.  Technically, this is not needed for the Invoice scenario, but it is still updated to keep Core scenarios consistent.

### Key changes:

* Bug fix.  Error Handling Detail message after the "WA Get Invoice Details" module changed between Integromat.com and Make.com.  Update Error Handler to address either.

### Installation impacts:

* No change to process.  Use Core scenario versions v0.7.0.1.  No other changes.

### Upgrade impacts to existing customers:

* Only impacts existing customers with  v0.7 installed.  As of May 12, 2022, I think all installed customers are upgraded already.
* If others found, go into the client's environment and update the filter on the Error Handing route after the WA Get Invoice Details module (55).  "Titled:  Txn without matched invoice". Reference the version in QBWA Operations.
* Add:  Type = BundleValidation Error  AND  Detail contains "invoiceID"  AND  Scenario Type != Invoice
* This change should be made to all 3 Core scenarios: Invoice, Payment, and Donation.



## QBWA v0.7

NOTE:  This is a major release with new features and completely refactored from previous versions.  Requires reinstall for existing clients.

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
  * Updated QBO Transaction Creation to search for existing customers using "Display Name" since this is Quickbooks' unique key.  This should reduce the umber of "false" duplicate customer warnings.  This also requires configuring the QBWA Display Name format to match Quickbooks.
* Architecture changes support NPC roadmap
  * Refactored Core scenarios to use common logic and process (supports future goal of further refactoring away to support DevOps models and to support different source systems)
  * Refactored Transaction Creation QBO scenario to support all QBO transaction types with a single scenario.
  * Refactored Transaction Creation QBD branch to a new scenario AND updated the scenario to support all QBD transaction types with a single scenario.

### Installation impacts:

* Major changes.   Basic process is the same, but the specific list of Data Structures and Scenarios has changed.   Consult install guide for updates.  Install guide has been revamped to simplify install somewhat.  Follow steps exactly.

### Upgrade impacts to existing customers:

* Major.  If a customer wishes to upgrade to this version, it is effectively a re-install as the Config Data Store structure has changed. &#x20;
* If possible, work with the customer to populate the new version of the Mapping Guide.  Depending on how old the customer is, some new data may be required.  Payment congig details are new.
* Upgrade utility exists to upgrade v0.6 config data structure to v0.7 config data structure.  Some tweaking may still be required.

## QBWA v0.6.1.3

### **Scope of Change:**

* Invoice QBO v0.6.1.3 (other scenarios not changed)

### Key changes:

* Updated customer search query to look for variations of single quote and replace with an escaped simple single quote.

### Installation impacts:

* Any Wild Apricot Member names (customers) including a quote (e.g. O'Brien) will be searched and created inside Quickbooks with a simple single quote.  Depending on previous administration, some existing Quickbooks customers may be treated as different than the Wild Apricot customer.

### Upgrade impacts to existing customers:

* no impact; upgrade not required

## QBWA v0.6.1.2

### **Scope of Change:**

* Invoice QBO v0.6.1.2 (other scenarios not changed)

### Key changes:

* Updated tax logic to insert a default tax code for QBO Canada when one cannot be derived from Wild Apricot.

### Installation impacts:

* For customers requiring this feature, a "NoTaxInWA" entry is required in the QBWA config.  See special case note inside the QBWA configuration section.

### Upgrade impacts to existing customers:

* no impact; upgrade not required

## QBWA v0.6.1.1

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


## QBWA v0.6.1

### Scope of Change:&#x20;

* Invoice QBD and QBO
* Donation QBD and QBO

### Key changes:

* Refactored scenarios to allow QBO portions (and connections) to be in a secondary QBO scenario.  In previous versions, QBD clients had redundant QBO connections that were not needed and could cause warnings. &#x20;
* Added a License Key check that confirms a client is running an unexpired, licensed version.
* Removed default values from Data Structures.  The default values would populate into blank sections of a client's config each time it was edited.

### Installation impacts:

* New "QBWA License Key" configuration field needed to support License check.  This has been added to the mapping sheet and is added to the QBWA Config data structure, and must be populated as part of the QBWA version section of the data store configuration.  &#x20;
* Work with NewPath Consulting to get a valid license key.   It is typically in the format of XXXX-XXXX-XXXX-XXXX.
* 2 separate scenarios exist for Invoices and for Donations.   QBO clients require all scenarios.   QBD clients only need the Core scenarios.
* New data structures for cloning:   &#x20;
  * QBWA QBO Cust ID
  * QBWA QB Tax Code&#x20;
  * QBWA-Invoice-QBOPayload
  * QBWA-Donation-QBOPayload

### Upgrade considerations:

* QBWA configuration data structure only has minor changes from recent versions.   It may be easier to edit the existing data structure and data store instead of creating a new data structure and data store.  This would require re-entering config data in the new data store.
* If an existing QBD client has customizations related to the Storage location for IIF files (e.g. OneDrive, box, or other), these same customizations will need to be carried forward to the newly cloned scenarios.



