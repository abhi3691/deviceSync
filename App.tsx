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

type TaskState = {
  title: string;
  description: string;
  taskId: BSON.ObjectId | null;
};

function App(): React.JSX.Element {
  const realm = useRealm();
  const tasks = useQuery(Task);

  const [taskState, setTaskState] = useState<TaskState>({
    title: '',
    description: '',
    taskId: null,
  });

  const addTask = useCallback(() => {
    realm.write(() => {
      realm.create('Task', {
        _id: new BSON.ObjectId(),
        title: taskState.title,
        description: taskState.description,
      });
    });
    setTaskState({title: '', description: '', taskId: null});
  }, [realm, taskState]);

  const updateTask = useCallback(() => {
    if (taskState.taskId) {
      realm.write(() => {
        let task = realm.objectForPrimaryKey('Task', taskState.taskId);
        if (task) {
          task.title = taskState.title;
          task.description = taskState.description;
        }
      });
      setTaskState({title: '', description: '', taskId: null});
    }
  }, [realm, taskState]);

  const deleteTask = useCallback(
    (id: BSON.ObjectId) => {
      realm.write(() => {
        let task = realm.objectForPrimaryKey('Task', id);
        if (task) {
          realm.delete(task);
        }
      });
      if (id.equals(taskState.taskId)) {
        setTaskState({title: '', description: '', taskId: null});
      }
    },
    [realm, taskState],
  );

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
          <View style={styles.taskItem}>
            <TouchableOpacity
              onPress={() => {
                setTaskState({
                  title: item.title,
                  description: item.description,
                  taskId: item._id,
                });
              }}>
              <Text>{`${item.title} - ${item.description}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item._id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={taskState.title}
          onChangeText={text => setTaskState({...taskState, title: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={taskState.description}
          onChangeText={text => setTaskState({...taskState, description: text})}
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
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default App;
