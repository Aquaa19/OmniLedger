import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
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

const palette = {
  background: '#f8f9ff',
  surface: '#ffffff',
  low: '#eff4ff',
  container: '#e5eeff',
  high: '#d3e4fe',
  text: '#0b1c30',
  muted: '#3c4a42',
  outline: '#bbcabf',
  primary: '#006c49',
  primaryContainer: '#10b981',
  primaryFixed: '#6ffbbe',
  secondary: '#4648d4',
  secondaryFixed: '#e1e0ff',
  tertiary: '#e29100',
  tertiaryFixed: '#ffddb8',
  danger: '#ba1a1a',
  dangerFixed: '#ffdad6',
};

const tabs: Route[] = ['Dashboard', 'Transactions', 'AddTransaction', 'Reports', 'Profile'];

const transactions = [
  ['Fresh Market', 'Groceries - Everyday Checking', '-$84.20', 'Today'],
  ['Design Retainer', 'Salary - Bank transfer', '+$2,400.00', 'Today'],
  ['Metro Card', 'Transport - Travel Wallet', '-$32.00', 'Yesterday'],
  ['Cloud Storage', 'Subscriptions - Rewards Card', '-$12.99', 'Yesterday'],
];

const categories = [
  ['Groceries', '24 transactions', palette.primaryContainer],
  ['Transport', '13 transactions', palette.secondary],
  ['Dining', '18 transactions', palette.tertiary],
  ['Subscriptions', '8 transactions', palette.danger],
  ['Salary', '2 transactions', palette.primary],
];

const budgets = [
  ['Groceries', '$640 used of $900', 0.71],
  ['Dining', '$330 used of $500', 0.66],
  ['Transport', '$180 used of $300', 0.6],
  ['Subscriptions', '$124 used of $160', 0.78],
];

const accounts = [
  ['Everyday Checking', 'Bank account', '$8,430.50'],
  ['Cash Wallet', 'Cash', '$220.00'],
  ['Rewards Card', 'Credit card', '-$940.18'],
  ['Emergency Savings', 'Savings', '$12,800.00'],
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
    const timer = setTimeout(() => go('Onboarding'), 900);
    return () => clearTimeout(timer);
  }, [go, route]);

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />
      <RouteView route={route} go={go} back={back} />
      {tabs.includes(route) ? <BottomTabs active={route} go={go} /> : null}
    </View>
  );
}

function RouteView({route, go, back}: {route: Route; go: (route: Route) => void; back: () => void}) {
  const nav = useMemo(() => ({go, back}), [go, back]);

  switch (route) {
    case 'Splash':
      return <Splash />;
    case 'Onboarding':
      return <Onboarding go={go} />;
    case 'CreateProfile':
      return <CreateProfile go={go} back={back} />;
    case 'SecuritySetup':
      return <SecuritySetup go={go} back={back} />;
    case 'OnboardingCompletion':
      return <OnboardingCompletion go={go} />;
    case 'Authentication':
      return <Authentication go={go} />;
    case 'Dashboard':
      return <Dashboard nav={nav} />;
    case 'Transactions':
      return <Transactions nav={nav} />;
    case 'AddTransaction':
      return <TransactionForm nav={nav} />;
    case 'TransactionDetail':
      return <TransactionDetail nav={nav} />;
    case 'Reports':
      return <Reports nav={nav} />;
    case 'Budgets':
      return <Budgets nav={nav} />;
    case 'Categories':
      return <Categories nav={nav} />;
    case 'Accounts':
      return <Accounts nav={nav} />;
    case 'Profile':
      return <Profile nav={nav} />;
    case 'SettingsSecurity':
      return <SettingsSecurity nav={nav} />;
    case 'ExportData':
      return <ExportData nav={nav} />;
    case 'Notifications':
      return <Notifications nav={nav} />;
    case 'EmptyErrorStates':
      return <EmptyErrorStates nav={nav} />;
    case 'AddEditCategory':
      return <AddEditCategory nav={nav} />;
    case 'AddEditBudget':
      return <AddEditBudget nav={nav} />;
    case 'AddEditAccount':
      return <AddEditAccount nav={nav} />;
    case 'AdvancedFilter':
      return <AdvancedFilter nav={nav} />;
    case 'HelpSupport':
      return <HelpSupport nav={nav} />;
    case 'LegalCompliance':
      return <LegalCompliance nav={nav} />;
    default:
      return <Dashboard nav={nav} />;
  }
}

function Shell({
  title,
  children,
  back,
  action,
}: {
  title?: string;
  children: React.ReactNode;
  back?: () => void;
  action?: React.ReactNode;
}) {
  const {width} = useWindowDimensions();
  const maxWidth = width >= 900 ? 760 : 560;

  return (
    <View style={styles.shell}>
      {title ? (
        <View style={[styles.header, {maxWidth}]}>
          {back ? <IconButton label="<" onPress={back} /> : <View style={styles.iconSpacer} />}
          <Text style={styles.headerTitle}>{title}</Text>
          {action ?? <View style={styles.iconSpacer} />}
        </View>
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, {maxWidth}]}>
        {children}
      </ScrollView>
    </View>
  );
}

