import { Injectable } from '@angular/core';
import { Task } from './task.interface'; // Import the interface

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() {
    this.initializeTasks();
  }

  private initializeTasks(): void {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  getTask(index: number): Task | null {
    const tasks = this.getTasks();
    return tasks[index] || null;
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTaskByIndex(index: number, name: string): void {
    const tasks = this.getTasks();
    if (tasks[index]) {
      tasks[index].todotask = name;
      this.saveTasks(tasks);
    }
  }

  toggleTaskCompletion(index: number): void {
    const tasks = this.getTasks();
    if (tasks[index]) {
      tasks[index].completed = !tasks[index].completed;
      this.saveTasks(tasks);
    }
  }

  deleteTask(index: number): void {
    const tasks = this.getTasks();
    tasks.splice(index, 1); // Remove the task at the specified index
    this.saveTasks(tasks); // Save the updated list to local storage
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
