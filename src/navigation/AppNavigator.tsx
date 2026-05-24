import React, {useMemo} from 'react';
import {Route, Nav} from './types';
import {
  AuthenticationScreen,
  CreateProfileScreen,
  OnboardingCompletionScreen,
  OnboardingScreen,
  SecuritySetupScreen,
  SplashScreen,
} from '../screens/EntryScreens';
import {
  AccountsScreen,
  BudgetsScreen,
  CategoriesScreen,
  DashboardScreen,
  ProfileScreen,
  ReportsScreen,
  TransactionFormScreen,
  TransactionsScreen,
} from '../screens/MainScreens';
import {TransactionDetailScreen} from '../screens/DetailScreens';
import {
  AddEditAccountScreen,
  AddEditBudgetScreen,
  AddEditCategoryScreen,
  AdvancedFilterScreen,
} from '../screens/FormScreens';
import {
  EmptyErrorStatesScreen,
  ExportDataScreen,
  HelpSupportScreen,
  LegalComplianceScreen,
  NotificationsScreen,
  SettingsSecurityScreen,
} from '../screens/SettingsScreens';

export function AppNavigator({
  route,
  go,
  back,
}: {
  route: Route;
  go: (route: Route) => void;
  back: () => void;
}) {
  const nav = useMemo<Nav>(() => ({go, back}), [go, back]);

  switch (route) {
    case 'Splash':
      return <SplashScreen />;
    case 'Onboarding':
      return <OnboardingScreen go={go} />;
    case 'CreateProfile':
      return <CreateProfileScreen go={go} back={back} />;
    case 'SecuritySetup':
      return <SecuritySetupScreen go={go} back={back} />;
    case 'OnboardingCompletion':
      return <OnboardingCompletionScreen go={go} />;
    case 'Authentication':
      return <AuthenticationScreen go={go} />;
    case 'Dashboard':
      return <DashboardScreen nav={nav} />;
    case 'Transactions':
      return <TransactionsScreen nav={nav} />;
    case 'AddTransaction':
      return <TransactionFormScreen nav={nav} />;
    case 'TransactionDetail':
      return <TransactionDetailScreen nav={nav} />;
    case 'Reports':
      return <ReportsScreen nav={nav} />;
    case 'Budgets':
      return <BudgetsScreen nav={nav} />;
    case 'Categories':
      return <CategoriesScreen nav={nav} />;
    case 'Accounts':
      return <AccountsScreen nav={nav} />;
    case 'Profile':
      return <ProfileScreen nav={nav} />;
    case 'SettingsSecurity':
      return <SettingsSecurityScreen nav={nav} />;
    case 'ExportData':
      return <ExportDataScreen nav={nav} />;
    case 'Notifications':
      return <NotificationsScreen nav={nav} />;
    case 'EmptyErrorStates':
      return <EmptyErrorStatesScreen nav={nav} />;
    case 'AddEditCategory':
      return <AddEditCategoryScreen nav={nav} />;
    case 'AddEditBudget':
      return <AddEditBudgetScreen nav={nav} />;
    case 'AddEditAccount':
      return <AddEditAccountScreen nav={nav} />;
    case 'AdvancedFilter':
      return <AdvancedFilterScreen nav={nav} />;
    case 'HelpSupport':
      return <HelpSupportScreen nav={nav} />;
    case 'LegalCompliance':
      return <LegalComplianceScreen nav={nav} />;
    default:
      return <DashboardScreen nav={nav} />;
  }
}
