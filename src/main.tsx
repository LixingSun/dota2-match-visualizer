/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppLayout from '@/components/AppLayout.tsx';
import { ConfigProvider, Flex, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const Match = lazy(() => import('@/pages/Match/Match'));
const Players = lazy(() => import('@/pages/Players/Players'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={customTheme}>
      <BrowserRouter>
        <AppLayout>
          <Suspense
            fallback={
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <LoadingOutlined style={{ fontSize: 32 }} />
              </Flex>
            }
          >
            <Routes>
              <Route path="" element={<Match />} />
              <Route path="players" element={<Players />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
