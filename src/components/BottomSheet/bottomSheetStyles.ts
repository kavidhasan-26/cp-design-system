import type { TextStyle, ViewStyle } from 'react-native';
import { neutral } from '../../tokens/primitives/colors';
import { surface, text } from '../../tokens/semantic/colors';
import { radius } from '../../tokens/radius';
import { space } from '../../tokens/spacing';
import { getTypographyStyle } from '../../tokens/typography';

export type BottomSheetFooter = 'fixed' | 'inline';
export type BottomSheetActions = 'primary' | 'button-group';
export type BottomSheetLayout = 'default' | 'custom-background';
export type BottomSheetHeight = 'fit-content' | 'medium' | 'large' | number;
export type BottomSheetMaxHeight = number | `${number}%`;

/** Pixel-perfect Bottomsheet specs from Figma component set (node 347:584). */
export const bottomSheetSpecs = {
  width: 375,
  topRadius: radius[5],
  headerPaddingVertical: space[10],
  headerPaddingHorizontal: space[8],
  contentPaddingHorizontal: space[8],
  contentPaddingBottom: space[8],
  contentPaddingBottomCustomBackground: space[0],
  contentGap: space[5],
  titleGap: space[3],
  footerPaddingTop: space[8],
  footerPaddingBottom: space[11],
  footerPaddingHorizontal: space[8],
  closeIconSize: 11,
  defaultMaxHeight: '90%' as const,
  colors: {
    sheet: surface.white,
    title: text.primary,
    subtext: text.secondary,
    closeIcon: text.primary,
    footerBorder: neutral[20],
  },
  titleStyle: getTypographyStyle('heading-5'),
  subtextStyle: getTypographyStyle('body-r3'),
} as const;

function getContentPaddingBottom(layout: BottomSheetLayout) {
  return layout === 'custom-background'
    ? bottomSheetSpecs.contentPaddingBottomCustomBackground
    : bottomSheetSpecs.contentPaddingBottom;
}

type BottomSheetStyles = {
  root: ViewStyle;
  backgroundLayer: ViewStyle;
  header: ViewStyle;
  closeButton: ViewStyle;
  scrollBody: ViewStyle;
  scrollBodyContent: ViewStyle;
  inlineBody: ViewStyle;
  inlineBodyContent: ViewStyle;
  contentBody: ViewStyle;
  titleBlock: ViewStyle;
  title: TextStyle;
  subtext: TextStyle;
  contentSlot: ViewStyle;
  footer: ViewStyle;
  footerFixed: ViewStyle;
  footerInline: ViewStyle;
};

export function getBottomSheetStyles(
  footer: BottomSheetFooter,
  layout: BottomSheetLayout,
): BottomSheetStyles {
  const contentPaddingBottom = getContentPaddingBottom(layout);

  return {
    root: {
      alignSelf: 'stretch',
      backgroundColor: bottomSheetSpecs.colors.sheet,
      borderTopLeftRadius: bottomSheetSpecs.topRadius,
      borderTopRightRadius: bottomSheetSpecs.topRadius,
      flexDirection: 'column',
      overflow: 'hidden',
      width: '100%',
    },
    backgroundLayer: {
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    header: {
      paddingHorizontal: bottomSheetSpecs.headerPaddingHorizontal,
      paddingVertical: bottomSheetSpecs.headerPaddingVertical,
      zIndex: 1,
    },
    closeButton: {
      alignSelf: 'flex-start',
    },
    scrollBody: {
      flexGrow: 0,
      flexShrink: 1,
    },
    scrollBodyContent: {
      gap: bottomSheetSpecs.contentGap,
      paddingBottom: contentPaddingBottom,
      paddingHorizontal: bottomSheetSpecs.contentPaddingHorizontal,
    },
    inlineBody: {
      flexGrow: 0,
      flexShrink: 1,
    },
    inlineBodyContent: {},
    contentBody: {
      gap: bottomSheetSpecs.contentGap,
      paddingBottom: contentPaddingBottom,
      paddingHorizontal: bottomSheetSpecs.contentPaddingHorizontal,
    },
    titleBlock: {
      gap: bottomSheetSpecs.titleGap,
    },
    title: {
      ...bottomSheetSpecs.titleStyle,
      color: bottomSheetSpecs.colors.title,
    },
    subtext: {
      ...bottomSheetSpecs.subtextStyle,
      color: bottomSheetSpecs.colors.subtext,
    },
    contentSlot: {
      minHeight: layout === 'custom-background' ? 100 : 0,
    },
    footer: {
      paddingBottom: bottomSheetSpecs.footerPaddingBottom,
      paddingHorizontal: bottomSheetSpecs.footerPaddingHorizontal,
      paddingTop: bottomSheetSpecs.footerPaddingTop,
    },
    footerFixed: {
      borderTopColor: bottomSheetSpecs.colors.footerBorder,
      borderTopWidth: footer === 'fixed' ? 1 : 0,
    },
    footerInline: {
      borderTopWidth: 0,
    },
  };
}
