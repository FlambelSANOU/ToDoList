import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface representing a task object as stored and returned by the backend.
 */
export interface Task {
  _id?: string;
  id?: number; // Optional alternative ID format
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Payload structure used for creating a new task.
 */
export interface CreateTaskRequest {
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
}

/**
 * Payload structure used for updating a task.
 * All fields are optional to support partial updates.
 */
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
}

/**
 * Injectable service for interacting with the task management backend.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  /** Base API URL for task-related endpoints */
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the full list of tasks.
   * @returns Observable of Task[]
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Retrieves a single task by its unique identifier.
   * @param id - Task ID
   * @returns Observable of the Task object
   */
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new task in the backend.
   * @param task - Payload with task details
   * @returns Observable of the newly created Task
   */
  createTask(task: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  /**
   * Updates an existing task partially.
   * @param id - Task ID
   * @param task - Partial payload with updated fields
   * @returns Observable of the updated Task
   */
  updateTask(id: string, task: UpdateTaskRequest): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, task);
  }

  /**
   * Deletes a task by its ID.
   * @param id - Task ID
   * @returns Observable that completes upon deletion
   */
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Toggles the completed status of a task.
   * @param id - Task ID
   * @returns Observable of the updated Task with toggled status
   */
  toggleComplete(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/toggle`, {});
  }

  /**
   * Fetches tasks filtered by a specific category.
   * @param category - Category value to filter by
   * @returns Observable of filtered Task[]
   */
  getTasksByCategory(category: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?category=${category}`);
  }

  /**
   * Fetches tasks filtered by a specific priority.
   * @param priority - Priority level to filter by
   * @returns Observable of filtered Task[]
   */
  getTasksByPriority(priority: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?priority=${priority}`);
  }
}
