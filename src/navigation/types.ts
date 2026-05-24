export type Route =
  | 'Splash'
  | 'Onboarding'
  | 'CreateProfile'
  | 'SecuritySetup'
  | 'OnboardingCompletion'
  | 'Authentication'
  | 'Dashboard'
  | 'Transactions'
  | 'AddTransaction'
  | 'TransactionDetail'
  | 'Reports'
  | 'Budgets'
  | 'Categories'
  | 'Accounts'
  | 'Profile'
  | 'SettingsSecurity'
  | 'ExportData'
  | 'Notifications'
  | 'EmptyErrorStates'
  | 'AddEditCategory'
  | 'AddEditBudget'
  | 'AddEditAccount'
  | 'AdvancedFilter'
  | 'HelpSupport'
  | 'LegalCompliance';

export type Nav = {
  go: (route: Route) => void;
  back: () => void;
};

export const tabs: Route[] = [
  'Dashboard',
  'Transactions',
  'AddTransaction',
  'Reports',
  'Profile',
];
