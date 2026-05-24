import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {palette} from '../theme/palette';
import {styles} from './styles';

export function BrandMark({size}: {size: number}) {
  return (
    <View style={[styles.brand, {height: size, width: size, borderRadius: size * 0.22}]}>
      <View style={[styles.brandCard, {height: size * 0.38, width: size * 0.58}]} />
      <View style={[styles.brandCoin, {height: size * 0.2, width: size * 0.2, right: size * 0.16, top: size * 0.16}]} />
    </View>
  );
}

export function Card({children, accent}: {children: React.ReactNode; accent?: boolean}) {
  return <View style={[styles.card, accent && styles.accentCard]}>{children}</View>;
}

export function Button({label, onPress, variant}: {label: string; onPress?: () => void; variant?: 'secondary' | 'danger'}) {
  return (
    <Pressable onPress={onPress} style={[styles.button, variant === 'secondary' && styles.secondaryButton, variant === 'danger' && styles.dangerButton]}>
      <Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryButtonText, variant === 'danger' && styles.dangerButtonText]}>{label}</Text>
    </Pressable>
  );
}

export function IconButton({label, onPress}: {label: string; onPress?: () => void}) {
  return (
    <Pressable onPress={onPress} style={styles.iconButton}>
      <Text style={styles.iconButtonText}>{label}</Text>
    </Pressable>
  );
}

export function Chip({label, active}: {label: string; active?: boolean}) {
  return (
    <View style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.chipText, active && styles.activeChipText]}>{label}</Text>
    </View>
  );
}

export function Field({label, value, large}: {label: string; value: string; large?: boolean}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput editable={false} value={value} style={[styles.field, large && styles.largeField]} />
    </View>
  );
}

export function PickerField({label, value, onPress, compact}: {label: string; value: string; onPress?: () => void; compact?: boolean}) {
  return (
    <Pressable onPress={onPress} style={compact ? styles.compactPicker : undefined}>
      <Field label={label} value={`${value}  >`} />
    </Pressable>
  );
}

export function SearchField({placeholder = 'Search merchant, amount, category'}: {placeholder?: string}) {
  return <TextInput editable={false} value={placeholder} style={styles.search} />;
}

export function InfoRow({title, subtitle, value, onPress}: {title: string; subtitle?: string; value?: string; onPress?: () => void}) {
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

export function CategoryRow({item, onPress}: {item: (string | number)[]; onPress?: () => void}) {
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

export function ToggleRow({title, subtitle, on}: {title: string; subtitle?: string; on?: boolean}) {
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

export function PinBoxes() {
  return (
    <View style={styles.pinRow}>
      {[0, 1, 2, 3].map(index => (
        <View key={index} style={styles.pinBox}><Text style={styles.pinText}>{index < 2 ? '*' : ''}</Text></View>
      ))}
    </View>
  );
}

export function Metric({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

export function Progress({value}: {value: number}) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, {width: `${Math.round(value * 100)}%`}]} />
    </View>
  );
}

export function ChartCard({title, circular}: {title: string; circular?: boolean}) {
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

export function Swatches() {
  return (
    <View style={styles.rowWrap}>
      {[palette.primaryContainer, palette.secondary, palette.tertiary, palette.danger].map(color => (
        <View key={color} style={[styles.swatch, {backgroundColor: color}]} />
      ))}
    </View>
  );
}
