import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

type Route =
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

const images: Record<Route, ImageSourcePropType> = {
  Splash: require('./src/assets/screens/splash_screen.png'),
  Onboarding: require('./src/assets/screens/onboarding.png'),
  CreateProfile: require('./src/assets/screens/create_profile.png'),
  SecuritySetup: require('./src/assets/screens/security_setup.png'),
  OnboardingCompletion: require('./src/assets/screens/onboarding_completion.png'),
  Authentication: require('./src/assets/screens/authentication.png'),
  Dashboard: require('./src/assets/screens/dashboard.png'),
  Transactions: require('./src/assets/screens/transactions.png'),
  AddTransaction: require('./src/assets/screens/add_transaction.png'),
  TransactionDetail: require('./src/assets/screens/transaction_detail.png'),
  Reports: require('./src/assets/screens/reports_analytics.png'),
  Budgets: require('./src/assets/screens/budgets.png'),
  Categories: require('./src/assets/screens/categories.png'),
  Accounts: require('./src/assets/screens/accounts_wallets.png'),
  Profile: require('./src/assets/screens/profile.png'),
  SettingsSecurity: require('./src/assets/screens/settings_security.png'),
  ExportData: require('./src/assets/screens/export_data.png'),
  Notifications: require('./src/assets/screens/notifications.png'),
  EmptyErrorStates: require('./src/assets/screens/empty_error_states.png'),
  AddEditCategory: require('./src/assets/screens/add_edit_category.png'),
  AddEditBudget: require('./src/assets/screens/add_edit_budget.png'),
  AddEditAccount: require('./src/assets/screens/add_edit_account.png'),
  AdvancedFilter: require('./src/assets/screens/advanced_filter.png'),
  HelpSupport: require('./src/assets/screens/help_support.png'),
  LegalCompliance: require('./src/assets/screens/legal_compliance.png'),
};

const tabs: Route[] = [
  'Dashboard',
  'Transactions',
  'AddTransaction',
  'Reports',
  'Profile',
];

function App() {
  const [route, setRoute] = useState<Route>('Splash');
  const [, setHistory] = useState<Route[]>([]);

  const go = useCallback((next: Route) => {
    setHistory(previous => [...previous, route]);
    setRoute(next);
  }, [route]);

  const back = useCallback(() => {
    setHistory(previous => {
      const nextHistory = [...previous];
      setRoute(nextHistory.pop() ?? 'Dashboard');
      return nextHistory;
    });
  }, []);

  useEffect(() => {
    if (route !== 'Splash') {
      return;
    }

    const timer = setTimeout(() => go('Onboarding'), 1400);
    return () => clearTimeout(timer);
  }, [go, route]);

  return (
    <View style={styles.app}>
      <StatusBar hidden />
      <ReferenceScreen route={route} go={go} back={back} />
    </View>
  );
}

function ReferenceScreen({
  route,
  go,
  back,
}: {
  route: Route;
  go: (route: Route) => void;
  back: () => void;
}) {
  return (
    <View style={styles.screen}>
      <Image source={images[route]} resizeMode="stretch" style={styles.reference} />
      {route !== 'Splash' && route !== 'Onboarding' && !tabs.includes(route) ? (
        <Hotspot x={0} y={0} w={0.2} h={0.12} onPress={back} />
      ) : null}
      <RouteHotspots route={route} go={go} back={back} />
      {tabs.includes(route) ? <TabHotspots go={go} /> : null}
    </View>
  );
}

