import React from 'react';
import {Text, View} from 'react-native';
import {Button, Card, InfoRow} from '../components/ui';
import {styles} from '../components/styles';
import {Shell} from '../layouts/Shell';
import {Nav} from '../navigation/types';

export function TransactionDetailScreen({nav}: {nav: Nav}) {
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
