# Wild Apricot Config Assumptions

The Member Level Name is used to drive mappings on all line items of a Membership Invoice. It is also possible to read the name of an Extra Cost field to overwrite the mapping of a specific line item on an invoice.

![](../.gitbook/assets/8.png)

**Events**

The Event “Tag” is used as the basis for mapping Event invoices

![](../.gitbook/assets/9.png)

**Online Store**

The design intent is to use Product “Tag” as the basis of mapping Online Store invoices. However, Wild Apricot has a current limitation where this Tag cannot be read through API or Integromat.  At this time, all Online Store items can only be mapped to a single Quickbooks Account, Item, and Class.

**Manual Item**

Manual invoices by nature do not provide any means for systemically mapping to accounts. The WAQM design allows for all “manual” items to be mapped to a specified general “manual” account in Quickbooks. It is recommended that the client plans to manually re-class these “manual” items.

**Sales Tax**

If used, the Sales Tax name and % must exactly match the Tax definition in WAQM. NOTE: WAQM currently reads the Tax Name. The Scenario can be customized to read the Tax ID.

![](../.gitbook/assets/10.png)

### 

