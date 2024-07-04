import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RealmContext, Task} from './models/task';
import {BSON} from 'realm';

const {useQuery, useRealm} = RealmContext;
function App(): React.JSX.Element {
  const realm = useRealm();
  const tasks = useQuery(Task);

  const addTask = useCallback(() => {
    realm.write(() => {
      realm.create('Task', {
        _id: new BSON.ObjectId(),
        title: 'walk the Dog',
        description: 'Bring a umbrella',
      });
    });
  }, [realm]);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <Text>{`${item.title} - ${item.description}`}</Text>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text>New Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'yello',
  },
});

export default App;
