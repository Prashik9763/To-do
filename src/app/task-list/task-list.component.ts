import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Array to store tasks
  @Output() editTaskEvent = new EventEmitter<Task>(); // Emit task to be edited

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  editTask(task: Task): void {
    this.editTaskEvent.emit(task); // Emit the task to be edited
  }

  // Method to return a dynamic class based on the task's status
  getStatusClass(status: string): string {
    switch (status) {
      case 'Not Started':
        return 'badge-warning'; // Yellow badge for "Not Started"
      case 'In Progress':
        return 'badge-info'; // Blue badge for "In Progress"
      case 'Completed':
        return 'badge-success'; // Green badge for "Completed"
      default:
        return '';
    }
  }
}
