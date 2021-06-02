---
description: >-
  Track version changes for WAQM and highlight key differences relative to new
  installs and upgrades from previous versions.    NOTE: Detailed version
  history has not been tracked before version v0.6.1.
---

# WAQM Version History

### WAQM v0.6.1

#### Scope of Change: 

* Invoice QBD and QBO
* Donation QBD and QBO

Key changes:

* Refactored scenarios to allow QBO portions \(and connections\) to be in a secondary QBO scenario.  In previous versions, QBD clients had redundant QBO connections that were not needed and could cause warnings.  
* Added a License Key check that confirms a client is running an unexpired, licensed version.
* Removed default values from Data Structures.  The default values would populate into blank sections of a client's config each time it was edited.

Installation impacts:

* New "WAQM License Key" configuration field needed to support License check.  This has been added to the mapping sheet and is added to the WAQM Config data structure, and must be populated as part of the WAQM version section of the data store configuration.   
* Work with NewPath Consulting to get a valid license key.   It is typically in the format of XXXX-XXXX-XXXX-XXXX.
* 2 separate scenarios exist for Invoices and for Donations.   QBO clients require all scenarios.   QBD clients only need the Core scenarios.
* New data structures for cloning:    
  * WAQM QBO Cust ID
  * WAQM QB Tax Code 
  * WAQM-Invoice-QBOPayload
  * WAQM-Donation-QBOPayload

Upgrade considerations:

* WAQM configuration data structure only has minor changes from recent versions.   It may be easier to edit the existing data structure and data store instead of creating a new data structure and data store.  This would require re-entering config data in the new data store.
* If an existing QBD client has customizations related to the Storage location for IIF files \(e.g. OneDrive, box, or other\), these same customizations will need to be carried forward to the newly cloned scenarios.




