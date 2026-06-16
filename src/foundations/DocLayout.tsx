import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DocPageSections } from '../storybook/DocCodeBlock';
import { docStyles } from './docTheme';

type DocPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function DocPage({ title, description, children }: DocPageProps) {
  return (
    <ScrollView style={docStyles.scroll} contentContainerStyle={docStyles.content}>
      <View style={docStyles.pageHeader}>
        <Text style={docStyles.pageTitle}>{title}</Text>
        <Text style={docStyles.pageDescription}>{description}</Text>
      </View>
      <DocPageSections>{children}</DocPageSections>
    </ScrollView>
  );
}

type DocSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DocSection({ title, description, children }: DocSectionProps) {
  return (
    <View style={docStyles.section}>
      <View style={docStyles.sectionHeader}>
        <Text style={docStyles.sectionTitle}>{title}</Text>
        {description ? <Text style={docStyles.sectionDescription}>{description}</Text> : null}
      </View>
      {children}
    </View>
  );
}

export function TokenList({ children }: { children: ReactNode }) {
  return <View style={docStyles.list}>{children}</View>;
}

type TokenRowProps = {
  children: ReactNode;
  compact?: boolean;
};

export function TokenRow({ children, compact }: TokenRowProps) {
  return <View style={[docStyles.listRow, compact && docStyles.listRowCompact]}>{children}</View>;
}
