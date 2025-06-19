import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * Service handling business logic for task management.
 * Interacts with the MongoDB database using Mongoose.
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  /**
   * Create a new task and save it to the database
   * @param createTaskDto - DTO with required task field
   * @returns The created task document
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  /**
   * Retrieve all tasks from the database, sorted by newest first.
   * @returns Array of task documents
   */
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().sort({ createdAt: -1 }).exec()
  }

  /**
   * Retrieve a single task by its ID.
   * @param id - Task ID
   * @throws NotFoundException if the task is not found
   * @returns The found task document
   */
  async findOne(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).exec()
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  /**
   * Update a task by ID with new datas.
   * @param id - Task ID
   * @param updateTaskDto - Partial update payload
   * @throws NotFoundException if the task is not found
   * @returns The updated task document
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return updatedTask;
  }

  /**
   * Delete a task by ID.
   * @param id - Task ID
   * @throws NotFoundException if the task is not found
   */
  async remove(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  /**
   * Toggle the completion status of a task.
   * @param id - Task ID
   * @returns The updated task document with toggled completion status
   */
  async toggleComplete(id: string): Promise<Task> {
    const task = await this.findOne(id); // Reuse findOne to ensure task exists
    task.completed = !task.completed
    return task.save();
  }

  /**
   * Retrieve tasks by a given category
   * @param category - Category to filter by
   * @returns Array of tasks matching the category
   */
  async findByCategory(category: string): Promise<Task[]> {
    return this.taskModel.find({ category }).sort({ createdAt: -1 }).exec();
  }

  /**
   * Retrieves tasks by a given priority.
   * @param priority - Priority level to filter by
   * @returns Array of tasks matching the priority
   */
  async findByPriority(priority: string): Promise<Task[]> {
    return this.taskModel.find({ priority }).sort({ createdAt: -1 }).exec()
  }
}
