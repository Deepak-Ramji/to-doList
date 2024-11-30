import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.interface';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  searchQuery: string = '';
  filteredTasks: Task[] = this.tasks;

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
  }

  updateSearchQuery(query: string): void {
    this.filteredTasks = this.tasks.filter((task) =>
      task.todotask.toLowerCase().includes(query.toLowerCase())  // Use todotask instead of name
    );
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
  }

  deleteTask(taskIndex: number): void {
    this.taskService.deleteTask(taskIndex);
    this.loadTasks(); 
  }

  openAddTaskPage(): void {
    this.router.navigate(['/add-task']);
  }

  navigateToEditTask(index: number): void {
    this.router.navigate(['/edit-task', index]);
  }
}
