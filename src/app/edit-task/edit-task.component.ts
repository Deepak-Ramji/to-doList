import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  taskIndex: number | null = null;
  taskName: string = '';  
  task: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const index = params.get('id');
      if (index !== null) {
        this.taskIndex = +index;
        const task = this.taskService.getTask(this.taskIndex);
        if (task) {
          this.task = task;
          this.taskName = task.todotask;  
        }
      }
    });
  }

  saveEdit(): void {
    if (this.taskIndex !== null && this.task) {
      this.taskService.updateTaskByIndex(this.taskIndex, this.taskName);
      this.router.navigate(['/todo']);
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/todo']);
  }
}
