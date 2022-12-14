import React from 'react';

import { Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  Layout,
  ErrorComponent,
  AuthPage
} from '@pankod/refine-antd';

import '@pankod/refine-antd/dist/styles.min.css';
import routerProvider from '@pankod/refine-react-router-v6';
import { dataProvider, liveProvider } from '@pankod/refine-supabase';
import { supabaseClient } from './utility';
import authProvider from './authProvider';

import { Home } from './pages';

function App() {
  return (
    <Refine
      notificationProvider={notificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
      dataProvider={dataProvider(supabaseClient)}
      liveProvider={liveProvider(supabaseClient)}
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: '/register',
            element: <AuthPage type='register' />
          },
          {
            path: '/forgot-password',
            element: <AuthPage type='forgotPassword' />
          },
          {
            path: '/update-password',
            element: <AuthPage type='updatePassword' />
          }
        ]
      }}
      LoginPage={() => <AuthPage type='login' />}
      resources={[
        {
          name: 'dashboard',
          list: () => <Home />
        }
      ]}
    />
  );
}

export default App;
