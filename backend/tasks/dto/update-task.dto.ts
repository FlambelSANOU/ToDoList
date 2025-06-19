import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional, IsBoolean } from 'class-validator';

/**
 * Data Transfert Object for updating a task.
 * Inherits all fields from CreateTaskDto as optional (via PartialType),
 * and adds an optional `completed` field.
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {

  /**
   * Task completion status (optional).
   * Must be a boolean value (true or false).
   */
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