function Splash() {
  return (
    <View style={styles.splash}>
      <BrandMark size={96} />
      <Text style={styles.display}>OmniLedger</Text>
      <Text style={styles.mutedCenter}>Securing your private financial workspace</Text>
      <View style={styles.loadingTrack}>
        <View style={styles.loadingFill} />
      </View>
    </View>
  );
}

function Onboarding({go}: {go: (route: Route) => void}) {
  const [slide, setSlide] = useState(0);
  const slides = [
    ['Track Every Penny', 'Automatically organize spending, income, accounts, and receipts with a calm ledger-first flow.'],
    ['Master Your Budget', 'Use category limits and progress previews to understand what remains before the month ends.'],
    ['See The Whole Picture', 'Review reports, savings movement, and account balances from one secure dashboard.'],
  ];
  const isLast = slide === slides.length - 1;

  return (
    <Shell>
      <View style={styles.topBar}>
        <BrandMark size={52} />
        <Pressable onPress={() => go('CreateProfile')}>
          <Text style={styles.link}>Skip</Text>
        </Pressable>
      </View>
      <View style={styles.heroArt}>
        <View style={styles.phoneMock}>
          <View style={styles.chartLine} />
          <View style={[styles.chartBar, styles.heroBarMedium]} />
          <View style={[styles.chartBar, styles.heroBarTall]} />
          <View style={[styles.chartBar, styles.heroBarSmall]} />
        </View>
      </View>
      <Text style={styles.display}>{slides[slide][0]}</Text>
      <Text style={styles.body}>{slides[slide][1]}</Text>
      <View style={styles.dots}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, index === slide && styles.dotActive]} />
        ))}
      </View>
      <Button label={isLast ? 'Get Started' : 'Next'} onPress={() => (isLast ? go('CreateProfile') : setSlide(slide + 1))} />
    </Shell>
  );
}

function CreateProfile({go, back}: {go: (route: Route) => void; back: () => void}) {
  return (
    <Shell title="Create Profile" back={back}>
      <Card>
        <Text style={styles.sectionTitle}>Choose avatar</Text>
        <View style={styles.rowWrap}>
          {['MK', 'AR', 'NS'].map((item, index) => (
            <View key={item} style={[styles.avatar, index === 0 && styles.avatarActive]}>
              <Text style={styles.avatarText}>{item}</Text>
            </View>
          ))}
        </View>
      </Card>
      <Field label="Name" value="Mira Kapoor" />
      <PickerField label="Currency" value="USD - United States Dollar" />
      <Field label="Monthly income" value="$7,200" />
      <Card>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.rowWrap}>
          <Chip label="Light" active />
          <Chip label="Dark" />
          <Chip label="System" />
        </View>
      </Card>
      <Button label="Continue" onPress={() => go('SecuritySetup')} />
    </Shell>
  );
}

function SecuritySetup({go, back}: {go: (route: Route) => void; back: () => void}) {
  return (
    <Shell title="Security Setup" back={back}>
      <Card>
        <ToggleRow title="Biometric unlock" subtitle="Use device biometrics when available" on />
      </Card>
      <Text style={styles.sectionTitle}>Create PIN</Text>
      <PinBoxes />
      <Text style={styles.sectionTitle}>Confirm PIN</Text>
      <PinBoxes />
      <Card>
        <Text style={styles.sectionTitle}>Lock timing</Text>
        <View style={styles.rowWrap}>
          <Chip label="Immediately" active />
          <Chip label="1 min" />
          <Chip label="5 min" />
        </View>
      </Card>
      <Button label="Continue" onPress={() => go('OnboardingCompletion')} />
    </Shell>
  );
}

function OnboardingCompletion({go}: {go: (route: Route) => void}) {
  return (
    <Shell>
      <View style={styles.successBadge}>
        <Text style={styles.successText}>OK</Text>
      </View>
      <Text style={styles.display}>You are all set</Text>
      <Text style={styles.body}>Your profile, security lock, currency, and monthly income are ready.</Text>
      <Card>
        <InfoRow title="Profile" subtitle="Mira Kapoor" />
        <InfoRow title="Security" subtitle="Biometric and PIN lock enabled" />
        <InfoRow title="Currency" subtitle="USD" />
      </Card>
      <Button label="Go to Dashboard" onPress={() => go('Dashboard')} />
    </Shell>
  );
}

