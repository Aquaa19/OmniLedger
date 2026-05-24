import React from 'react';
import {Text, View} from 'react-native';
import {Button, Card, Chip, Field, PickerField, Progress, Swatches, ToggleRow} from '../components/ui';
import {styles} from '../components/styles';
import {Shell} from '../layouts/Shell';
import {Nav} from '../navigation/types';

export function AddEditCategoryScreen({nav}: {nav: Nav}) {
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
        <Swatches />
      </Card>
      <Button label="Save Category" onPress={() => nav.go('Categories')} />
    </Shell>
  );
}

export function AddEditBudgetScreen({nav}: {nav: Nav}) {
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

export function AddEditAccountScreen({nav}: {nav: Nav}) {
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

export function AdvancedFilterScreen({nav}: {nav: Nav}) {
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
