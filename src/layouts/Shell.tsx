import React from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {IconButton} from '../components/ui';
import {styles} from '../components/styles';

export function Shell({
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
