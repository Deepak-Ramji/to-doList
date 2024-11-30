import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },   // Default route redirects to 'todo'
  { path: 'todo', component: TodoComponent },           // Route for the to-do list
  { path: 'add-task', component: AddTaskComponent },    // Route for add task
  { path: 'edit-task/:id', component: EditTaskComponent }, // Route for editing a specific task
  { path: '**', redirectTo: 'todo' },                   // Fallback for unknown routes
];
