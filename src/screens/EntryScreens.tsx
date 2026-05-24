import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Button, BrandMark, Card, Chip, Field, InfoRow, PickerField, PinBoxes, ToggleRow} from '../components/ui';
import {styles} from '../components/styles';
import {Shell} from '../layouts/Shell';
import {Route} from '../navigation/types';

export function SplashScreen() {
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

export function OnboardingScreen({go}: {go: (route: Route) => void}) {
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

export function CreateProfileScreen({go, back}: {go: (route: Route) => void; back: () => void}) {
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

export function SecuritySetupScreen({go, back}: {go: (route: Route) => void; back: () => void}) {
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

export function OnboardingCompletionScreen({go}: {go: (route: Route) => void}) {
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

export function AuthenticationScreen({go}: {go: (route: Route) => void}) {
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
