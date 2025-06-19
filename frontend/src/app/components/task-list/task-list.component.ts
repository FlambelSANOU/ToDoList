import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../task.service';

/**
 * Component responsible for displaying and managing the list of tasks.
 * Handles loading, updating, and deleting tasks from the view.
 */
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: []
})
export class TaskListComponent implements OnInit {

  /** Array of tasks to be displayed */
  tasks: Task[] = [];

  /** Flag to indicate loading state */
  loading = false;

  /** Error message to display in case of failure */
  error: string | null = null;

  /**
   * Constructor injecting the TaskService for data operations.
   * @param taskService - Service used to interact with the task backend
   */
  constructor(private taskService: TaskService) {}

  /**
   * Lifecycle hook called once the component is initialized.
   * Triggers the initial loading of tasks.
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Loads the list of tasks from the backend using TaskService.
   * Sets loading flag, handles success and error responses.
   */
  loadTasks(): void {
    this.loading = true;
    this.error = null;
    
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        // Populate the task list on success
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        // Handle errors gracefully
        console.error('Error loading tasks:', error);
        this.error = 'Failed to load tasks. Please try again.';
        this.loading = false;
      }
    });
  }

  /**
   * Updates a task in the current task list with new values.
   * @param updatedTask - The task object with updated information
   */
  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task._id === updatedTask._id);
    if (index !== -1) {
      // Replace the existing task with the updated one
      this.tasks[index] = updatedTask;
    }
  }

  /**
   * Removes a task from the list based on its ID.
   * @param taskId - The unique identifier of the task to delete
   */
  onTaskDeleted(taskId: string): void {
    this.tasks = this.tasks.filter(task => task._id !== taskId);
  }
}
