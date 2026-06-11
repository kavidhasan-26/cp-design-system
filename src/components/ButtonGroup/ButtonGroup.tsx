import { StyleSheet, View } from 'react-native';
import { Button } from '../Button';
import { buttonGroupSpecs, getButtonGroupStyles } from './buttonGroupStyles';
import { resolveSlotHierarchies } from './orderHierarchies';
import {
  resolveCombination,
  resolveCount,
  resolvePrimaryPosition,
} from './resolveButtonGroup';
import type { ButtonGroupProps } from './types';

export function ButtonGroup({
  layout = 'row',
  size = 'normal',
  fullWidth = false,
  count,
  combination,
  primaryPosition,
  hierarchies,
  buttons,
  style,
  testID,
}: ButtonGroupProps) {
  const resolvedCombination = resolveCombination(
    layout,
    count ?? (layout === 'row' ? 2 : 3),
    combination,
  );
  const resolvedCount = resolveCount(layout, count, resolvedCombination);
  const resolvedPrimaryPosition = resolvePrimaryPosition(primaryPosition);
  const slotHierarchies = resolveSlotHierarchies(
    resolvedCombination,
    resolvedCount,
    resolvedPrimaryPosition,
    hierarchies,
    buttons,
  );

  return (
    <View
      style={[
        styles.group,
        layout === 'row' ? styles.row : styles.column,
        getButtonGroupStyles(fullWidth),
        style,
      ]}
      testID={testID}
    >
      {slotHierarchies.map((hierarchy, index) => {
        const slot = buttons?.[index];

        return (
          <View
            key={`${hierarchy}-${index}`}
            style={layout === 'row' ? styles.rowItem : styles.columnItem}
          >
            <Button
              disabled={slot?.disabled}
              fullWidth
              hierarchy={hierarchy}
              iconLeading={slot?.iconLeading}
              iconTrailing={slot?.iconTrailing}
              label={slot?.label ?? 'Button'}
              onPress={slot?.onPress}
              size={size}
              state={slot?.state}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: buttonGroupSpecs.gap,
  },
  row: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  rowItem: {
    flex: 1,
    minWidth: 0,
  },
  columnItem: {
    alignSelf: 'stretch',
  },
});
