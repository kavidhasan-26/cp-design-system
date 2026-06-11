import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
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
      {children}
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

export function CodeBlock({ children, copyable = false }: { children: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [children]);

  if (!copyable) {
    return <Text style={docStyles.codeBlock}>{children}</Text>;
  }

  return (
    <View style={docStyles.codeBlockWrapper}>
      <Pressable
        accessibilityLabel={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
        accessibilityRole="button"
        onPress={handleCopy}
        style={({ pressed }) => [docStyles.copyButton, pressed ? { opacity: 0.8 } : null]}
      >
        <Text style={docStyles.copyButtonLabel}>{copied ? 'Copied' : 'Copy'}</Text>
      </Pressable>
      <Text selectable style={docStyles.codeBlockText}>
        {children}
      </Text>
    </View>
  );
}