function RouteHotspots({
  route,
  go,
  back,
}: {
  route: Route;
  go: (route: Route) => void;
  back: () => void;
}) {
  switch (route) {
    case 'Onboarding':
      return (
        <>
          <Hotspot x={0.66} y={0} w={0.34} h={0.12} onPress={() => go('CreateProfile')} />
          <Hotspot x={0.54} y={0.86} w={0.4} h={0.1} onPress={() => go('CreateProfile')} />
        </>
      );
    case 'CreateProfile':
      return <Hotspot x={0.08} y={0.86} w={0.84} h={0.1} onPress={() => go('SecuritySetup')} />;
    case 'SecuritySetup':
      return <Hotspot x={0.08} y={0.86} w={0.84} h={0.1} onPress={() => go('OnboardingCompletion')} />;
    case 'OnboardingCompletion':
      return <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('Dashboard')} />;
    case 'Authentication':
      return (
        <>
          <Hotspot x={0.08} y={0.46} w={0.84} h={0.09} onPress={() => go('Dashboard')} />
          <Hotspot x={0.08} y={0.56} w={0.84} h={0.09} onPress={() => go('Dashboard')} />
        </>
      );
    case 'Dashboard':
      return (
        <>
          <Hotspot x={0.05} y={0.38} w={0.9} h={0.13} onPress={() => go('Budgets')} />
          <Hotspot x={0.05} y={0.62} w={0.9} h={0.2} onPress={() => go('TransactionDetail')} />
          <Hotspot x={0.7} y={0.54} w={0.28} h={0.08} onPress={() => go('Transactions')} />
        </>
      );
    case 'Transactions':
      return (
        <>
          <Hotspot x={0.72} y={0.06} w={0.23} h={0.08} onPress={() => go('AdvancedFilter')} />
          <Hotspot x={0.04} y={0.28} w={0.92} h={0.48} onPress={() => go('TransactionDetail')} />
        </>
      );
    case 'AddTransaction':
      return (
        <>
          <Hotspot x={0} y={0} w={0.2} h={0.12} onPress={back} />
          <Hotspot x={0.08} y={0.31} w={0.84} h={0.09} onPress={() => go('Categories')} />
          <Hotspot x={0.08} y={0.41} w={0.84} h={0.09} onPress={() => go('Accounts')} />
          <Hotspot x={0.08} y={0.86} w={0.84} h={0.1} onPress={() => go('TransactionDetail')} />
        </>
      );
    case 'TransactionDetail':
      return (
        <>
          <Hotspot x={0.04} y={0.82} w={0.28} h={0.08} onPress={() => go('AddTransaction')} />
          <Hotspot x={0.68} y={0.82} w={0.28} h={0.08} onPress={() => go('Transactions')} />
        </>
      );
    case 'Reports':
      return (
        <>
          <Hotspot x={0.04} y={0.77} w={0.92} h={0.08} onPress={() => go('ExportData')} />
          <Hotspot x={0.04} y={0.55} w={0.92} h={0.22} onPress={() => go('Transactions')} />
        </>
      );
    case 'Budgets':
      return (
        <>
          <Hotspot x={0.04} y={0.28} w={0.92} h={0.5} onPress={() => go('AddEditBudget')} />
          <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('AddEditBudget')} />
        </>
      );
    case 'Categories':
      return (
        <>
          <Hotspot x={0.04} y={0.22} w={0.92} h={0.54} onPress={() => go('AddEditCategory')} />
          <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('AddEditCategory')} />
        </>
      );
    case 'Accounts':
      return (
        <>
          <Hotspot x={0.04} y={0.28} w={0.92} h={0.44} onPress={() => go('AddEditAccount')} />
          <Hotspot x={0.08} y={0.76} w={0.84} h={0.09} onPress={() => go('AddEditAccount')} />
          <Hotspot x={0.08} y={0.86} w={0.84} h={0.09} onPress={() => go('AddTransaction')} />
        </>
      );
    case 'Profile':
      return (
        <>
          <Hotspot x={0.04} y={0.32} w={0.92} h={0.09} onPress={() => go('SettingsSecurity')} />
          <Hotspot x={0.04} y={0.41} w={0.92} h={0.09} onPress={() => go('ExportData')} />
          <Hotspot x={0.04} y={0.5} w={0.92} h={0.09} onPress={() => go('Notifications')} />
          <Hotspot x={0.04} y={0.59} w={0.92} h={0.09} onPress={() => go('HelpSupport')} />
          <Hotspot x={0.04} y={0.68} w={0.92} h={0.09} onPress={() => go('LegalCompliance')} />
          <Hotspot x={0.04} y={0.77} w={0.92} h={0.09} onPress={() => go('EmptyErrorStates')} />
        </>
      );
    case 'SettingsSecurity':
      return (
        <>
          <Hotspot x={0.04} y={0.42} w={0.92} h={0.09} onPress={() => go('ExportData')} />
          <Hotspot x={0.04} y={0.5} w={0.92} h={0.09} onPress={() => go('LegalCompliance')} />
        </>
      );
    case 'ExportData':
      return <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('EmptyErrorStates')} />;
    case 'Notifications':
      return (
        <>
          <Hotspot x={0.04} y={0.2} w={0.92} h={0.16} onPress={() => go('Budgets')} />
          <Hotspot x={0.04} y={0.36} w={0.92} h={0.28} onPress={() => go('TransactionDetail')} />
        </>
      );
    case 'AdvancedFilter':
      return <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('Transactions')} />;
    case 'AddEditCategory':
      return <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('Categories')} />;
    case 'AddEditBudget':
      return <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('Budgets')} />;
    case 'AddEditAccount':
      return <Hotspot x={0.08} y={0.84} w={0.84} h={0.1} onPress={() => go('Accounts')} />;
    default:
      return null;
  }
}

function TabHotspots({go}: {go: (route: Route) => void}) {
  return (
    <>
      {tabs.map((tab, index) => (
        <Hotspot
          key={tab}
          x={index / tabs.length}
          y={0.88}
          w={1 / tabs.length}
          h={0.12}
          onPress={() => go(tab)}
        />
      ))}
    </>
  );
}

function Hotspot({
  x,
  y,
  w,
  h,
  onPress,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.hotspot,
        {
          height: `${h * 100}%`,
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          width: `${w * 100}%`,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#f8f9ff',
    flex: 1,
  },
  screen: {
    backgroundColor: '#f8f9ff',
    flex: 1,
  },
  reference: {
    height: '100%',
    width: '100%',
  },
  hotspot: {
    position: 'absolute',
  },
});

export default App;
