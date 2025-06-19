import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService, CreateTaskRequest } from '../../task.service';

/**
 * Component for creating a new task using a reactive form.
 * Handles form validation, submission, and interaction with the backend.
 */
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styles: []
})
export class TaskFormComponent {

  /** Reactive form group for task creation */
  taskForm: FormGroup;

  /** Indicates if the form is currently submitting */
  submitting = false;

  /**
   * Initializes the form with default values and validators.
   * @param fb - FormBuilder for creating reactive forms
   * @param taskService - Service used to send the new task to the backend
   */
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    // Initialize form controls with default values and validators
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      priority: ['medium'],           // Optional field, default value
      category: ['personal'],         // Optional field, default value
      dueDate: ['', Validators.required]
    });
  }

  /**
   * Handles form submission by sending the task data to the backend.
   * Displays errors and resets form on success.
   */
  onSubmit(): void {
    console.log(this.taskForm.value);

    if (this.taskForm.valid) {
      this.submitting = true;

      const taskData: CreateTaskRequest = this.taskForm.value;

      this.taskService.createTask(taskData).subscribe({
        next: (newTask) => {
          console.log('Task created successfully:', newTask);
          this.resetForm();
          this.submitting = false;

          // TEMPORARY: reload the page to refresh task list.
          // In production, consider emitting an event instead.
          window.location.reload();
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.submitting = false;
        }
      });
    }
  }

  /**
   * Resets the form to its default state.
   * Keeps default values for priority and category fields.
   */
  resetForm(): void {
    this.taskForm.reset({
      priority: 'medium',
      category: 'personal'
    });
  }
}
