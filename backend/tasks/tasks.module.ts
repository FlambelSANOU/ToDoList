import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './schemas/task.schema';

/**
 * TasksModule encapsulates all logic related to task management,
 * including the controller, service, and Mongoose model.
 */
@Module({
  // Register the Task schema with Mongoose so it can be injected via @InjectModel
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
  ],

  // Controller responsible for handling incoming HTTP requests
  controllers: [TasksController],

  // Service provider that contains the business logic for task operations
  providers: [TasksService],
})
export class TasksModule {}
