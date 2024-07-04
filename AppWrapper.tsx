import {AppProvider, UserProvider} from '@realm/react';
import RealmWrapper from './RealmWrapper';
import React from 'react';
function AppWrapper(): JSX.Element {
  return (
    <AppProvider id="task-ineybnu">
      <UserProvider fallback={<RealmWrapper />}>
        <RealmWrapper />
      </UserProvider>
    </AppProvider>
  );
}

export default AppWrapper;
