import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppLayout from '@/components/AppLayout.tsx';
import { ConfigProvider, theme } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { primaryBgColor, primaryColor } from '@/styles/variables';

const customTheme = {
  algorithm: theme.darkAlgorithm,
  cssVar: true,
  token: {
    colorPrimary: primaryColor,
    colorBgBase: '#000000',
    colorLink: '#ffffff',
  },
  components: {
    Layout: {
      headerBg: primaryBgColor,
      siderBg: primaryBgColor,
      footerBg: primaryBgColor,
    },
    Menu: {
      darkItemBg: primaryBgColor,
    },
  },
};

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Match } = await import('@/pages/Match/Match');
      return { Component: Match };
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={customTheme}>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </ConfigProvider>
  </React.StrictMode>
);
