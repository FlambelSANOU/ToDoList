import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, MaxLength } from 'class-validator';

/**
 * Data Transfert Object for creating a new task.
 * Used for request body validation in the controller.
 */
export class CreateTaskDto {

  /**
   * Task title (required).
   * Must be a non-empty string with a maximum length of 255 characters.
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  /**
   * Task description (required).
   * Must be a non-empty string.
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Task priority (optional).
   * Must be one of: 'low', 'medium', or 'high'.
   */
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  /**
   * Due date of the task (optional).
   * Must be a valid ISO 8601 date string.
   */
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  /**
   * Category to which the task belongs (optional).
   * Must be a string if provided.
   */
  @IsOptional()
  @IsString()
  category?: string;
}
