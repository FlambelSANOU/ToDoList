import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService, Task } from '../../task.service';

/**
 * Component representing a single task item.
 * Handles task updates, deletion, and completion toggling.
 */
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styles: []
})
export class TaskItemComponent {

  /** Task input from parent component */
  @Input() task!: Task;

  /** Emits updated task to the parent */
  @Output() taskUpdated = new EventEmitter<Task>();

  /** Emits task ID when the task is deleted */
  @Output() taskDeleted = new EventEmitter<string>();

  /**
   * Injects TaskService to handle backend interactions
   * @param taskService - Service to update, delete, or toggle task completion
   */
  constructor(private taskService: TaskService) {}

  /**
   * Toggles the task's completed status.
   * Sends a request to the backend and emits the updated task on success.
   */
  toggleComplete(): void {
    if (this.task._id) {
      this.taskService.toggleComplete(this.task._id).subscribe({
        next: (updatedTask) => {
          // Update local task and notify parent of the change
          this.task = updatedTask;
          this.taskUpdated.emit(updatedTask);
        },
        error: (error) => {
          console.error('Error toggling task completion:', error);
        }
      });
    }
  }

  /**
   * Opens prompt dialogs to edit the task's title and description.
   * On success, updates the task via service and emits the updated version.
   */
  editTask(): void {
    // Using browser prompt for simplicity; replace with modal in real app
    const newTitle = prompt('Enter new title:', this.task.title);
    if (newTitle && newTitle.trim() && this.task._id) {
      const newDescription = prompt('Enter new description:', this.task.description);
      if (newDescription && newDescription.trim()) {
        this.taskService.updateTask(this.task._id, {
          title: newTitle.trim(),
          description: newDescription.trim()
        }).subscribe({
          next: (updatedTask) => {
            // Update the local task and notify parent
            this.task = updatedTask;
            this.taskUpdated.emit(updatedTask);
          },
          error: (error) => {
            console.error('Error updating task:', error);
          }
        });
      }
    }
  }

  /**
   * Deletes the task after user confirmation.
   * Emits the task ID to parent component if successful.
   */
  deleteTask(): void {
    if (confirm('Are you sure you want to delete this task?') && this.task._id) {
      this.taskService.deleteTask(this.task._id).subscribe({
        next: () => {
          // Notify parent to remove the task from the list
          this.taskDeleted.emit(this.task._id);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }
}
