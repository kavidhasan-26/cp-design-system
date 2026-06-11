import type { Plugin } from 'vite';

const cjsExtractFiles = [
  '/lib/module/lib/extract/transform.js',
  '/lib/module/lib/extract/transformToRn.js',
];

/** react-native-svg ships PEG parsers as CJS; Vite needs ESM named exports in the browser. */
export function reactNativeSvgCjsPlugin(): Plugin {
  return {
    name: 'react-native-svg-cjs-exports',
    transform(code, id) {
      if (!cjsExtractFiles.some((segment) => id.includes(segment))) {
        return null;
      }

      if (!code.includes('module.exports')) {
        return null;
      }

      const exportMatch = code.match(/module\.exports\s*=\s*\{([\s\S]*?)\};?/);
      if (!exportMatch) {
        return null;
      }

      const exports = exportMatch[1]
        .split(',')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const separatorIndex = line.indexOf(':');
          const key = line.slice(0, separatorIndex).trim();
          const value = line.slice(separatorIndex + 1).trim();
          return `export const ${key} = ${value};`;
        })
        .join('\n');

      return {
        code: code.replace(/module\.exports\s*=\s*\{[\s\S]*?\};?/, exports),
        map: null,
      };
    },
  };
}
