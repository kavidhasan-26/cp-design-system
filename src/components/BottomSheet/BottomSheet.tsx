import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Button } from '../Button';
import { ButtonGroup, type ButtonGroupButtonConfig } from '../ButtonGroup';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../icons/CloseIcon';
import {
  bottomSheetSpecs,
  getBottomSheetStyles,
  type BottomSheetActions,
  type BottomSheetFooter,
  type BottomSheetHeight,
  type BottomSheetLayout,
  type BottomSheetMaxHeight,
} from './bottomSheetStyles';
import { resolveMaxHeight, resolveSheetHeight } from './resolveBottomSheetHeight';

export type {
  BottomSheetActions,
  BottomSheetFooter,
  BottomSheetHeight,
  BottomSheetLayout,
  BottomSheetMaxHeight,
} from './bottomSheetStyles';

export type BottomSheetProps = {
  /** Figma property: Footer — fixed pins actions and scrolls the body; inline keeps actions in the scroll flow. */
  footer?: BottomSheetFooter;
  /** Figma property: Actions — single primary button or a full-width button group. */
  actions?: BottomSheetActions;
  /** Figma property: Layout — default shows title/subtext; custom-background uses background + content slots. */
  layout?: BottomSheetLayout;
  /** Figma property: Title */
  title?: string;
  /** Figma property: Subtext */
  subtext?: string;
  /** Figma property: Show close */
  showClose?: boolean;
  /** Sheet container height mode. fit-content hugs content up to maxHeight. */
  height?: BottomSheetHeight;
  /** Maximum sheet height relative to the viewport/container. Defaults to 90%. */
  maxHeight?: BottomSheetMaxHeight;
  /** Optional container height override — useful in Storybook frames. Defaults to window height. */
  containerHeight?: number;
  /** Main content slot. */
  children?: ReactNode;
  /** Custom-background layout only — absolute background layer behind the header and body. */
  backgroundContent?: ReactNode;
  /** Primary button label when actions=primary. */
  primaryLabel?: string;
  onPrimaryPress?: () => void;
  /** Button-group slot configs when actions=button-group. */
  buttons?: ButtonGroupButtonConfig[];
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function BottomSheetHeader({
  showClose,
  onClose,
  styles,
  testID,
}: {
  showClose: boolean;
  onClose?: () => void;
  styles: ReturnType<typeof getBottomSheetStyles>;
  testID?: string;
}) {
  if (!showClose) {
    return null;
  }

  return (
    <View style={styles.header}>
      <IconButton
        accessibilityLabel="Close"
        compact
        hitSlop={8}
        icon={<CloseIcon color={bottomSheetSpecs.colors.closeIcon} size={bottomSheetSpecs.closeIconSize} />}
        iconSize={bottomSheetSpecs.closeIconSize}
        onPress={onClose}
        size="small"
        style={styles.closeButton}
        testID={testID ? `${testID}-close` : undefined}
        variant="ghost"
      />
    </View>
  );
}

function BottomSheetTitleBlock({
  title,
  subtext,
  styles,
}: {
  title: string;
  subtext?: string;
  styles: ReturnType<typeof getBottomSheetStyles>;
}) {
  return (
    <View style={styles.titleBlock}>
      <Text style={styles.title}>{title}</Text>
      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
    </View>
  );
}

function BottomSheetFooter({
  actions,
  primaryLabel,
  onPrimaryPress,
  buttons,
  footer,
  styles,
  testID,
}: {
  actions: BottomSheetActions;
  primaryLabel: string;
  onPrimaryPress?: () => void;
  buttons?: ButtonGroupButtonConfig[];
  footer: BottomSheetFooter;
  styles: ReturnType<typeof getBottomSheetStyles>;
  testID?: string;
}) {
  return (
    <View
      style={[
        styles.footer,
        footer === 'fixed' ? styles.footerFixed : styles.footerInline,
      ]}
      testID={testID ? `${testID}-footer` : undefined}
    >
      {actions === 'button-group' ? (
        <ButtonGroup
          buttons={buttons}
          count={2}
          fullWidth
          layout="row"
          primaryPosition="end"
          testID={testID ? `${testID}-actions` : undefined}
          variant="primary-secondary"
        />
      ) : (
        <Button
          fullWidth
          hierarchy="primary"
          label={primaryLabel}
          onPress={onPrimaryPress}
          testID={testID ? `${testID}-primary` : undefined}
        />
      )}
    </View>
  );
}

function BottomSheetScrollContent({
  layout,
  showTitleBlock,
  title,
  subtext,
  children,
  styles,
  scrollEnabled,
  contentContainerStyle,
  onContentSizeChange,
  bodyStyle,
}: {
  layout: BottomSheetLayout;
  showTitleBlock: boolean;
  title: string;
  subtext?: string;
  children?: ReactNode;
  styles: ReturnType<typeof getBottomSheetStyles>;
  scrollEnabled: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onContentSizeChange?: (width: number, height: number) => void;
  bodyStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollBodyContent, contentContainerStyle]}
      nestedScrollEnabled
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={scrollEnabled}
      style={[styles.scrollBody, bodyStyle]}
    >
      {layout === 'default' && showTitleBlock ? (
        <BottomSheetTitleBlock subtext={subtext} styles={styles} title={title} />
      ) : null}
      <View style={styles.contentSlot}>{children}</View>
    </ScrollView>
  );
}

