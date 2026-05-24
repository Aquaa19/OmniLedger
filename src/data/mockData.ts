import {palette} from '../theme/palette';

export const transactions = [
  ['Fresh Market', 'Groceries - Everyday Checking', '-$84.20', 'Today'],
  ['Design Retainer', 'Salary - Bank transfer', '+$2,400.00', 'Today'],
  ['Metro Card', 'Transport - Travel Wallet', '-$32.00', 'Yesterday'],
  ['Cloud Storage', 'Subscriptions - Rewards Card', '-$12.99', 'Yesterday'],
];

export const categories = [
  ['Groceries', '24 transactions', palette.primaryContainer],
  ['Transport', '13 transactions', palette.secondary],
  ['Dining', '18 transactions', palette.tertiary],
  ['Subscriptions', '8 transactions', palette.danger],
  ['Salary', '2 transactions', palette.primary],
];

export const budgets = [
  ['Groceries', '$640 used of $900', 0.71],
  ['Dining', '$330 used of $500', 0.66],
  ['Transport', '$180 used of $300', 0.6],
  ['Subscriptions', '$124 used of $160', 0.78],
];

export const accounts = [
  ['Everyday Checking', 'Bank account', '$8,430.50'],
  ['Cash Wallet', 'Cash', '$220.00'],
  ['Rewards Card', 'Credit card', '-$940.18'],
  ['Emergency Savings', 'Savings', '$12,800.00'],
];
