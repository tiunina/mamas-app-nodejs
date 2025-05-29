import TaskCollection from '../db/models/task.js';

export const getTasks = () => TaskCollection.find();
export const getTaskById = (id) => TaskCollection.findById(id);