export function BottomSheet({
  footer = 'fixed',
  actions = 'primary',
  layout = 'default',
  title = 'Title',
  subtext = 'Subtext',
  showClose = true,
  height = 'fit-content',
  maxHeight = bottomSheetSpecs.defaultMaxHeight,
  containerHeight,
  children,
  backgroundContent,
  primaryLabel = 'Button',
  onPrimaryPress,
  buttons,
  onClose,
  style,
  testID,
}: BottomSheetProps) {
  const { height: windowHeight } = useWindowDimensions();
  const resolvedContainerHeight = containerHeight ?? windowHeight;
  const maxHeightPx = resolveMaxHeight(maxHeight, resolvedContainerHeight);
  const sheetHeight = resolveSheetHeight(height, maxHeightPx, resolvedContainerHeight);
  const styles = getBottomSheetStyles(footer, layout);
  const showTitleBlock = layout === 'default' && (title.length > 0 || !!subtext);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [forceMaxHeight, setForceMaxHeight] = useState(false);
  const isHeightConstrained = height !== 'fit-content' || forceMaxHeight;

  const effectiveSheetHeight =
    sheetHeight ?? (forceMaxHeight && height === 'fit-content' ? maxHeightPx : undefined);

  const rootStyle: ViewStyle = {
    maxHeight: maxHeightPx,
  };

  if (effectiveSheetHeight !== undefined) {
    rootStyle.height = effectiveSheetHeight;
  }

  const availableBodyHeight = Math.max(bodyHeight, 0);
  const scrollEnabled =
    footer === 'inline'
      ? isHeightConstrained
      : isHeightConstrained || (availableBodyHeight > 0 && contentHeight > availableBodyHeight);

  const bodyStyle: ViewStyle | undefined =
    footer === 'fixed' && (isHeightConstrained || scrollEnabled)
      ? { flexGrow: 1, flexShrink: 1, minHeight: 0 }
      : undefined;

  function handleRootLayout(event: LayoutChangeEvent) {
    if (height !== 'fit-content' || forceMaxHeight) {
      return;
    }

    if (event.nativeEvent.layout.height >= maxHeightPx - 1) {
      setForceMaxHeight(true);
    }
  }

  function handleBodyLayout(event: LayoutChangeEvent) {
    setBodyHeight(event.nativeEvent.layout.height);
  }

  function handleContentSizeChange(_width: number, nextContentHeight: number) {
    setContentHeight(nextContentHeight);
  }

  const footerNode = (
    <BottomSheetFooter
      actions={actions}
      buttons={buttons}
      footer={footer}
      onPrimaryPress={onPrimaryPress}
      primaryLabel={primaryLabel}
      styles={styles}
      testID={testID}
    />
  );

  if (footer === 'inline') {
    return (
      <View
        accessibilityRole="none"
        onLayout={handleRootLayout}
        style={[styles.root, rootStyle, style]}
        testID={testID}
      >
        {layout === 'custom-background' && backgroundContent ? (
          <View pointerEvents="none" style={styles.backgroundLayer}>
            {backgroundContent}
          </View>
        ) : null}

        <ScrollView
          contentContainerStyle={styles.inlineBodyContent}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={scrollEnabled}
          style={styles.inlineBody}
        >
          <BottomSheetHeader onClose={onClose} showClose={showClose} styles={styles} testID={testID} />

          <View style={styles.contentBody}>
            {layout === 'default' && showTitleBlock ? (
              <BottomSheetTitleBlock subtext={subtext} styles={styles} title={title} />
            ) : null}

            <View style={styles.contentSlot}>{children}</View>
          </View>

          {footerNode}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      accessibilityRole="none"
      onLayout={handleRootLayout}
      style={[styles.root, rootStyle, style]}
      testID={testID}
    >
      {layout === 'custom-background' && backgroundContent ? (
        <View pointerEvents="none" style={styles.backgroundLayer}>
          {backgroundContent}
        </View>
      ) : null}

      <BottomSheetHeader onClose={onClose} showClose={showClose} styles={styles} testID={testID} />

      <View onLayout={handleBodyLayout} style={bodyStyle ?? styles.scrollBody}>
        <BottomSheetScrollContent
          bodyStyle={bodyStyle ? { flex: 1 } : undefined}
          children={children}
          contentContainerStyle={layout === 'custom-background' ? styles.contentSlot : undefined}
          layout={layout}
          onContentSizeChange={handleContentSizeChange}
          scrollEnabled={scrollEnabled}
          showTitleBlock={showTitleBlock}
          styles={styles}
          subtext={subtext}
          title={title}
        />
      </View>

      {footerNode}
    </View>
  );
}

export { bottomSheetSpecs, getBottomSheetStyles } from './bottomSheetStyles';
export { resolveMaxHeight, resolveSheetHeight } from './resolveBottomSheetHeight';
