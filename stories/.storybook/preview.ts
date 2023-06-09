import type { Preview } from '@storybook/react';
import * as NextImage from 'next/image';

const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const customViewports = Object.entries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], index) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(index + 5) * 10}vh`,
        },
      },
    ];
  })
);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
};
