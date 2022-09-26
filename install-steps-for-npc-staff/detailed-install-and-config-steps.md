# Detailed Install Steps (New Team Inside Make.com Org)

_<mark style="color:red;">**NOTE:  This section should not be needed.  Using the Detailed Install Steps (for a New Make.com Org) should work for a new Team inside NPC's org as well.   The install approach still relies on the "source" repository in a separate Make.com global region and the migration tool.**</mark>_



These are the detailed steps to install the components of WAQM into a new Team within NPC's Make.com instance.   An overview of the installation process is described on this page.   [WAQM Installation Overview](../waqm-overview-1/waqm-installation-overview.md)

### **A) Create Team for Client inside Make.com**

The capability to create teams is restricted to overall NPC Admins.  This step may need to be completed by an Admin.

1. Create a Team using the naming convention of:  QBWA-\<client acronym>
2. Add NPC focals that will support installation as "Team Admins"

### **B) Create recommended Scenario folders in Client Team**

* WAQM\_Released
* WAQM-Helpers-Install
* WAQM-Helpers-Support
* WAQM-Helpers-Upgrade \[for future use-only for existing WAQM clients moving from earlier version to v7)

### **C) Clone initial "Connection" scenarios and Create connections**

For each of the scenarios below, Clone the scenario from the WAQM Operations Released-Install Helper folder to the Client Team.   During cloning, create a new Connection to the Clients system using credentials provided by the client. &#x20;

1. Create-Test QBO Connection with Invoice \[QBO clients only] (need login credentials)
   * This scenario uses an Invoice module to push QBO to provide "Accounting" permissions.
2. Create-Test WA Connection (need API Key)
3. Create-Test “box” Connection (only for QBD and client’ using box)
   * NOTE:  If a QBD client does not use "box", a temporary connection may be needed.  Once the scenarios are adjusted for "box" alternates, the temporary connection can be removed. &#x20;
4. Make sure each scenario runs successfully once to demonstrate that the connection has been created successfully.
5. Move scenarios into Helper-Install folder



![Example - creating connection during scenario clone process](<../.gitbook/assets/Screen Shot 2022-03-10 at 10.39.23 AM (1).png>)

### **D) Clone Data Structures**&#x20;

_From the WAQM Operations Released folder, clone each Data Structure below to the client’s Team (the target). Update the name and select the client’s Team as the target. Update the name to include the client's name and the data structure version number._&#x20;

1. WAQM Config&#x20;
2. WAQM-QBD-Txn-IIF\_RAW \[QBD clients only]
3. WAQM QBO Cust ID \[QBO clients only]
4. WAQM QB Tax Code&#x20;
5. WAQM-Txn-Line&#x20;
6. WAQM-Txn-Payload
7. WAQM-Txn
8. WA-QB-Invoice-IIF\_TRNS (optional for QBD clients-documentation of IIF structure for QBD)&#x20;
9. WA-QB-Invoice-IIF\_SPL (optional for QBD clients-documentation of structure for QBD)&#x20;

![Cloning a Data Structure](<../.gitbook/assets/Screen Shot 2022-03-09 at 11.33.40 AM.png>)

### **E) Clone remaining "Install Helper" scenarios**

1. Clone "WAQM-Config-Receiver" scenario:
   * During the Scenario clone, **ADD** a **new Webhook** using:
     1. &#x20;Use this naming convention for the Added Webhook: TMP-WAQM-Config-Receiver (version) (client name)
     2. And, select this Data Structure for the Webhook from the Advanced menu:  WAQM Config-v0.7 (client name)
     3. SAVE
   * During the Scenario clone, **ADD** a **new datastore** using:
     1. Use this naming convention for the Added Datastore: WAQM-Config (version) (client name)
     2. And, select this Data Structure for the Datastore from the Advanced menu:  WAQM Config-v0.7 (client name)
     3. Ensure size is 1MB
     4. SAVE
