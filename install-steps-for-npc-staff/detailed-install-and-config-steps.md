# Detailed Install Steps

These are the detailed steps to install the components of WAQM into a new client's Integromat instance.   An overview of the installation process is described on this page.   [WAQM Installation Overview](../waqm-overview-1/waqm-installation-overview.md)

### **A) Clone Data Structures** ([https://www.integromat.com/udts/197209](https://www.integromat.com/udts/197209)):&#x20;

_From the NPC Integromat organization, clone each Data Structure below to the client’s organization (the target). Update the name, select the client’s org as the target. Update the name to include the client's name and the data structure version number._&#x20;

1. WAQM Config&#x20;
2. WAQM-QBD-Txn-IIF\_RAW (required for QBD clients only)&#x20;
3. WAQM-Txn-Line&#x20;
4. WAQM-Txn
5. WAQM-Txn-Payload
6. WAQM QB Tax Code&#x20;
7. WAQM QBO Cust ID
8. WA-QB-Invoice-IIF\_TRNS (optional-documentation of IIF structure for QBD clients)&#x20;
9. WA-QB-Invoice-IIF\_SPL (optional-documentation of structure for QBD clients)&#x20;

![Cloning a Data Structure](<../.gitbook/assets/Screen Shot 2022-01-20 at 1.41.45 PM.png>)

### **B) Create new Data Stores** ([https://www.integromat.com/datastores/](https://www.integromat.com/datastores/)): &#x20;

_From the client’s Integromat organization, create the 2 Data Stores shown below. Name the Data Stores, select the corresponding Data Structure, and specify the storage size.   For the name, include the clients name and the version of the corresponding data structure._

1. WAQM-Config (Use the WAQM-Config Data Structure. Use the minimum storage capacity =1 MB.)&#x20;
2. WAQM-QBD-IIF-TMP (Use the WAQM-QBD-Txn-IIF\_RAW data structure. The storage capacity may need to vary depending on the number of records. 1-2 MB should be sufficient.)

