# IIF Specification and Notes

Types of IIF lines:

* !\_\_\_\_\_\_: defines the column (field) names for each corresponding row type.
* TRNS: The header for a transaction.
* SPL: The split/line items of a transaction. Line items may also be known as "distribution lines," indicating where components of the income or tax are recorded.  Each line can indicate a Sales Item, Tax line, or a Subtotal line.
* ENDTRNS:  Signifies the end of the transaction.

[This linked file provides the detailed specification of the QBWA IIF file format](https://docs.google.com/spreadsheets/d/18vK8\_vU73dCPdv\_N5dIm\_nNeW2npQZqTVkM8lhYtf0k/edit?usp=sharing), including headers, field names, field values, and line sequences.  The file includes sections for:

* General IIF format
* Invoice IIF File line definitions
* Invoice IIF US Tax line scenarios and sequences
* Donation IIF File line definitions

