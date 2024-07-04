import {useApp} from '@realm/react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {Credentials, OpenRealmBehaviorType} from 'realm';
import React, {useEffect, useState} from 'react';
import App from './App';
import {RealmContext} from './models/task';
const {RealmProvider} = RealmContext;
function RealmWrapper(): JSX.Element {
  const app = useApp();
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      const credetials = Credentials.anonymous();
      await app.logIn(credetials);
      setIsLogedIn(true);
    };
    login();
  }, [app]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLogedIn ? (
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: {
              type: OpenRealmBehaviorType.DownloadBeforeOpen,
            },
            existingRealmFileBehavior: {
              type: OpenRealmBehaviorType.OpenImmediately,
            },
          }}>
          <App />
        </RealmProvider>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
}

export default RealmWrapper;
