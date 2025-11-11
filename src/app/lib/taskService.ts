import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
import { Task } from '../types/task';

export const addTask = async (task: Omit<Task, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      ...task,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const getTasks = async (userEmail: string): Promise<Task[]> => {
  try {
    const q = query(
      collection(db, 'tasks'), 
      where('userEmail', '==', userEmail),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Task));
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  }
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  try {
    await updateDoc(doc(db, 'tasks', id), updates);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'tasks', id));
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};