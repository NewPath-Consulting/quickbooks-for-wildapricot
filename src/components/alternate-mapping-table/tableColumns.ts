import {Tab} from "bootstrap";

export interface TableColumn {
  id: string,
  header: string,
  type: string,
  key: string,
  options ?: string,
  disabled?: boolean,
  disableUsed?: boolean
}

export interface TableColumns {
  membershipLevels: TableColumn[],
  events: TableColumn[],
  onlineStore: TableColumn[],
  classes: TableColumn[],
  payment: TableColumn[],
  donations: TableColumn[]
}

export const tableColumns: TableColumns = {
  membershipLevels: [
    {
      id: 'wa',
      header: 'Membership Level',
      type: 'select',
      key: 'WAFieldName',
      options: 'membershipLevels', // Your WA options
      disableUsed: true
    },
    {
      id: 'qb',
      header: 'QB Product',
      type: 'select',
      key: 'QBProductId',
      options: 'products' // Your QB options
    },
    {
      id: 'income',
      header: 'Income Account',
      type: 'input',
      key: 'IncomeAccount',
      disabled: true
    }
  ],
  events: [
    {
      id: 'wa',
      header: 'Event Tags',
      type: 'select',
      key: 'WAFieldName',
      options: 'eventTags', // Your WA options
      disableUsed: true
    },
    {
      id: 'qb',
      header: 'QB Product',
      type: 'select',
      key: 'QBProductId',
      options: 'products' // Your QB options
    },
    {
      id: 'income',
      header: 'Income Account',
      type: 'input',
      key: 'IncomeAccount',
      disabled: true
    }
  ],
  onlineStore: [
    {
      id: 'wa',
      header: 'Product Tags',
      type: 'select',
      key: 'WAFieldName',
      options: 'productTags', // Your WA options
      disableUsed: true
    },
    {
      id: 'qb',
      header: 'QB Product',
      type: 'select',
      key: 'QBProductId',
      options: 'products' // Your QB options
    },
    {
      id: 'income',
      header: 'Income Account',
      type: 'input',
      key: 'IncomeAccount',
      disabled: true
    }
  ],
  classes: [
    {
      id: 'class',
      header: 'Class',
      type: 'select',
      key: 'classId',
      options: 'classes'
    }
  ],
  payment: [
    {
      id: 'wa',
      header: 'WA Tender',
      type: 'select',
      key: 'WATender',
      options: 'WildApricotTenders', // Your WA options
      disableUsed: true
    },
    {
      id: 'qb',
      header: 'QB Tender',
      type: 'select',
      key: 'QBTenderId',
      options: 'qbPaymentMethods' // Your QB options
    }
  ],
  donations: [
    {
      id: 'wa',
      header: 'Campaign Name',
      type: 'select',
      key: 'WAFieldName',
      options: 'campaignOptions', // Your WA options,
      disableUsed: true
    },
    {
      id: 'deposit',
      header: 'Deposit Account',
      type: 'select',
      key: 'depositAccountId',
      options: 'accountList' // Your QB options
    },
    {
      id: 'qb',
      header: 'QB Product',
      type: 'select',
      key: 'QBProductId',
      options: 'products' // Your QB options
    },
    {
      id: 'income',
      header: 'Income Account',
      type: 'input',
      key: 'IncomeAccount',
      disabled: true
    }
  ]
}