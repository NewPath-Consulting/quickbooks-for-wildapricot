# Detailed Install Steps (Migrate to New Make.com Org)

These are the detailed steps to install the components of WAQM into a new Make.com Org using the Migrate tool to transfer components from NPC's Make.com instance.  &#x20;

This is still considered DRAFT, especially the potion for manually importing the QBD scenario.

### **A) Validate Admin access to  "WAQM Ops" Make.com Org**

Make.com's migration tool allows easy migration of scenarios and all related objects (connections, data structures, webhooks. datastores, etc.) from one Make.com Org to another Make.com Org as long as they are in different data regions.  (US or EU)

Currently, NPC clients are in the US data region for Make.com. (North America)  A replica of the released WAQM components exists in an EU region Ops Org for purposes of the following install process.   The exception is the QBD Transaction (Txn) scenario.  This is described further in these instructions.

**The NPC Installers need admin access to this separate Make.com Ops Org.**

If a future client exists in the Make.com EU region, the following process can be done directly from NPC's US data region Org and the WAQM Operations Team.   See notes about how the QBD Transaction (Txn) scenario will be different in this case.

### **B) Validate Admin access and Teams in Client's Make.com instance**

To complete the install process and to support testing, the client must invite the installer to be an Admin.

1. Accept invitation and confirm ability to access
2. Validate subscription level (Most client's will be okay using the 10k operations per month and the Core level.  During initial install and testing, extra operations may need to be purchased.)
3. Validate whether Teams level is used.  This is unlikely for most clients.  If yes, ask client if a new Team should be setup for the WAQM components. &#x20;
4. If needed Create a new Team in client's Make.com account.  Use the Format QBWA-\<client name>

### **C) "Fast Migrate" Create-Test connection scenarios**

For this first step, only the "Create-Test connection" scenarios are "Fast Migrated" so that the client can establish connections to their accounts.   After the client completes the connections the remaining steps will be completed, choosing the new connections as part of the Manual Migration process.

1. Initiate the Migration utility by going to this URL:  https://migrate.make.com
2. In the migration utility go to step 2 "Sign into accounts"  (Source and Target)
   1. For Source, select Make and Sign In (with your login that has admin access to the NPC Org or the NPC replica in the EU data region)
   2. For Target, select Make and Sign In (with your login that has access to the Client's NPC Org.
   3. NOTE:  Typically, the NPC installer's login should have access to both the Source and Target accounts.
3. Continue to step 2.1 in the migration utility "Teams and organizations"&#x20;
   1. If the client is in the US:
      1. For Source, select the org "WAQM Operations Core + QBO" and "My Team" \[this is in the EU region]
      2. For the Target, select the client's org and team.
   2. If the client is in the EU:
      1. For Source, select the org "NewPath Consulting" and Team "WAQM Operations" \[this is in the US region]
      2. For the Target, select the client's org and team.
4. Continue to step 3.3 (data selection) Scenarios
   1. This screen lists all the possible scenarios to migrate, organized by folder.
   2. Scroll down and SELECT ONLY the 4 "Create-Test Connection..." scenarios (WA, QBO, box, Google Sheet)
   3. NOTE:  QBO clients will not need the box connection/scenario.  QBD clients will not need the QBO connection/scenario.
   4. Before proceeding, ensure that ONLY the connection scenarios are selected.&#x20;
   5. Click on Fast Migration on the bottom right
5. The migration screen should move you to step 4 "Migration Settings.  Click on "Start Migration"
6. You should see the progress of the migration proceed to 100%. &#x20;
7. When done, you should see a "Go to target" button on the bottom right.  Click on this to open Make.com in the Target Org (the Client's Org)
8. Edit the scenario names to use the client's short name

### D) Create connections in the Client's Org (and clean up any migrated connections)

In this phase, the NPC lead will work with the client to create and test each of the required connections.    Normally, this is best done together with the client on a call, with the NPC lead giving guidance.  &#x20;

BEFORE meeting with the client, update the Google Sheet connection to use the NPC Focal's Google Sheet connection that works with the MappingGuide for this Client.  NOTE: It is possible to also use the client's&#x20;

**"Google Sheet" connection (in Make.com):**

1. Navigate to the "WAQM-Helpers-Install" folder inside the client's Make.com instance and the "Create-Test Google Sheets Connection" scenario
2. Go into Edit mode
3. Click on the first module
4. In the connection box, click "Add"
5. Choose a name such as "WAQM-GoogleSheet-Mapping \<NPC Focal Name>"
6. Click Save for the Connection
7. If you have multiple Google accounts, it will ask to choose the proper account.  Use the one that has access to the WAQM (QBWA) Mapping Guide.
8. Enter the password for the chosen account and then press Next
9. On the next screen, confirm and press "Allow"
10. If the connection is successful, it should take you back to the Module.  Press OK.
11. Reopen the same Module and select the proper Mapping spreadsheet that is being used with this Client.  Press OK.
12. Save the scenario (disk icon on lower left)
13. Click on "Run Once"
14. If successful, the module name should turn green and a small "1" should appear to the upper right of the module.   Clicking on the number "1" will show the sheets in the Mapping Guide.
15. Click Save and exit the scenario.

**AFTER the Google Sheet connection**, proceed to meet with the Client for the other connections.

1. Get on a Zoom call with the client.  Ensure the person with access to Make.com and to the needed accounts is on the call.  &#x20;
   1. QBO clients:   WA access and QBO access
   2. QBD clients:  WA access and "box" access (NOTE: some clients may  use an alternative to "box".  If true, you will need to circle back with client when the scenarios are ready for the client's login.    The default scenarios will be modified to use services other than box.
2. Ask the client to share their desktop so that you can help them navigate.  NOTE:  Sharing the desktop is easier than sharing a specific window/application as a number of the connection steps involve pop-up windows.&#x20;
3. Wild Apricot App authorization:
   1. Start by asking the client to login to Wild Apricot
   2. Go to WA Settings and then select Authorized applications
   3. Click on Authorize application
   4. Choose a name for the application:  WAQM NPC
   5. Select  Full Access
   6. Copy the API Key (it will be used inside Make.com)
   7. Click Save
4. Wild Apricot connection inside Make.com:
   1. Ask the client to login to Make.com
   2. Navigate to the "WAQM-Helpers-Install" folder and the "Create-Test WA Connection" scenario
   3. Go into Edit mode
   4. Click on the first module
   5. In the connection box, click "Add"
   6. Choose a name such as "WA \<client>"
   7. Paste the API Key from the previous section
   8. Click Save for the new connection (there is a chance the authorization may ask the user to login to validate)
   9. Click OK for the module and then Save the scenario (disk icon on lower left)
   10. Click on "Run Once"
   11. If successful, the module name should turn green and a small "1" should appear to the upper right of the module.   Clicking on the number "1" should show details about the Client's WA org.
   12. Click Save and exit the scenario.
5. QBO connection: (for QBO clients only)
   1. Navigate to the "WAQM-Helpers-Install" folder and the "Create-Test QBO Connection" scenario
   2. Go into Edit mode
   3. Click on the first module
   4. In the connection box, click "Add"
   5. Choose a name such as "QBO \<client>"
   6. Click Save for the Connection
   7. A new window will pop-up asking for the QBO login information.  Enter the username and password and click "Sign In"
   8. If the user has access to multiple companies, a new window may come up asking the user to confirm which company should be connected to Make.com.   Select the company and click Next
   9. On the next screen, confirm and press "Connect"
   10. NOTE:  The QBO connection can be temperamental.   If an error appears, try again to Add a new connection (with a slightly different name, so that you can clean up the bad connection later).
   11. If the connection is successful, it should take you back to the Module.  Press OK.
   12. Save the scenario (disk icon on lower left)
   13. Click on "Run Once"
   14. If successful, the module name should turn green and a small "1" should appear to the upper right of the module.   Clicking on the number "1" may show details about an Invoice or may show nothing if there are no recent Invoices.  It is okay if no Invoices are found during this connection step.
   15. Click Save and exit the scenario.
6. "box" connection: (for QBD clients only)
   1. Navigate to the "WAQM-Helpers-Install" folder and the "Create-Test box Connection" scenario
   2. Go into Edit mode
   3. Click on the first module
   4. In the connection box, click "Add"
   5. Choose a name such as "box \<client>"
   6. Click Save for the Connection
   7. A new window will pop-up asking for the "box" login information.  Enter the username and password and click "Sign In"
   8. On the next screen, confirm and press "Grant access to box"
   9. If the connection is successful, it should take you back to the Module.  Press OK.
   10. Save the scenario (disk icon on lower left)
   11. Click on "Run Once"
   12. If successful, the module name should turn green and a small "1" should appear to the upper right of the module.   Clicking on the number "1" will typically show 0 bundles in the output.  It is okay if no output is found during this connection step.
   13. Click Save and exit the scenario.
7. Complete any other discussion with the Client and complete the following steps after the call.
8. Clean up unneeded Connections inside Make.com:
   1. Go into the Client's Org in Make.com and look at the Connections.  Determine if there were any connections that were created as part of the migration process (without the client's name)
   2. Delete those connections.   If a pop-up shows that a scenario will stop working if the connection is deleted, DO NOT PROCEED.   Make sure you are deleting the correct connection.
   3. You may also delete any extra "bad" connections that were created with the client.    (e.g. any unsuccessful QBO connections)  Be careful not to delete any other connections if the Client uses Make.com for non-WAQM purposes.

### E) "Manual Migrate" Core/Helper/QBO scenarios

This phase is where most of the "cloning" (old terminology) occurs.   Be careful during the "MANUAL MIGRATION" to select the proper options.

1. Initiate the Migration utility by going to this URL:  https://migrate.make.com
2. In the migration utility go to step 2 "Sign into accounts"  (Source and Target)
   1. For Source, select Make and Sign In (with your login that has admin access to the NPC Org or the NPC replica in the EU data region)
   2. For Target, select Make and Sign In (with your login that has access to the Client's Org)
   3. NOTE:  The NPC installer's login must have access to both the Source and Target accounts.
3. Continue to step 2.1 in the migration utility "Teams and organizations"&#x20;
   1. If the client is in the US:
      1. For Source, select the org "WAQM Operations Core + QBO" and "My Team" \[this is in the EU region]
      2. For the Target, select the client's org and team.
   2. If the client is in the EU:
      1. For Source, select the org "NewPath Consulting" and Team "WAQM Operations" \[this is in the US region]
      2. For the Target, select the client's org and team.
4. Continue to step 3.3 (data selection) Scenarios
   1. This screen lists all the possible scenarios to migrate, organized by folder.
   2. Scroll down to the folder "WAQM\_Released" and click the "select folder" checkbox to the right.   This should select all of the scenarios inside this folder.&#x20;
      1. NOTE:  QBD clients will not need the WAQM-Txn-QBO scenario.
      2. NOTE: Go ahead and select all of the Core scenarios, even if they currently do not have the transaction type in scope.
   3. Scroll down to the folder "WAQM-Helpers-Support" and click the "select folder" checkbox to the right.   This should select all of the scenarios inside this folder.&#x20;
      1. NOTE: QBD clients will not need the Quickbooks QBO related helpers.  You may unselect these QBO scenarios.
   4. Scroll down to the folder "WAQM-Helpers-Install" and click the "select folder" checkbox to the right.   This should select all of the scenarios inside this folder. &#x20;
      1. For QB Online clients UNSELECT these scenarios (do NOTE migrate them)
         1. UNSELECT the "WAQM-DS-Config-SendJSON... \[do not clone]" scenario
         2. UNSELECT the "WAQM-Migrate-IIF-TMP-RAW Data Structure" scenario
         3. UNSELECT the "Create-Test box Connection (Client Name)" scenario
   5. Before proceeding, ensure that ONLY the proper scenarios are selected.&#x20;
   6. DO NOT PRESS "Fast Migration"
   7. Click on Manual Migration on the bottom right
5. The migration screen should move you to step 3.4 "Data Selection" - Webhooks
   1. For each Webhook, choose:  "Duplicate Webhook"  \[NOT "duplicate webhook and forward"]
   2. Click Next on the bottom right
6. The migration screen should move you to step 3.4 "Data Selection" - Connections
   1. For the NPC Mailgun connection, choose "duplicate connection"
   2. For the other connections, choose to "replace with...\<connection created with the client for each application>
   3. Click Next on the bottom right
7. The migration screen should move you to step 3.4 "Data Selection" - Data Stores
   1. For the DataStore, choose:  "Duplicate Data store and migrate contents"
   2. Click Next on the bottom right
8. The migration screen should move you to step 3.4 "Data Selection" - Data Structures
   1. For each Data Structure, choose:  "Duplicate data structure"&#x20;
   2. Make sure you scroll to the bottom and verify all Data Structures
   3. Click Next on the bottom right
9. The migration screen should move you to step 3.4 "Data Selection" - Folders
   1. For each folder, choose:  "previously migrated folder..." if it exists
   2. Otherwise choose:  Duplicate folder
   3. Click Next on the bottom right
10. The migration screen should move you to step 4.1 "Migration Settings"
    1. Source:  Choose: No (disable all scenarios)
    2. Target: Choose: No (activate all scenarios)
    3. Click Next on the bottom right
11. The migration screen should move you to step 4.2 Migration Settings.    Press the "Start migration" button
12. You should see the progress of the migration proceed to 100%. &#x20;
13. When done, you should see a "Go to target" button on the bottom right.  Click on this to open Make.com in the Target Org (the Client's Org)
14. Edit all objects to use the Client's actual short name instead of a generic "Client Name": scenarios, connections, webhooks, datastores, data structures
15. NOTE:  There is a current Make.com bug that must be checked.   When scenarios with QBO modules are installed/migrated, the connection to the clients QBO account are not properly set and saved to the scenario during install.   Every single QBO module must be manually checked.   QBO exists in the Txn scenario in the Released folder and in multiple scenarios across the Helper folders.  For each module, check these items:
    1. The connection must be set to the client's QBO connection
    2. Once the connection is set and the fields reload, check every field in the module to make sure the logic is accurate.  Often, any array field or field with a drop-down choice, must be marked as "mapped" and the logic from the source system must be recopied. &#x20;
    3. Save the module changes (and then save the scenario).



_Screenshots of various steps in the Manual Migration process:_

![](<../.gitbook/assets/Screen Shot 2022-04-21 at 3.52.53 PM.png>) ![](<../.gitbook/assets/Screen Shot 2022-04-21 at 3.53.32 PM.png>) ![](<../.gitbook/assets/Screen Shot 2022-04-21 at 3.54.19 PM.png>) ![](<../.gitbook/assets/Screen Shot 2022-04-21 at 3.57.59 PM.png>) ![](<../.gitbook/assets/Screen Shot 2022-04-21 at 4.00.13 PM.png>) ![](<../.gitbook/assets/Screen Shot 2022-04-21 at 4.02.50 PM.png>)



### F) Export / Import Txn-QBD scenario (if needed - for Quickbooks Desktop clients)

Because of limitations with Migrating from the EU region to the US region, the following steps are needed for a QBD client.

1. In the Target Client's Org, create the IIF TMP data store
   1. Go to data stores
   2. Click Add datastore
   3. Use this name:  WAQM-QBD-IIF-TMP-v0.7 (Client Name)
   4. Select this data structure:  WAQM-QBD-Txn-IIF\_RAW-v0.7 (Client Name)
   5. Select 1 MB as the size
   6. Save
2. Export from the NewPath Consulting Make.com Org:
   1. Go to the Make.com Org for NewPath Consulting and go to the WAQM Operations Team
   2. Go to the WAQM\_Released folder and find the "WAQM-Txn-QBD" scenario
   3. Open the scenario in Edit mode.
   4. Go to the More menu (3 dots - in the lower center) and click "export blueprint"
   5. This will place a "blueprint.json" file on your computer.  Make a note of the location.
   6. Exit the scenario and do not Save.
3. Create IIF TMP Data Store
   1. In the client's Make.com Org, go to Data Stores and select "Add Data Store"
   2. Use this name:  WAQM-QBD-IIF-TMP-v0.7 (Client Name)
   3. Choose this data structure: WAQM-QBD-Txn-IIF\_RAW-v0.7 (Client Name)
   4. Choose the size of: 1
   5. Save
4. Import to the Client's Make.com Org"
   1. Go to the Clients Org and open the WAQM\_Released scenario folder
   2. Click New scenario
   3. Go to the More menu (3 dots - in the lower center) and click "import blueprint"
   4. When prompted, click the "Choose file button".  Find the File and then click Save.
   5. The scenario should appear.
   6. Update the name of the scenario to:  WAQM-Txn-QBD (v0.7) (Client Name)
   7. Add a new QBD Txn Webhook:
      1. Open the first module with the webhook
      2. Click Add
      3. Use a name:   WAQM-Txn-QBD-Payload Receiver (v0.7) (Client Name)  &#x20;
      4. Select Advanced Settings
      5. Select the Data Structure of: WAQM-Txn-Payload-v0.7 (Client Name)
      6. Click Save
      7. If the module says "determining data structure" press Stop
      8. Click OK
   8. Update the Mailgun connection and fix mapping:
      1. Find the Red Mailgun module on the lower right and open it
      2. Select the previously duplicated NPC Mailgun connection
      3. Fix the mappings inside this Mailgun module for the specified fields.   Turn on the mapping switch for each field to "On".
         1. Domain name:    pick the "Mailgun Domain Name" field from the Selector for module 356 - Data Store - Get a record
         2. To (emails):   pick the entire array "To Email Addresses" field from the Selector for module 356 - Data Store - Get a record
         3. CC (emails):    pick the entire array "Bcc-Support Email Addresses" field from the Selector for module 356 - Data Store - Get a record
      4. Click OK
   9. Update the "box" connection
      1. Select the box module on the lower right and open it
      2. Selected the previously created box connection from the client
      3. Click OK
      4. NOTE: The listed "upload to folder" may not be correct.  This can be fixed later.
   10. Update Data Stores in all datastore modules.  &#x20;
       1. The blueprint import does not automatically connect to the proper datastores.  Manually select the name of the correct data store for each module.  &#x20;
       2. The first datastore should be for Config.  &#x20;
       3. The remaining datastores should be for QBD-IIF-TMP. &#x20;
       4. NOTE:  When opening the dropdown in each module, you will initially see 2 possible datastores.  Choose the second one that seems correct.   After saving this module and reopening, you will only see one option.  The "fake" option will be gone.
   11. Click Save and exit the scenario



### G) Update URL's in Core Scenarios to match new Txn Webhook(s)

This section connects the front end Core scenarios to the back-end Txn scenario(s).   Clients will only have 1 Txn scenario (for either Online or Desktop versions of Quickbooks).  For NPC internal testing, both Txn scenarios may exist. &#x20;

1. Go to the Client's Org
2. Get the Webhook URL for the Client's Txn scenario
   1. Find the Webhook that corresponds to their Txn scenario (QBO or QBD)
   2. Copy the URL for the Webhook
3. Update the URL in the Core scenarios
   1. Open the Invoice Core scenario in Edit mode
   2. Go to the right and find the HTTP Send Txn Payload module that corresponds to the Txn type (QBO or QBD).
   3. Open the module and replace the URL with the one from the Webhook
   4. Save
   5. Repeat for the Payment Scenario
   6. Repeat for the Donation sScenario
4. If this is an NPC situation with both QBO and QBD scenarios, repeat steps 2 and 3 for the 2nd Txn type and Webhook.

![Webhook for the Txn scenario. A client will have either the QBO or the QBD Scenario/Webhook.](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.56.02 PM.png>) ![Insert the copied URL into the appropriate module for all Core scenarios.](<../.gitbook/assets/Screen Shot 2022-03-10 at 6.56.55 PM.png>)



### H) Clean up Data Store of "excess records"

This migration process copies "all" sample records from the migration source.  Clean up records so that the client only has 1 sample record.  This eliminates confusion.

1. Open the Clients Config Data Store
2. Review the records and choose the one that should remain.
3. Delete the other records.



### **I) If not done already, complete the Mapping document with the Client**

For QBO clients, this may require using this scenario to find the QBO IDs needed to complete the mapping:   "WAQM QBO Mapping Queries - Load WAQM Mapping Master"

_NOTE: Remember to update the Google Sheet references in this scenario to match the Google Mapping Document for this specific client._

### **J) Configure the Data Store record using the Client's input from the Mapping document**

Consider using the "BackUp Record" helper scenario before starting and after major changes.  You may need to update the first module of the "BackUp Record" scenario to reference the correct datastore record inside the client's environment.

Use a naming convention for the Record Name that includes the word "USE" to clarify which record for the client is the current active record that should be used.

When the config record is complete, copy the Config Key for that "USE" record.

![When complete, copy the Config Key for the data store record](<../.gitbook/assets/Screen Shot 2022-03-10 at 7.29.59 PM.png>)

### **K) Update Core scenarios to use the Config Key from the "USE" record**

In the first module of each Core scenario, change the Config Key to match the "USE" record from the previous step.

![Insert the copied Config Key into the 1st module of each Core scenario](<../.gitbook/assets/Screen Shot 2022-03-10 at 7.27.39 PM.png>)

### **L) Scenario updates if needed (rare)**

For QBD clients, "box" is the configured data storage software.  Not all clients use "box".  If a client uses a different data storage software a minor update will be needed.  Consult Product/Development for assistance.

### **M) Work with Client to test the scenarios for specific date ranges using the Manual scheduling options**

This may require several iterations to uncover any errors from the Mapping document or from the data entry into the data store. &#x20;

As a recommendation, ask the client for a date range that includes multiple transactions across the different types of Wild Apricot activity (e.g. Membership, Events, Manual, etc.)

As part of the testing, train the Client on how they can interpret the automated messages that come out of WAQM. &#x20;

For QBD clients, make sure they know how ti import an IIF fiel and how to find any error files generated during the IIF process.

Get confirmation from the Client that testing is complete and they are ready to turn it "on".

### **N) Optional - some clients may request a manual run to process historic transactions**

If a Client wants this, confirm the dates and help to run the scenarios manually.

If this will be a very large number of documents, a higher than normal number of operations may be consumed.  (In the new Make process, this will be paid through the NPC account.  This may require notification to the Admin in case NPC will need additional "operations" for the current month.)

### **O) When testing is complete, set up the Auto-Schedule options**

Confirm the start date and other scheduling options from the Mapping document.  &#x20;

Set up the auto schedule and turn on the scenarios

Set a calendar reminder for yourself to check and make sure the runs are processing on the expected schedules.

### ****
