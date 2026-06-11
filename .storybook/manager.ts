import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import carepayLogo from './assets/carepay-logo.png';

addons.setConfig({
  panelPosition: 'bottom',
  enableShortcuts: true,
  sidebar: {
    showRoots: true,
  },
  theme: create({
    base: 'dark',
    brandTitle: 'Design System',
    brandUrl: './',
    brandImage: carepayLogo,
    brandTarget: '_self',
    colorPrimary: '#514c9f',
    colorSecondary: '#736fb2',
    appBg: '#161616',
    appContentBg: '#262626',
    appBorderColor: '#393939',
    textColor: '#f4f4f4',
    textMutedColor: '#c6c6c6',
    barTextColor: '#f4f4f4',
    barSelectedColor: '#514c9f',
    barBg: '#262626',
    inputBg: '#393939',
    inputBorder: '#525252',
    fontBase: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  }),
});
