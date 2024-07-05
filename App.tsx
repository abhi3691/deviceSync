import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RealmContext, Task} from './models/task';
import {BSON} from 'realm';

const {useQuery, useRealm} = RealmContext;

function App(): React.JSX.Element {
  const realm = useRealm();
  const tasks = useQuery(Task);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState(null);

  const addTask = useCallback(() => {
    realm.write(() => {
      realm.create('Task', {
        _id: new BSON.ObjectId(),
        title,
        description,
      });
    });
    setTitle('');
    setDescription('');
  }, [realm, title, description]);

  const updateTask = useCallback(() => {
    if (taskId) {
      realm.write(() => {
        let task = realm.objectForPrimaryKey('Task', taskId);
        if (task) {
          task.title = title;
          task.description = description;
        }
      });
      setTitle('');
      setDescription('');
      setTaskId(null);
    }
  }, [realm, title, description, taskId]);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setTitle(item.title);
              setDescription(item.description);
              setTaskId(item._id);
            }}>
            <Text>{`${item.title} - ${item.description}`}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.title}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'black'}]}
          onPress={updateTask}>
          <Text style={styles.title}>Update Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
});

export default App;