function Authentication({go}: {go: (route: Route) => void}) {
  return (
    <Shell>
      <View style={styles.authIntro}>
        <BrandMark size={82} />
        <Text style={styles.display}>Welcome back</Text>
        <Text style={styles.body}>Unlock OmniLedger to continue tracking your money.</Text>
      </View>
      <Button label="Unlock with Biometrics" onPress={() => go('Dashboard')} />
      <Button label="Use PIN Instead" variant="secondary" />
      <PinBoxes />
      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'DEL'].map(item => (
          <Pressable key={item || 'blank'} style={styles.key} onPress={() => item && go('Dashboard')}>
            <Text style={styles.keyText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </Shell>
  );
}

function Dashboard({nav}: {nav: Nav}) {
  return (
    <Shell
      title="Dashboard"
      action={<IconButton label="!" onPress={() => nav.go('Notifications')} />}>
      <Text style={styles.body}>Good evening, Mira</Text>
      <Card accent>
        <Text style={styles.cardLabel}>Total balance</Text>
        <Text style={styles.balance}>$20,510.32</Text>
        <View style={styles.metricGrid}>
          <Metric label="Income" value="$7,200" />
          <Metric label="Expense" value="$3,840" />
          <Metric label="Budget left" value="$1,160" />
        </View>
      </Card>
      <Pressable onPress={() => nav.go('Budgets')}>
        <Card>
          <InfoRow title="Remaining budget" subtitle="$1,274 used of $1,860" value="$586" />
          <Progress value={0.68} />
        </Card>
      </Pressable>
      <Card>
        <Text style={styles.sectionTitle}>Top categories</Text>
        {categories.slice(0, 3).map(item => (
          <CategoryRow key={item[0]} item={item} />
        ))}
      </Card>
      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Recent transactions</Text>
          <Pressable onPress={() => nav.go('Transactions')}>
            <Text style={styles.link}>View all</Text>
          </Pressable>
        </View>
        {transactions.slice(0, 3).map(item => (
          <InfoRow key={item[0]} title={item[0]} subtitle={`${item[1]} - ${item[3]}`} value={item[2]} onPress={() => nav.go('TransactionDetail')} />
        ))}
      </Card>
      <ChartCard title="Reports preview" />
      <Button label="Quick Add" onPress={() => nav.go('AddTransaction')} />
    </Shell>
  );
}

function Transactions({nav}: {nav: Nav}) {
  return (
    <Shell
      title="Transactions"
      action={<Pressable onPress={() => nav.go('AdvancedFilter')}><Text style={styles.link}>Filter</Text></Pressable>}>
      <SearchField />
      <View style={styles.rowWrap}>
        <Chip label="All" active />
        <Chip label="Expense" />
        <Chip label="Income" />
        <Chip label="Cards" />
      </View>
      {['Today', 'Yesterday'].map(day => (
        <Card key={day}>
          <Text style={styles.sectionTitle}>{day}</Text>
          {transactions.filter(item => item[3] === day).map(item => (
            <InfoRow key={item[0]} title={item[0]} subtitle={item[1]} value={item[2]} onPress={() => nav.go('TransactionDetail')} />
          ))}
        </Card>
      ))}
      <Button label="Add Transaction" onPress={() => nav.go('AddTransaction')} />
    </Shell>
  );
}

function TransactionForm({nav}: {nav: Nav}) {
  return (
    <Shell title="New Transaction" back={nav.back}>
      <View style={styles.segment}>
        <Chip label="Income" />
        <Chip label="Expense" active />
        <Chip label="Transfer" />
      </View>
      <Field label="Amount" value="$84.20" large />
      <PickerField label="Category" value="Groceries" onPress={() => nav.go('Categories')} />
      <PickerField label="Account" value="Everyday Checking" onPress={() => nav.go('Accounts')} />
      <PickerField label="Date" value="Today" />
      <PickerField label="Time" value="09:45 AM" />
      <PickerField label="Payment method" value="Debit card" />
      <Field label="Notes" value="Weekly grocery run" />
      <Card>
        <InfoRow title="Receipt attachment" subtitle="Capture or upload later" value="Add" />
      </Card>
      <Button label="Save Transaction" onPress={() => nav.go('TransactionDetail')} />
    </Shell>
  );
}

function TransactionDetail({nav}: {nav: Nav}) {
  return (
    <Shell title="Transaction Detail" back={nav.back}>
      <Card accent>
        <Text style={styles.detailAmount}>-$84.20</Text>
        <Text style={styles.title}>Fresh Market</Text>
        <Text style={styles.body}>Neighborhood Grocery</Text>
      </Card>
      <Card>
        <InfoRow title="Type" subtitle="Expense" />
        <InfoRow title="Category" subtitle="Groceries" />
        <InfoRow title="Account" subtitle="Everyday Checking" />
        <InfoRow title="Date and time" subtitle="Today, 09:45 AM" />
        <InfoRow title="Payment method" subtitle="Debit card" />
        <InfoRow title="Note" subtitle="Weekly grocery run" />
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Receipt preview</Text>
        <View style={styles.receipt}><Text style={styles.body}>Receipt image placeholder</Text></View>
      </Card>
      <View style={styles.actionGrid}>
        <Button label="Edit" onPress={() => nav.go('AddTransaction')} />
        <Button label="Duplicate" variant="secondary" />
        <Button label="Share" variant="secondary" />
      </View>
      <Button label="Delete" variant="danger" onPress={() => nav.go('Transactions')} />
    </Shell>
  );
}

function Reports({nav}: {nav: Nav}) {
  return (
    <Shell title="Reports">
      <View style={styles.rowWrap}>
        <Chip label="This month" active />
        <Chip label="Quarter" />
        <Chip label="Year" />
      </View>
      <ChartCard title="Income vs expense" />
      <ChartCard title="Spending by category" circular />
      <ChartCard title="Trend" />
      <Card>
        <Text style={styles.sectionTitle}>Top spending categories</Text>
        {categories.slice(0, 4).map(item => (
          <CategoryRow key={item[0]} item={item} onPress={() => nav.go('Transactions')} />
        ))}
      </Card>
      <Button label="Export Report" onPress={() => nav.go('ExportData')} />
    </Shell>
  );
}

function Budgets({nav}: {nav: Nav}) {
  return (
    <Shell title="Budgets" back={nav.back}>
      <Card accent>
        <Text style={styles.cardLabel}>Monthly budget</Text>
        <Text style={styles.balance}>$1,274 / $1,860</Text>
        <Progress value={0.68} />
        <Text style={styles.body}>$586 remaining this month</Text>
      </Card>
      {budgets.map(item => (
        <Pressable key={item[0]} onPress={() => nav.go('AddEditBudget')}>
          <Card>
            <InfoRow title={item[0] as string} subtitle={item[1] as string} />
            <Progress value={item[2] as number} />
          </Card>
        </Pressable>
      ))}
      <Button label="Add Budget" onPress={() => nav.go('AddEditBudget')} />
    </Shell>
  );
}

function Categories({nav}: {nav: Nav}) {
  return (
    <Shell title="Categories" back={nav.back}>
      <View style={styles.rowWrap}>
        <Chip label="Expense" active />
        <Chip label="Income" />
      </View>
      <Card>
        {categories.map(item => (
          <CategoryRow key={item[0]} item={item} onPress={() => nav.go('AddEditCategory')} />
        ))}
      </Card>
      <Button label="Add New Category" onPress={() => nav.go('AddEditCategory')} />
    </Shell>
  );
}

function Accounts({nav}: {nav: Nav}) {
  return (
    <Shell title="Accounts" back={nav.back}>
      <Card accent>
        <Text style={styles.cardLabel}>Total net worth</Text>
        <Text style={styles.balance}>$20,510.32</Text>
      </Card>
      <Card>
        {accounts.map(item => (
          <InfoRow key={item[0]} title={item[0]} subtitle={item[1]} value={item[2]} onPress={() => nav.go('AddEditAccount')} />
        ))}
      </Card>
      <Button label="Add New Account" onPress={() => nav.go('AddEditAccount')} />
      <Button label="Transfer Funds" variant="secondary" onPress={() => nav.go('AddTransaction')} />
    </Shell>
  );
}

function Profile({nav}: {nav: Nav}) {
  return (
    <Shell title="Profile">
      <Card>
        <View style={styles.profileTop}>
          <View style={[styles.avatar, styles.avatarActive]}><Text style={styles.avatarText}>MK</Text></View>
          <View>
            <Text style={styles.title}>Mira Kapoor</Text>
            <Text style={styles.body}>mira@example.com</Text>
          </View>
        </View>
        <View style={styles.metricGrid}>
          <Metric label="Savings" value="$18,420" />
          <Metric label="Txns" value="428" />
          <Metric label="Top" value="Groceries" />
        </View>
      </Card>
      <Card>
        <InfoRow title="Edit Profile" subtitle="Avatar, income, currency" />
        <InfoRow title="Security" subtitle="PIN and biometrics" onPress={() => nav.go('SettingsSecurity')} />
        <InfoRow title="Backup / Export" subtitle="PDF, CSV, JSON" onPress={() => nav.go('ExportData')} />
        <InfoRow title="Notifications" subtitle="Alerts and reminders" onPress={() => nav.go('Notifications')} />
        <InfoRow title="Help Support" subtitle="FAQ and contact" onPress={() => nav.go('HelpSupport')} />
        <InfoRow title="Legal Compliance" subtitle="Terms, privacy, licenses" onPress={() => nav.go('LegalCompliance')} />
        <InfoRow title="Empty / Error States" subtitle="Design system coverage" onPress={() => nav.go('EmptyErrorStates')} />
      </Card>
    </Shell>
  );
}

function SettingsSecurity({nav}: {nav: Nav}) {
  return (
    <Shell title="Settings" back={nav.back}>
      <Card>
        <ToggleRow title="Biometric unlock" subtitle="Use device biometrics" on />
        <InfoRow title="Change PIN" subtitle="Update app passcode" />
        <PickerField label="App lock timing" value="Immediately" compact />
        <ToggleRow title="Two-factor placeholder" subtitle="Static future security module" />
        <InfoRow title="Recovery key" subtitle="View secure recovery option" />
        <InfoRow title="Export data" subtitle="Download a static export" onPress={() => nav.go('ExportData')} />
        <InfoRow title="Privacy policy" subtitle="Legal compliance" onPress={() => nav.go('LegalCompliance')} />
        <InfoRow title="Clear cache/data" subtitle="Static destructive state" value="Clear" />
      </Card>
    </Shell>
  );
}

function ExportData({nav}: {nav: Nav}) {
  return (
    <Shell title="Export Data" back={nav.back}>
      <View style={styles.rowWrap}>
        <Chip label="PDF" active />
        <Chip label="CSV" />
        <Chip label="JSON" />
      </View>
      <PickerField label="Date range" value="May 1 - May 24, 2026" />
      <PickerField label="Account" value="All accounts" />
      <Card>
        <ToggleRow title="Include attachments" subtitle="Receipts and note media" on />
      </Card>
      <Button label="Download Export" onPress={() => nav.go('EmptyErrorStates')} />
    </Shell>
  );
}

function Notifications({nav}: {nav: Nav}) {
  return (
    <Shell title="Notifications" back={nav.back} action={<Text style={styles.link}>Read all</Text>}>
      <Card>
        <InfoRow title="Budget alert" subtitle="Groceries crossed 70% of the monthly limit." onPress={() => nav.go('Budgets')} />
        <InfoRow title="Security" subtitle="New login approval mocked for this device." onPress={() => nav.go('SettingsSecurity')} />
        <InfoRow title="Bill reminder" subtitle="Cloud Storage renews in 3 days." onPress={() => nav.go('TransactionDetail')} />
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Empty notification state</Text>
        <Text style={styles.body}>No unread alerts after marking everything as read.</Text>
      </Card>
    </Shell>
  );
}

function EmptyErrorStates({nav}: {nav: Nav}) {
  const states = [
    ['No transactions', 'Add the first transaction to begin tracking.', 'Add Transaction'],
    ['No accounts', 'Create a cash, bank, card, or savings account.', 'Add Account'],
    ['No budgets', 'Set a monthly spending limit for any category.', 'Add Budget'],
    ['Connection error', 'Sync will retry when connectivity returns.', 'Retry'],
    ['Permission denied', 'Receipt scanning will need camera access later.', 'Open Settings'],
  ];

  return (
    <Shell title="States" back={nav.back}>
      {states.map(item => (
        <Card key={item[0]}>
          <Text style={styles.sectionTitle}>{item[0]}</Text>
          <Text style={styles.body}>{item[1]}</Text>
          <Button
            label={item[2]}
            variant="secondary"
            onPress={() =>
              item[2] === 'Add Transaction'
                ? nav.go('AddTransaction')
                : item[2] === 'Add Account'
                  ? nav.go('AddEditAccount')
                  : item[2] === 'Add Budget'
                    ? nav.go('AddEditBudget')
                    : undefined
            }
          />
        </Card>
      ))}
    </Shell>
  );
}

function AddEditCategory({nav}: {nav: Nav}) {
  return (
    <Shell title="Category" back={nav.back}>
      <View style={styles.rowWrap}><Chip label="Expense" active /><Chip label="Income" /></View>
      <Field label="Category name" value="Groceries" />
      <Card>
        <Text style={styles.sectionTitle}>Icon grid</Text>
        <View style={styles.rowWrap}>{['G', 'D', 'T', 'S', 'H', 'B'].map(item => <Chip key={item} label={item} active={item === 'G'} />)}</View>
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Color selector</Text>
        <View style={styles.rowWrap}>{[palette.primaryContainer, palette.secondary, palette.tertiary, palette.danger].map(color => <View key={color} style={[styles.swatch, {backgroundColor: color}]} />)}</View>
      </Card>
      <Button label="Save Category" onPress={() => nav.go('Categories')} />
    </Shell>
  );
}

function AddEditBudget({nav}: {nav: Nav}) {
  return (
    <Shell title="Budget" back={nav.back}>
      <PickerField label="Category" value="Groceries" />
      <Field label="Monthly limit" value="$900" />
      <Card><ToggleRow title="Rollover unused amount" subtitle="Carry remaining balance forward" on /></Card>
      <Card><Text style={styles.sectionTitle}>Alert threshold</Text><Progress value={0.75} /><Text style={styles.body}>Alert at 75%</Text></Card>
      <Button label="Save Budget" onPress={() => nav.go('Budgets')} />
    </Shell>
  );
}

function AddEditAccount({nav}: {nav: Nav}) {
  return (
    <Shell title="Account" back={nav.back}>
      <View style={styles.rowWrap}><Chip label="Bank" active /><Chip label="Cash" /><Chip label="Card" /><Chip label="Savings" /></View>
      <Field label="Account name" value="Everyday Checking" />
      <Field label="Current balance" value="$8,430.50" />
      <Card><ToggleRow title="Include in total" subtitle="Counts toward net worth" on /></Card>
      <Button label="Save Account" onPress={() => nav.go('Accounts')} />
    </Shell>
  );
}

function AdvancedFilter({nav}: {nav: Nav}) {
  return (
    <Shell title="Advanced Filter" back={nav.back}>
      <PickerField label="Date range" value="This month" />
      <View style={styles.rowWrap}><Chip label="Income" /><Chip label="Expense" active /><Chip label="Transfer" /></View>
      <PickerField label="Categories" value="Groceries, Dining, Transport" />
      <PickerField label="Accounts" value="All active accounts" />
      <Card><Text style={styles.sectionTitle}>Amount range</Text><Progress value={0.55} /><Text style={styles.body}>$10 to $500</Text></Card>
      <Button label="Apply Filters" onPress={() => nav.go('Transactions')} />
      <Button label="Reset" variant="secondary" />
    </Shell>
  );
}

function HelpSupport({nav}: {nav: Nav}) {
  return (
    <Shell title="Help" back={nav.back}>
      <SearchField placeholder="Search help" />
      <Card>
        <InfoRow title="Accounts" subtitle="Manage wallets and balances" />
        <InfoRow title="Budgets" subtitle="Track limits and alerts" />
        <InfoRow title="Security" subtitle="PIN, lock timing, recovery" />
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>FAQ</Text>
        <Text style={styles.body}>How do exports work? Static exports are mocked in this build.</Text>
        <Text style={styles.body}>Can I sync bank data? Not in the static phase.</Text>
      </Card>
      <Button label="Contact Support" variant="secondary" />
    </Shell>
  );
}

function LegalCompliance({nav}: {nav: Nav}) {
  return (
    <Shell title="Legal" back={nav.back}>
      <Card>
        {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Licenses', 'Regulatory Disclosures'].map(item => (
          <InfoRow key={item} title={item} subtitle="Static expandable legal detail" />
        ))}
        <InfoRow title="App version" subtitle="0.0.1 static base" />
      </Card>
    </Shell>
  );
}

