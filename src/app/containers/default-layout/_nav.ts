import { INavData } from "@coreui/angular";

export let navItemMenu: Object;
export let navItemsSuperAdmin: INavData[];
export let navItemsAdminIC: Object;
export let navItemsBranchIC: Object;
export let navItemsDistrictIC: Object;
export let navItemsBM: Object;
export let navItemsSASVAdmin: object;
export let navItemsSASVView: object;
export let navItemsSanctionAdmin: Object;
export let navItemsSanctionView: Object;

navItemMenu = {
  name: 'Menu',
  title: true
}
navItemsSuperAdmin = [
  {
    name: 'Menu',
    title: true
  },
  {
    name: 'Branch',
    url: '/branch',
    iconComponent: { name: 'cil-location-pin' },
    children: [
      // {
      //   name: 'Add Branch',
      //   url: '/branch/addBranch',
      // },
      {
        name: 'View Branch',
        url: '/branch/viewBranch',
      },
    ]
  },
  {
    name: 'District',
    url: '/district',
    iconComponent: { name: 'cil-institution' },
    children: [
      // {
      //   name: 'Add District',
      //   url: '/district/addDistrict',
      // },
      {
        name: 'View District',
        url: '/district/viewDistrict',
      },
    ]
  },
  {
    name: 'Division',
    url: '/division',
    iconComponent: { name: 'cil-sitemap' },
    children: [
      {
        name: 'Add Division',
        url: '/division/addDivison',
      },
      {
        name: 'View Division',
        url: '/division/viewDivision',
      },

    ]
  },
  {
    name: 'Module',
    url: '/module',
    iconComponent: { name: 'cil-layers' },
    children: [
      {
        name: 'Add Module',
        url: '/module/addModule'
      },
      {
        name: 'View Module',
        url: '/module/viewModule'
      },
    ]
  },
  {
    name: 'Employee',
    url: '/employee',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'Add Employee',
        url: '/employee/addEmployee'
      },
      {
        name: 'View Employee',
        url: '/employee/viewEmployee'
      },
    ]
  },
  {
    name: 'User',
    url: '/user',
    iconComponent: { name: 'cil-contact' },
    children: [
      {
        name: 'Add User',
        url: '/user/addUser'
      },
      {
        name: 'View User',
        url: '/user/viewAllUsers'
      },
    ]
  }
]
navItemsAdminIC = {
  name: 'Internal Control',
  url: '/IC',
  children: [
    {
      name: 'User',
      url: '/IC/user',
      iconComponent: { name: 'cil-user' },
      children: [
        {
          name: 'Add User',
          url: '/IC/user/addUser'
        },
        {
          name: 'View User',
          url: '/IC/user/viewICUsers'
        },
      ]
    },
    {
      name: 'CIPM',
      url: '/IC/CIPM',
      iconComponent: { name: 'cil-calendar-check' },
      children: [
        {
          name: 'View CIPM History',
          url: '/IC/CIPM/viewCIPM',
        },
        {
          name: 'Add Collateral Type',
          url: '/IC/CIPM/addCT',
        },
      ]
    },
    {
      name: 'Dishonoured Cheque',
      url: '/IC/Dcheque',
      iconComponent: { name: 'cil-ban' },
      children: [
        {
          name: 'View Dishonoured Cheque',
          url: '/IC/Dcheque/viewDcheque'
        },
      ]
    },
    {
      name: 'Incident Fraud Report',
      url: '/IC/Fraud',
      iconComponent: { name: 'cil-warning' },
      children: [
        {
          name: 'View Fraud Reports',
          url: '/IC/Fraud/viewFraud',
        },
        {
          name: 'NBE Fraud Summary',
          url: '/IC/Fraud/viewFraudForNBE',
        },
      ]
    },
  ]
}
navItemsBranchIC = {
  name: 'Internal Control',
  url: '/IC',
  children: [
    {
      name: 'CIPM',
      url: '/IC/CIPM',
      iconComponent: { name: 'cil-calendar-check' },
      children: [
        {
          name: 'Add CIPM Data',
          url: '/IC/CIPM/addCIPM',
        },
        {
          name: 'View CIPM History',
          url: '/IC/CIPM/viewCIPM',
        },
      ]
    },
    {
      name: 'Dishonoured Cheque',
      url: '/IC/Dcheque',
      iconComponent: { name: 'cil-ban' },
      children: [
        {
          name: 'Add Dishonoured Cheque',
          url: '/IC/Dcheque/addDcheque'
        },
        {
          name: 'View Dishonoured Cheque',
          url: '/IC/Dcheque/viewDcheque'
        },
      ]
    },
    {
      name: 'Incident Fraud Report',
      url: '/IC/Fraud',
      iconComponent: { name: 'cil-warning' },
      children: [
        {
          name: 'Add Fraud Data',
          url: '/IC/Fraud/addFraud',
        },
        {
          name: 'View Fraud History',
          url: '/IC/Fraud/viewFraud',
        },
      ]
    }
  ]
}