![](https://lh3.googleusercontent.com/ZhCx3h7C37GdC\_rzEB1b5Ulu\_yDAPUbhzC0a-enmBuVEMXFqWUd\_QP7UwQZZKyNETM9xua3ui7\_UCi4DbqzDW0NrQVkIP9lk8tn0ry\_O9yzD1FHJ9kdgKcb2HniXVjmCcs1Dxlrb)

### **C) Create a record in the new Config Data Store for the client**: &#x20;

_Wild Apricot Quickbooks Manager cannot be tested until the configuration is complete. Option 2 (copying from previous NPC config record) is recommended to provide a starting point for configuring WAQM to a client’s needs. Before copying, ensure there is no confidential information from a different client in the config record._&#x20;

#### **C-1:  Option 1 - manual record creation:** &#x20;

Go to the Data Store, Browse, Add record, enter config details, and Save.&#x20;

1. Reference a record in NPC’s organization.&#x20;
2. Manually add a record and configure per the client’s needs. Reference client’s mapping sheet and the Data Store Config section of this document for guidance.

![](https://lh4.googleusercontent.com/-\_wOzPznXps7pE5zajKu2wV8afT9wg-vYYaK3R-KcRvdE1z83iAGPDrfzlCzDqPCh1mrouVdixtGPZ5S6ByCpuEqtcd3EsRjg0u9FNWPDnuzwSRdG8t6kUmo4-JacVVYhRxu7-75)

#### **C-2:  Option 2 - "copy" from a previous config record in NPC Lab:** (see diagram for pictorial representation)

![](<../.gitbook/assets/Config copy data flow diagram.png>)



1. In the originating Integromat Organization (NPC Lab), clone this scenario to the target organization: WAQM-DS-Config-Webhook. During the clone process, check these configurations:&#x20;
   1. Add a new Webhook connection (choose any name as this a Temporary connection that is not needed after the config is copied)&#x20;
   2.  Ensure the Config Data Store module points to the newly created Config Data Store in the target (the client's) organization.

       &#x20;        &#x20;
2. From the cloned scenario inside the target (the client's) organization, go to the Webhook module and click "redetermine data structure".
3. In the same Webhook module, copy the URL address from the Webhook module. This will be used back in the originating organization.  You may use the "copy address to clipboard" button.
4. Save and turn on the cloned Webhook scenario in the target (the client's organization).
5. Keep the window open that has the client's Webhook scenario and stay inside Edit mode.
6. Open a new window (or tab) and go back to the NPC Lab Integromat Organization.
7. Save and turn on the cloned Webhook scenario in the target (the client's organization).
8. In the originating Integromat organization (NPC Lab), check the config of the scenario: WAQM-DS-Config-SendJSON&#x20;
   1. Check the URL in the HTTP request module (from step 3 above). Ensure it matches the URL copied from the Cloned scenario inside the target organization.
   2. Go into the NPC organization’s WAQM Data Store and confirm which record will be copied to the client. Copy the key for the record.
   3. Ensure the “key” in the first Data Store module inside the SendJSON scenario corresponds to the proper config key selected.
9. Run the SendJSON scenario in the originating org (NPC Lab): WAQM-DS-Config-SendJSON&#x20;
10. In the target (the client's) organization, confirm that the Webhook module inside the Webhook scenario indicates that the data structure is now determined successfully.   Save the scenario.
11. Go back to the NPC Lab Integromat Organization.  Run the same SendJSON scenario a 2nd time.
12. Go back to the client's Integromat organization.  Confirm that the record was created in the client's Data Store in the target organization.&#x20;
13. Edit the newly created Config record in the Target Organization as needed to match the clients needs as defined in the mapping guide.&#x20;
14. The Webhook Scenario may be turned "off" and deleted inside the Target Organization after the Config record is created.

![](https://lh5.googleusercontent.com/5p9AOFM-LBKwCthEdw3RXNtXGsZtaoGVvVC3GRcZDfOlbB\_nwwmXE89L7tQ3GSqQ\_EciiKkPCAPaM\_q-y\_JKcoJv0awzttz021QDsl54lJa-eh1jmd3m9M83TEgC3wbNDWz8mKoG)

![](https://lh4.googleusercontent.com/A7xI9Af5rxPTT1JmlY3zpWoPxJ6\_Bx16yvnS3JE7I6AMvrVclRawPWmZVc69XCviCsHJ\_rdyROoaEJFBRxWq8uhUsyGu6U4LBpty2yNL57LBhvOVyQ8gzxR305cts3MbWWYbt8PT)

![](https://lh6.googleusercontent.com/-IOPlCsviAkPppCfl3kqWR8tUcEN61uTchUzjoHHF9EzptZ8rNi1QX4IRfOvQ35T4XES17GzkByeCwi2K4kIe3leG96RZ1KVNbnoxyqlE0zcIsivJBX3zTtetB2V8KTW3qaFfgmn)

![](https://lh6.googleusercontent.com/65LTfynjOVBTC8wmUUHVFSEHY4O3O5ZjWJgQrY7qEbPnFCt810JH3wZuN80ae2zprGndO\_5z\_e2ahGYWVIEvRECtGkhwI9ghBzBPz3504WmnNKUyNS\_cJcBRUJICvbOStRbtiOqp)

![](https://lh4.googleusercontent.com/5GMRsEmqx44v1x2Lk1xcF8t3m\_Gm9IpAmR51-Vgju3sGPxdndyxl0GrVP2E6S94TG\_OuRxMYYTHsnxAXmnQtOUhijA70g\_j6XnFPS6nMXP-wq74QpboYW22VkwlYFLX4skKZPZtq)

### **D) Clone scenarios from NPC’s organization to the client’s organization**&#x20;

NOTE:  Only clone the Invoice, Payment, or Donation Core scenarios if that transaction type is in scope for the client. Each client only needs the QBO or the QBD Txn scenario.

1. WAQM-Invoice-Core (latest version)&#x20;
2. WAQM-Payment-Core (latest version)&#x20;
3. WAQM-Donation-Core (latest version)&#x20;
4. WAQM-Txn-QBO (latest version) \[For QBO clients only]
5. WAQM-Txn-QBD (latest version) \[For QBD clients only]
6. WAQM-Config-BackupRecord (used for maintenance purposes)     &#x20;

IMPORTANT NOTE: During the clone process, you will be asked to update the connections, webhooks, and data stores. If the connections are new, login information may be needed to complete the clone process.&#x20;

![](https://lh4.googleusercontent.com/5GMRsEmqx44v1x2Lk1xcF8t3m\_Gm9IpAmR51-Vgju3sGPxdndyxl0GrVP2E6S94TG\_OuRxMYYTHsnxAXmnQtOUhijA70g\_j6XnFPS6nMXP-wq74QpboYW22VkwlYFLX4skKZPZtq)

If the scenarios in this section use _**webhooks**_, a new webhook must be created inside the client's account as part of the cloning process.  See the next section for detailed instructions about Webhooks and the corresponding HTTP Send modules inside the scenarios.

### **E) Create webhook and update the HTTP Send URL**&#x20;

The webhook allows information from the Core scenario to be passed to a secondary Txn (transaction) scenario.   (See the screenshot for an example.)&#x20;

* Give the webhook a name that includes the client name, scenario reference and data structure version number.  &#x20;
* Choose the appropriate data structure.  Use the table below to understand which scenarios and data structures are related.

| Scenario Containing a Webhook | Data Structure to use | Recommended Webhook Name              | Scenario with corresponding HTTP Send                               |
| ----------------------------- | --------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| WAQM-Txn-QBO                  | WAQM-Txn-Payload      | WAQM-QBO-Payload-\[version]-\[client] | <p>WAQM-Invoice-Core<br>WAQM-Donation-Core<br>WAQM-Payment-Core</p> |
| WAQM-Txn-QBD                  | WAQM-Txn-Payload      | WAQM-QBD-Payload-\[version]-\[client] | <p>WAQM-Invoice-Core<br>WAQM-Donation-Core<br>WAQM-Payment-Core</p> |

![](<../.gitbook/assets/QBO scenario linkage v0.6.1.png>)

![Creating a new Webhook during the Cloning process](<../.gitbook/assets/Screen Shot 2021-06-14 at 10.27.02 AM.png>)

After the Webhook is created, the URL from the Webhook must be copied and then pasted to the HTTP Send module of the corresponding scenarios.  Follow steps and see the screenshots for an example.

1. Open the scenario that includes the Webhook
2. Open the first module, which is the Webhook module
3. Copy the URL using the "copy address to clipboard" button \[do not ave any changes]
4. Close the scenario
5. Open the corresponding "Core" scenario
6. Find the HTTP Make a Request module with the corresponding QBO or QBD Txn name.  It is usually to the far right of the scenario.
7. Open the HTTP Make a Request module
8. Paste the URL from the webhook into the URL field inside the HTTP Make a Request module
9. Press OK and Save the scenario
10. Repeat steps 5-9 for the remaining Core scenarios.

NOTE: This process is expected to work as-is.  Sometimes the Webhook must be "trained" to recognize the data structure.  This Integromat article describes the process.  [https://support.integromat.com/hc/en-us/articles/360006249313-Webhooks](https://support.integromat.com/hc/en-us/articles/360006249313-Webhooks).

![](<../.gitbook/assets/Screen Shot 2021-06-15 at 9.09.58 AM.png>)

![](<../.gitbook/assets/Screen Shot 2021-06-15 at 9.09.07 AM.png>)

****

### **F) Update the scenarios to work for the client’s environment:**&#x20;

1. Ensure the Configuration record key in the 1st module of all Core scenarios matches the proper record from the Config Data Store  See the screenshot for an example.
2. Ensure any test filters are removed from all scenarios.  They will typically be labeled "filter for testing purposes" or similar. &#x20;
   1. If the icon next to that filter is a "funnel", there are filter criteria that need to be deleted. &#x20;
   2. If there is not a "funnel" icon, there is not filter in place and the "test" label is for future use only.  No change needed.
3. For QBD clients, Output modules for Box, DropBox, etc. (folder, filename format, etc.) need to be configured.
   1. Box folder paths must be manually selected after cloning; they cannot be configured through the Data Store.&#x20;
   2. If a storage service is not used, it may need to be deleted from the cloned scenario to prevent warnings.
4. Ensure all scenarios are saved and turned on.  If Scheduled settings are used, ensure the Core Scenarios are Scheduled per the instructions in the [WAQM Configuration Guide scheduling section](broken-reference).
   1. Run scenario = every day
   2. Start time matches the configured record for the transaction type.

![](<../.gitbook/assets/Screen Shot 2021-06-15 at 8.35.51 AM.png>)
