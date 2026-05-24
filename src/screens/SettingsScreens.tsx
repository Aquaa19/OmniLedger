import React from 'react';
import {Text} from 'react-native';
import {Button, Card, InfoRow, PickerField, SearchField, ToggleRow} from '../components/ui';
import {styles} from '../components/styles';
import {Shell} from '../layouts/Shell';
import {Nav} from '../navigation/types';

export function SettingsSecurityScreen({nav}: {nav: Nav}) {
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

export function ExportDataScreen({nav}: {nav: Nav}) {
  return (
    <Shell title="Export Data" back={nav.back}>
      <Card>
        <InfoRow title="PDF" subtitle="Selected export format" value="On" />
        <InfoRow title="CSV" subtitle="Spreadsheet export" />
        <InfoRow title="JSON" subtitle="Raw archive export" />
      </Card>
      <PickerField label="Date range" value="May 1 - May 24, 2026" />
      <PickerField label="Account" value="All accounts" />
      <Card><ToggleRow title="Include attachments" subtitle="Receipts and note media" on /></Card>
      <Button label="Download Export" onPress={() => nav.go('EmptyErrorStates')} />
    </Shell>
  );
}

export function NotificationsScreen({nav}: {nav: Nav}) {
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

export function EmptyErrorStatesScreen({nav}: {nav: Nav}) {
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

export function HelpSupportScreen({nav}: {nav: Nav}) {
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

export function LegalComplianceScreen({nav}: {nav: Nav}) {
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