navItemsDistrictIC = {
  name: 'Internal Control',
  url: '/IC',
  children: [
    {
      name: 'CIPM',
      url: '/IC/CIPM',
      iconComponent: { name: 'cil-calendar-check' },
      children: [
        {
          name: 'View CIPM History',
          url: '/IC/CIPM/viewCIPM',
        },
      ]
    },
  ]
}

navItemsBM = {
  name: 'Internal Control',
  url: '/IC',
  children: [
    {
      name: 'Dishonoured Cheque',
      url: '/IC/Dcheque',
      iconComponent: { name: 'cil-ban' },
      children: [
        {
          name: 'View Dishonoured Cheque',
          url: '/IC/Dcheque/viewDcheque'
        },
      ]
    },
    {
      name: 'Incident Fraud Report',
      url: '/IC/Fraud',
      iconComponent: { name: 'cil-warning' },
      children: [
        {
          name: 'Authorize Fraud Cases',
          url: '/IC/Fraud/authorizeFraudCases',
        },
      ]
    }
  ]
}

navItemsSASVAdmin = {
  name: 'Signature & Stamp',
  url: '/SASV',
  children: [
    {
      name: 'Home',
      title: true
    },
    {
      name: 'Dashboard',
      url: '/SASV/dashboard',
      iconComponent: { name: 'cil-chart' },
    },
    {
      name: 'Menu',
      title: true
    },
    {
      name: 'User',
      url: '/SASV/user',
      iconComponent: { name: 'cil-user' },
      children: [
        {
          name: 'New',
          url: '/SASV/user/newUser',
        },
        {
          name: 'Table',
          url: '/SASV/user/userTable',
        },
      ]
    },
    {

      name: 'Employees',
      url: '/SASV/employee',
      iconComponent: { name: 'cil-people' },
      children: [
        {
          name: 'New',
          url: '/SASV/employee/newEmployee',
        },
        {
          name: 'Table',
          url: '/SASV/employee/employeeTable',
        },
      ]
    },
    {
      name: 'Division',
      url: '/SASV/division',
      iconComponent: { name: 'cil-sitemap' },
      children: [
        {
          name: 'New',
          url: '/SASV/division/newDivison',
        },
        {
          name: 'Table',
          url: '/SASV/division/divisionTable',
        },

      ]
    },
    {
      name: 'Authority',
      url: '/SASV/authority',
      iconComponent: { name: 'cil-institution' },
      children: [
        {
          name: 'New',
          url: '/SASV/authority/newAuthority'
        },
        {
          name: 'Table',
          url: '/SASV/authority/authorityTable'
        },
      ]
    },
    {
      name: 'Director',
      url: '/SASV/director',
      iconComponent: { name: 'cil-notes' },
    },
  ]
}

navItemsSASVView = {
  name: 'Sanction List',
  url: '/',
  children: [
    {
      name: 'Home',
      title: true
    },
  ]
}

navItemsSanctionAdmin = {
  name: 'Sanction List',
  url: '/',
  children: [
    {
      name: 'Home',
      title: true
    },
  ]
}

navItemsSanctionView = {
  name: 'Sanction List',
  url: '/sv',
  children: [
    {
      name: 'Home',
      title: true
    },
  ]
}
