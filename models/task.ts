import {createRealmContext} from '@realm/react';
import {BSON, Object} from 'realm';

export class Task extends Object {
  _id!: BSON.ObjectId;
  title!: string;
  description!: string;

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      title: 'string',
    },
  };
}

export const RealmContext = createRealmContext({
  schema: [Task],
});
