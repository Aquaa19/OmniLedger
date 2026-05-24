import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {BottomTabs} from './src/components/BottomTabs';
import {styles} from './src/components/styles';
import {AppNavigator} from './src/navigation/AppNavigator';
import {Route, tabs} from './src/navigation/types';
import {palette} from './src/theme/palette';

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
      <AppNavigator route={route} go={go} back={back} />
      {tabs.includes(route) ? <BottomTabs active={route} go={go} /> : null}
    </View>
  );
}

export default App;
