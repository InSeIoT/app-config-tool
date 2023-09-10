'use client';

import { ConfigProvider, theme } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import React from 'react';

export default function AntDProvider ({
  children
}: {
    children: React.ReactNode
  }) {
  return (
    <ConfigProvider
      locale={esES} theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ca8a04'
        },
        components: {
          Input: {
            colorBgContainer: '#332c42'
          },
          Typography: {
            colorText: '#fff'
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}