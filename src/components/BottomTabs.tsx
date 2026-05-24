import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Route} from '../navigation/types';
import {styles} from './styles';

export function BottomTabs({active, go}: {active: Route; go: (route: Route) => void}) {
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