2. Clone "WAQM QBO Mapping Queries - Load WAQM Mapping Master \[QBO clients only]
   * During the Scenario clone, use these Connections:
     1. A new Google connection for yourself (or the owner of the Mapping Sheet)
     2. Choose the existing WA and QBO connections created in step B
3. Move scenarios into Helper-Install folder
4. Doublecheck and confirm that any Webhooks are turned "ON".

![Creating a Webhook during Config Receiver scenario cloning](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.15.36 PM.png>) ![Creating a datastore during Config Receiver scenario cloning](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.16.17 PM.png>)

![If steps were followed, only a new Google connection should be needed](<../.gitbook/assets/Screen Shot 2022-03-10 at 10.59.11 AM.png>)

### **F) Create a sample Config record in Client's Team**

These steps copy a config record from NPC's master data store and send to the Client's Team.  This "initial" record can be used as a starting point.   Alternately, this step can be skipped and a new record may be created in the Client's Team manually.

1. Go to the Client's Team
2. Go to Webhooks
3. Find the TMP-Config-Receiver  Webhook (from step D), and copy the URL exactly.
4. Go back to the WAQM-Operations Team and the Install Helper scenario folder. &#x20;
5. Find the Install Helper - "Send JSON to Client" scenario
6. Open the scenario.  In the 3rd module (Send JSON...) replace the URL with the one copied from the Webhook in the Client's Team. SAVE.
7. In the 1st module (Read WAQM Config...), make sure the listed Config Key matches the record you want to copy from the NPC Master data store. SAVE.
8. In that "Send JSON" scenario, click "Run Once".
9. Exit the scenario.  It is okay if the scenario is not saved as this change is done for every Client.
10. Go back to the Client's Team.
11. Open the WAQM Config Receiver scenario in Edit Mode and "Run once", then press "Process existing".
    * NOTE:  It is okay if a yellow warning appears in the second module regarding "not executing immediately.  This can be ignored.
12. Go to the DataStore and confirm the record was created



