import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {accounts, budgets, categories, transactions} from '../data/mockData';
import {Button, Card, CategoryRow, ChartCard, Chip, Field, IconButton, InfoRow, Metric, PickerField, Progress, SearchField} from '../components/ui';
import {styles} from '../components/styles';
import {Shell} from '../layouts/Shell';
import {Nav} from '../navigation/types';

export function DashboardScreen({nav}: {nav: Nav}) {
  return (
    <Shell title="Dashboard" action={<IconButton label="!" onPress={() => nav.go('Notifications')} />}>
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
        {categories.slice(0, 3).map(item => <CategoryRow key={item[0]} item={item} />)}
      </Card>
      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Recent transactions</Text>
          <Pressable onPress={() => nav.go('Transactions')}><Text style={styles.link}>View all</Text></Pressable>
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

export function TransactionsScreen({nav}: {nav: Nav}) {
  return (
    <Shell title="Transactions" action={<Pressable onPress={() => nav.go('AdvancedFilter')}><Text style={styles.link}>Filter</Text></Pressable>}>
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

export function TransactionFormScreen({nav}: {nav: Nav}) {
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

export function ReportsScreen({nav}: {nav: Nav}) {
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
        {categories.slice(0, 4).map(item => <CategoryRow key={item[0]} item={item} onPress={() => nav.go('Transactions')} />)}
      </Card>
      <Button label="Export Report" onPress={() => nav.go('ExportData')} />
    </Shell>
  );
}

export function ProfileScreen({nav}: {nav: Nav}) {
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

export function AccountsScreen({nav}: {nav: Nav}) {
  return (
    <Shell title="Accounts" back={nav.back}>
      <Card accent>
        <Text style={styles.cardLabel}>Total net worth</Text>
        <Text style={styles.balance}>$20,510.32</Text>
      </Card>
      <Card>
        {accounts.map(item => <InfoRow key={item[0]} title={item[0]} subtitle={item[1]} value={item[2]} onPress={() => nav.go('AddEditAccount')} />)}
      </Card>
      <Button label="Add New Account" onPress={() => nav.go('AddEditAccount')} />
      <Button label="Transfer Funds" variant="secondary" onPress={() => nav.go('AddTransaction')} />
    </Shell>
  );
}

export function BudgetsScreen({nav}: {nav: Nav}) {
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

export function CategoriesScreen({nav}: {nav: Nav}) {
  return (
    <Shell title="Categories" back={nav.back}>
      <View style={styles.rowWrap}>
        <Chip label="Expense" active />
        <Chip label="Income" />
      </View>
      <Card>
        {categories.map(item => <CategoryRow key={item[0]} item={item} onPress={() => nav.go('AddEditCategory')} />)}
      </Card>
      <Button label="Add New Category" onPress={() => nav.go('AddEditCategory')} />
    </Shell>
  );
}