type Nav = {go: (route: Route) => void; back: () => void};

function BottomTabs({active, go}: {active: Route; go: (route: Route) => void}) {
  return (
    <View style={styles.tabBar}>
      {[
        ['Dashboard', 'Home'],
        ['Transactions', 'List'],
        ['AddTransaction', 'Add'],
        ['Reports', 'Reports'],
        ['Profile', 'Profile'],
      ].map(([route, label]) => (
        <Pressable
          key={route}
          onPress={() => go(route as Route)}
          style={[styles.tabItem, route === 'AddTransaction' && styles.addTab, active === route && styles.activeTab]}>
          <Text style={[styles.tabText, route === 'AddTransaction' && styles.addTabText, active === route && styles.activeTabText]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function BrandMark({size}: {size: number}) {
  return (
    <View style={[styles.brand, {height: size, width: size, borderRadius: size * 0.22}]}>
      <View style={[styles.brandCard, {height: size * 0.38, width: size * 0.58}]} />
      <View style={[styles.brandCoin, {height: size * 0.2, width: size * 0.2, right: size * 0.16, top: size * 0.16}]} />
    </View>
  );
}

function Card({children, accent}: {children: React.ReactNode; accent?: boolean}) {
  return <View style={[styles.card, accent && styles.accentCard]}>{children}</View>;
}

function Button({label, onPress, variant}: {label: string; onPress?: () => void; variant?: 'secondary' | 'danger'}) {
  return (
    <Pressable onPress={onPress} style={[styles.button, variant === 'secondary' && styles.secondaryButton, variant === 'danger' && styles.dangerButton]}>
      <Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryButtonText, variant === 'danger' && styles.dangerButtonText]}>{label}</Text>
    </Pressable>
  );
}

function IconButton({label, onPress}: {label: string; onPress?: () => void}) {
  return (
    <Pressable onPress={onPress} style={styles.iconButton}>
      <Text style={styles.iconButtonText}>{label}</Text>
    </Pressable>
  );
}

function Chip({label, active}: {label: string; active?: boolean}) {
  return (
    <View style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.chipText, active && styles.activeChipText]}>{label}</Text>
    </View>
  );
}

function Field({label, value, large}: {label: string; value: string; large?: boolean}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput editable={false} value={value} style={[styles.field, large && styles.largeField]} />
    </View>
  );
}

function PickerField({label, value, onPress, compact}: {label: string; value: string; onPress?: () => void; compact?: boolean}) {
  return (
    <Pressable onPress={onPress} style={compact ? styles.compactPicker : undefined}>
      <Field label={label} value={`${value}  >`} />
    </Pressable>
  );
}

function SearchField({placeholder = 'Search merchant, amount, category'}: {placeholder?: string}) {
  return <TextInput editable={false} value={placeholder} style={styles.search} />;
}

function InfoRow({title, subtitle, value, onPress}: {title: string; subtitle?: string; value?: string; onPress?: () => void}) {
  return (
    <Pressable onPress={onPress} style={styles.infoRow}>
      <View style={styles.rowGlyph}><Text style={styles.rowGlyphText}>{title.slice(0, 1)}</Text></View>
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      {value ? <Text style={[styles.rowValue, value.startsWith('-') && styles.negative]}>{value}</Text> : null}
      {onPress ? <Text style={styles.chevron}>{'>'}</Text> : null}
    </Pressable>
  );
}

function CategoryRow({item, onPress}: {item: (string | number)[]; onPress?: () => void}) {
  return (
    <Pressable onPress={onPress} style={styles.infoRow}>
      <View style={[styles.rowGlyph, {backgroundColor: String(item[2])}]} />
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle}>{item[0]}</Text>
        <Text style={styles.rowSubtitle}>{item[1]}</Text>
      </View>
      {onPress ? <Text style={styles.chevron}>{'>'}</Text> : null}
    </Pressable>
  );
}

