import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.interface';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  newTask: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  addTask(): void {
    if (this.newTask.trim()) {
      const task: Task = { todotask: this.newTask, completed: false }; 
      this.taskService.addTask(task);
      this.router.navigate(['/todo']);
    }
  }

  goBack(): void {
    this.router.navigate(['/todo']);
  }
}
