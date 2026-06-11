import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { docTheme } from '../foundations/docTheme';

export type IconGalleryItem = {
  name: string;
  icon: ReactNode;
};

export type IconGallerySection = {
  title: string;
  items: IconGalleryItem[];
};

type IconGalleryProps = {
  title?: string;
  sections: IconGallerySection[];
};

/** Carbon-style icon gallery — dashed preview cells with monospace slug labels. */
export function IconGallery({ title = 'Gallery', sections }: IconGalleryProps) {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {sections.map((section, index) => (
          <View
            key={section.title}
            style={[styles.section, index > 0 ? styles.sectionDivider : null]}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.grid}>
              {section.items.map((item) => (
                <View key={item.name} style={styles.cell}>
                  <View style={styles.preview}>{item.icon}</View>
                  <Text style={styles.label}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const previewSize = 104;

const styles = StyleSheet.create({
  page: {
    alignSelf: 'center',
    gap: docTheme.space.lg,
    maxWidth: 720,
    paddingHorizontal: docTheme.layout.pagePadding,
    paddingVertical: docTheme.layout.pagePadding,
    width: '100%',
  },
  title: {
    color: docTheme.colors.text,
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  container: {
    borderColor: docTheme.colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: docTheme.space.xl,
  },
  section: {
    gap: docTheme.space.lg,
  },
  sectionDivider: {
    borderTopColor: docTheme.colors.border,
    borderTopWidth: 1,
    marginTop: docTheme.space.xl,
    paddingTop: docTheme.space.xl,
  },
  sectionTitle: {
    color: docTheme.colors.text,
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: docTheme.space.xl,
  },
  cell: {
    alignItems: 'center',
    gap: docTheme.space.md,
    width: previewSize,
  },
  preview: {
    alignItems: 'center',
    borderColor: docTheme.colors.border,
    borderRadius: 4,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 80,
    justifyContent: 'center',
    width: previewSize,
  },
  label: {
    color: docTheme.colors.textSecondary,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