![Copying the URL from the Webhook inside the Client's team](<../.gitbook/assets/Screen Shot 2022-03-10 at 5.44.19 PM.png>)

![Setting the correct Webhook URL in the 3rd module](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.28.29 PM.png>)

![Example of where to find the Config Key for the desired record to copy from the NPC Master data store](<../.gitbook/assets/Screen Shot 2022-03-10 at 5.45.32 PM.png>)

![Setting proper Config Key in the 1st module](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.28.54 PM.png>)

### **G) Clone Released Core scenarios from NPC’s Released folder to the Client’s Team**&#x20;

_Only clone the Invoice, Payment, or Donation Core scenarios if that transaction type is in scope for the client._&#x20;

_NOTE:  Make sure previous connections are created (added) and data structures are cloned before proceeding.   Unexpected complications can occur if Connections are created later and manually switched inside the scenarios._

1. WAQM-Invoice-Core (latest version)&#x20;
2. WAQM-Payment-Core (latest version)&#x20;
3. WAQM-Donation-Core (latest version)&#x20;

NOTES:&#x20;

* Remember to pick the Client's Team as the Target
* In general most connections, data stores, and data structures should exist already. Select the existing items from the drop-downs during Clone.  However, the "Mailgun" connection will need to be duplicated for the first scenario.  Choose this duplicated connection for the following scenarios.
* Move Core scenarios to the Released folder

![During 1st Core scenario Clone, duplicate the Mailgun connection and select the existing items for other inputs.](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.33.14 PM (1).png>) ![For remaining Core scenario Clones, select the existing items for all inputs](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.36.55 PM.png>)



### **H) Clone Released QBO or QBD Txn scenario from NPC’s Released folder to the Client’s Team**&#x20;

_Each client only needs the QBO or the QBD Txn scenario._

1. WAQM-Txn-QBO (latest version) \[For QBO clients only] &#x20;
2. WAQM-Txn-QBD (latest version) \[For QBD clients only]  &#x20;

* NOTES: A new Webhook must be Added/Created during cloning using these steps:&#x20;
  1. Press Add to create a new webhook
  2. Use a name for the Webhook with the format:  WAQM-Txn-QBO(or QBD)-Payload Receiver (client name).
  3. In Advanced settings for the new Webhook, select the WAQM-Txn-Payload data structure.&#x20;
  4. After cloning, the URL from this Webhook must be copied and placed in each of the Core Scenarios in the corresponding "HTTP Send" module for either the QBD or QBO branch to the right of the scenario.  (Do not replace the URL in the "HTTP Send" module for checking Licenses.
* For the QBD Txn scenario, the WAQM-QBD-IIF-TMP datastore should be duplicated during the Clone process.
* For QBD clients, update the Duplicated IIF Data Store and the IIF Data Structure to include the client's name.
* Move Txn scenario to the Released folder
* Doublecheck and confirm that any Webhooks are turned "ON".

![Creating Webhook as part of Txn scenario](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.48.18 PM.png>)

![Webhook for the Txn scenario. A client will have either the QBO or the QBD Scenario/Webhook.](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.56.02 PM.png>) ![Insert the copied URL into the appropriate module for all Core scenarios.](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.56.55 PM.png>)



![Add Client name to the IIF Data Structure and Data Store](<../.gitbook/assets/Screen Shot 2022-03-10 at 7.33.57 PM.png>)

### **I) Clone any remaining Helper scenarios**

_Look in the Helpers-Support folder.  These may be helpful during testing._

_Move these Helper scenarios to the appropriate "Support" folder._

### **J) If not done already, complete the Mapping document with the Client**

For QBO clients, this may require using this scenario to find the QBO IDs needed to complete the mapping:   "WAQM QBO Mapping Queries - Load WAQM Mapping Master"

_NOTE: Remember to update the Google Sheet references in this scenario to match the Google Mapping Document for this specific client._

### **K) Configure the Data Store record using the Client's input from the Mapping document**

Consider using the "BackUp Record" helper scenario before starting and after major changes.  You may need to update the first module of the "BackUp Record" scenario to reference the correct datastore record inside the client's environment.

Use a naming convention for the Record Name that includes the word "USE" to clarify which record for the client is the current active record that should be used.

When the config record is complete, copy the Config Key for that "USE" record.

![When complete, copy the Config Key for the data store record](<../.gitbook/assets/Screen Shot 2022-03-10 at 7.29.59 PM.png>)

### **L) Update Core scenarios to use the Config Key from the "USE" record**

In the first module of each Core scenario, change the Config Key to match the "USE" record from the previous step.

![Insert the copied Config Key into the 1st module of each Core scenario](<../.gitbook/assets/Screen Shot 2022-03-10 at 7.27.39 PM.png>)

### **M) Scenario updates if needed (rare)**

For QBD clients, "box" is the configured data storage software.  Not all clients use "box".  If a client uses a different data storage software a minor update will be needed.  Consult Product/Development for assistance.

### **N) Work with Client to test the scenarios for specific date ranges using the Manual scheduling options**

This may require several iterations to uncover any errors from the Mapping document or from the data entry into the data store. &#x20;

As a recommendation, ask the client for a date range that includes multiple transactions across the different types of Wild Apricot activity (e.g. Membership, Events, Manual, etc.)

As part of the testing, train the Client on how they can interpret the automated messages that come out of WAQM. &#x20;

For QBD clients, make sure they know how ti import an IIF fiel and how to find any error files generated during the IIF process.

Get confirmation from the Client that testing is complete and they are ready to turn it "on".

### **O) Optional - some clients may request a manual run to process historic transactions**

If a Client wants this, confirm the dates and help to run the scenarios manually.

If this will be a very large number of documents, a higher than normal number of operations may be consumed.  (In the new Make process, this will be paid through the NPC account.  This may require notification to the Admin in case NPC will need additional "operations" for the current month.)

### **P) When testing is complete, set up the Auto-Schedule options**

Confirm the start date and other scheduling options from the Mapping document.  &#x20;

Set up the auto schedule and turn on the scenarios

Set a calendar reminder for yourself to check and make sure the runs are processing on the expected schedules.

### ****
