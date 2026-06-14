import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { reactNativeSvgCjsPlugin } from './reactNativeSvgCjsPlugin';

const storybookDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(storybookDir, '..');
const reactNativeWeb = path.resolve(projectRoot, 'node_modules/react-native-web');
const reactNativeSvgWeb = path.resolve(
  projectRoot,
  'node_modules/react-native-svg/lib/module/ReactNativeSVG.web.js',
);
const codegenNativeComponentStub = path.resolve(storybookDir, 'codegenNativeComponentStub.js');
const reactNativeAssetRegistry = path.resolve(storybookDir, 'assetRegistryStub.js');

/** GitHub Pages serves project sites from /{repo-name}/ — set STORYBOOK_BASE_PATH in CI. */
const storybookBasePath = process.env.STORYBOOK_BASE_PATH ?? '/';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  managerHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      .sidebar-header img {
        height: 28px;
        width: auto;
        max-width: 132px;
        object-fit: contain;
      }

      .sidebar-header a {
        align-items: center;
        display: flex;
        gap: 10px;
        min-height: 40px;
        padding-bottom: 4px;
        padding-top: 4px;
      }

      .sidebar-header div:last-child {
        color: #c6c6c6;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.01em;
        line-height: 1.2;
      }
    </style>
  `,
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: storybookBasePath,
      plugins: [reactNativeSvgCjsPlugin()],
      resolve: {
        alias: [
          {
            find: '@react-native/assets-registry/registry',
            replacement: reactNativeAssetRegistry,
          },
          {
            find: 'react-native/Libraries/Utilities/codegenNativeComponent',
            replacement: codegenNativeComponentStub,
          },
          {
            find: 'react-native-svg',
            replacement: reactNativeSvgWeb,
          },
          {
            find: 'react-native',
            replacement: reactNativeWeb,
          },
        ],
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.jsx', '.web.js', '.jsx', '.js'],
      },
      optimizeDeps: {
        exclude: ['react-native-svg'],
        esbuildOptions: {
          alias: {
            '@react-native/assets-registry/registry': reactNativeAssetRegistry,
            'react-native/Libraries/Utilities/codegenNativeComponent': codegenNativeComponentStub,
            'react-native-svg': reactNativeSvgWeb,
          },
        },
      },
      define: {
        __DEV__: JSON.stringify(true),
      },
    });
  },
};

export default config;
