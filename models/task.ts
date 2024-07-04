import {createRealmContext} from '@realm/react';
import {BSON, Object} from 'realm';

export class Task extends Object {
  _id!: BSON.ObjectID;
  title!: string;
  description!: string;

  static schema = {
    name: 'task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
    },
  };
}

export const RealmContext = createRealmContext({
  schema: [Task],
});