function ToggleRow({title, subtitle, on}: {title: string; subtitle?: string; on?: boolean}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      <View style={[styles.switchTrack, on && styles.switchOn]}>
        <View style={[styles.switchThumb, on && styles.switchThumbOn]} />
      </View>
    </View>
  );
}

function PinBoxes() {
  return (
    <View style={styles.pinRow}>
      {[0, 1, 2, 3].map(index => (
        <View key={index} style={styles.pinBox}><Text style={styles.pinText}>{index < 2 ? '*' : ''}</Text></View>
      ))}
    </View>
  );
}

function Metric({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function Progress({value}: {value: number}) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, {width: `${Math.round(value * 100)}%`}]} />
    </View>
  );
}

function ChartCard({title, circular}: {title: string; circular?: boolean}) {
  return (
    <Card>
      <Text style={styles.sectionTitle}>{title}</Text>
      {circular ? (
        <View style={styles.donut}><View style={styles.donutHole} /></View>
      ) : (
        <View style={styles.chart}>
          {[0.42, 0.74, 0.58, 0.92, 0.48, 0.66].map((height, index) => (
            <View key={index} style={[styles.chartBarNative, {height: 112 * height}]} />
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  app: {backgroundColor: palette.background, flex: 1},
  shell: {alignItems: 'center', backgroundColor: palette.background, flex: 1},
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    width: '100%',
  },
  headerTitle: {color: palette.primary, fontSize: 24, fontWeight: '800'},
  iconSpacer: {height: 40, width: 40},
  content: {gap: 16, padding: 16, paddingBottom: 112, width: '100%'},
  splash: {alignItems: 'center', flex: 1, gap: 16, justifyContent: 'center', padding: 24},
  display: {color: palette.text, fontSize: 34, fontWeight: '800', letterSpacing: 0, textAlign: 'center'},
  title: {color: palette.text, fontSize: 24, fontWeight: '800'},
  body: {color: palette.muted, fontSize: 15, lineHeight: 22},
  mutedCenter: {color: palette.muted, fontSize: 14, fontWeight: '600', textAlign: 'center'},
  brand: {
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.high,
    borderWidth: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 18,
  },
  brandCard: {
    backgroundColor: '#d9ffed',
    borderColor: palette.primary,
    borderRadius: 8,
    borderWidth: 3,
  },
  brandCoin: {backgroundColor: palette.secondary, borderRadius: 999, position: 'absolute'},
  loadingTrack: {backgroundColor: palette.container, borderRadius: 999, height: 8, marginTop: 12, overflow: 'hidden', width: 180},
  loadingFill: {backgroundColor: palette.primaryContainer, height: 8, width: 126},
  topBar: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'},
  link: {color: palette.primary, fontSize: 14, fontWeight: '900'},
  heroArt: {alignItems: 'center', alignSelf: 'center', backgroundColor: palette.low, borderRadius: 220, height: 300, justifyContent: 'center', width: 300},
  phoneMock: {alignItems: 'flex-end', backgroundColor: palette.surface, borderRadius: 28, flexDirection: 'row', gap: 12, height: 210, justifyContent: 'center', padding: 22, width: 150},
  chartLine: {backgroundColor: palette.high, borderRadius: 999, height: 150, position: 'absolute', top: 24, width: 6},
  chartBar: {backgroundColor: palette.secondary, borderRadius: 999, width: 18},
  heroBarMedium: {height: 84},
  heroBarTall: {backgroundColor: palette.primaryContainer, height: 132},
  heroBarSmall: {backgroundColor: palette.tertiary, height: 58},
  dots: {flexDirection: 'row', gap: 8, justifyContent: 'center'},
  dot: {backgroundColor: palette.high, borderRadius: 999, height: 9, width: 9},
  dotActive: {backgroundColor: palette.primary, width: 30},
  card: {backgroundColor: palette.surface, borderColor: palette.high, borderRadius: 12, borderWidth: 1, gap: 14, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 18},
  accentCard: {backgroundColor: palette.low},
  sectionTitle: {color: palette.text, fontSize: 17, fontWeight: '800'},
  rowWrap: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  avatar: {alignItems: 'center', backgroundColor: palette.container, borderRadius: 18, height: 62, justifyContent: 'center', width: 62},
  avatarActive: {backgroundColor: palette.primary},
  avatarText: {color: '#fff', fontSize: 18, fontWeight: '900'},
  fieldWrap: {gap: 8},
  fieldLabel: {color: palette.muted, fontSize: 13, fontWeight: '800'},
  field: {backgroundColor: palette.surface, borderColor: palette.high, borderRadius: 12, borderWidth: 1, color: palette.text, fontSize: 16, paddingHorizontal: 16, paddingVertical: 12},
  largeField: {fontSize: 28, fontWeight: '900'},
  compactPicker: {marginVertical: 2},
  chip: {backgroundColor: palette.low, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9},
  activeChip: {backgroundColor: palette.primary},
  chipText: {color: palette.muted, fontWeight: '800'},
  activeChipText: {color: '#fff'},
  button: {alignItems: 'center', backgroundColor: palette.primary, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 15},
  buttonText: {color: '#fff', fontSize: 15, fontWeight: '900'},
  secondaryButton: {backgroundColor: palette.low},
  secondaryButtonText: {color: palette.primary},
  dangerButton: {backgroundColor: palette.dangerFixed},
  dangerButtonText: {color: palette.danger},
  iconButton: {alignItems: 'center', backgroundColor: palette.low, borderRadius: 999, height: 40, justifyContent: 'center', width: 40},
  iconButtonText: {color: palette.primary, fontSize: 20, fontWeight: '900'},
  infoRow: {alignItems: 'center', flexDirection: 'row', gap: 12, minHeight: 56},
  rowGlyph: {alignItems: 'center', backgroundColor: '#d9ffed', borderRadius: 10, height: 38, justifyContent: 'center', width: 38},
  rowGlyphText: {color: palette.primary, fontWeight: '900'},
  rowBody: {flex: 1},
  rowTitle: {color: palette.text, fontSize: 15, fontWeight: '800'},
  rowSubtitle: {color: palette.muted, fontSize: 12, marginTop: 2},
  rowValue: {color: palette.text, fontSize: 15, fontWeight: '900'},
  negative: {color: palette.danger},
  chevron: {color: palette.outline, fontSize: 28},
  successBadge: {alignItems: 'center', alignSelf: 'center', backgroundColor: '#d9ffed', borderRadius: 999, height: 116, justifyContent: 'center', width: 116},
  successText: {color: palette.primary, fontSize: 42, fontWeight: '900'},
  authIntro: {alignItems: 'center', gap: 14},
  pinRow: {flexDirection: 'row', gap: 10, justifyContent: 'center'},
  pinBox: {alignItems: 'center', backgroundColor: palette.surface, borderColor: palette.high, borderRadius: 12, borderWidth: 1, height: 56, justifyContent: 'center', width: 56},
  pinText: {color: palette.text, fontSize: 28, fontWeight: '900'},
  keypad: {flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center'},
  key: {alignItems: 'center', backgroundColor: palette.surface, borderRadius: 14, height: 58, justifyContent: 'center', width: '28%'},
  keyText: {color: palette.text, fontSize: 18, fontWeight: '800'},
  cardLabel: {color: palette.muted, fontSize: 13, fontWeight: '800'},
  balance: {color: palette.text, fontSize: 34, fontWeight: '900', letterSpacing: 0},
  metricGrid: {flexDirection: 'row', gap: 8},
  metric: {backgroundColor: palette.surface, borderRadius: 10, flex: 1, padding: 10},
  metricLabel: {color: palette.muted, fontSize: 11, fontWeight: '800'},
  metricValue: {color: palette.text, fontSize: 14, fontWeight: '900', marginTop: 4},
  cardHeader: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'},
  progressTrack: {backgroundColor: palette.container, borderRadius: 999, height: 10, overflow: 'hidden'},
  progressFill: {backgroundColor: palette.primaryContainer, borderRadius: 999, height: 10},
  chart: {alignItems: 'flex-end', flexDirection: 'row', gap: 10, height: 130, justifyContent: 'space-between'},
  chartBarNative: {backgroundColor: palette.secondary, borderRadius: 999, flex: 1, maxWidth: 48},
  donut: {alignItems: 'center', alignSelf: 'center', backgroundColor: palette.primaryContainer, borderColor: palette.secondary, borderRadius: 999, borderWidth: 34, height: 170, justifyContent: 'center', width: 170},
  donutHole: {backgroundColor: palette.surface, borderRadius: 999, height: 72, width: 72},
  segment: {backgroundColor: palette.container, borderRadius: 12, flexDirection: 'row', gap: 8, padding: 8},
  search: {backgroundColor: palette.surface, borderColor: palette.high, borderRadius: 999, borderWidth: 1, color: palette.muted, fontSize: 15, paddingHorizontal: 18, paddingVertical: 12},
  detailAmount: {color: palette.danger, fontSize: 42, fontWeight: '900'},
  receipt: {alignItems: 'center', backgroundColor: palette.low, borderRadius: 12, height: 130, justifyContent: 'center'},
  actionGrid: {flexDirection: 'row', gap: 10},
  profileTop: {alignItems: 'center', flexDirection: 'row', gap: 14},
  switchTrack: {backgroundColor: palette.high, borderRadius: 999, height: 28, justifyContent: 'center', padding: 3, width: 52},
  switchOn: {backgroundColor: palette.primaryContainer},
  switchThumb: {backgroundColor: palette.surface, borderRadius: 999, height: 22, width: 22},
  switchThumbOn: {transform: [{translateX: 24}]},
  swatch: {borderRadius: 999, height: 38, width: 38},
  tabBar: {alignSelf: 'center', backgroundColor: palette.surface, borderColor: palette.high, borderRadius: 18, borderWidth: 1, bottom: 16, flexDirection: 'row', gap: 4, left: 16, maxWidth: 620, padding: 8, position: 'absolute', right: 16},
  tabItem: {alignItems: 'center', borderRadius: 12, flex: 1, paddingVertical: 11},
  activeTab: {backgroundColor: '#d9ffed'},
  addTab: {backgroundColor: palette.primary},
  tabText: {color: palette.muted, fontSize: 11, fontWeight: '800'},
  activeTabText: {color: palette.primary},
  addTabText: {color: '#fff'},
});

export default App;
