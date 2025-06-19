import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * Controller handling all HTTP endpoints for task management
 * Maps incoming requests to the corresponding service methods.
 */
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * POST /tasks
   * Create a new task with the provided data.
   * @param createTaskDto - Payload containing title, description, etc.
   */
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * GET /tasks
   * Retrieve all tasks or filters by category or priority.
   * @param category - Optional category filter via query param
   * @param priority - Optional priority filter via query param
   */
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('priority') priority?: string
  ) {
    if (category) {
      return this.tasksService.findByCategory(category);
    }
    if (priority) {
      return this.tasksService.findByPriority(priority)
    }
    return this.tasksService.findAll();
  }

  /**
   * GET /tasks/:id
   * Retrieves a specific task by its ID.
   * @param id - Task ID from the route parameter
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  /**
   * PATCH /tasks/:id
   * Partially update a task using its ID and update payload.
   * @param id - Task ID
   * @param updateTaskDto - Fields to update (partial)
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(id, updateTaskDto)
  }

  /**
   * PATCH /tasks/:id/toggle
   * Toggles the completed status of a task.
   * @param id - Task ID
   */
  @Patch(':id/toggle')
  toggleComplete(@Param('id') id: string) {
    return this.tasksService.toggleComplete(id);
  }

  /**
   * DELETE /tasks/:id
   * Deletes a task by its ID.
   * @param id - Task ID
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
