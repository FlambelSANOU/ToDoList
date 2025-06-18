import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let mockTaskModel: any;

  const mockTask = {
    _id: '507f1f77bcf86cd799439011',
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    priority: 'medium' as const,
    category: 'personal',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTaskDocument = {
    ...mockTask,
    $assertPopulated: jest.fn(),
    $clone: jest.fn(),
    $getAllSubdocs: jest.fn(),
    $ignore: jest.fn(),
    $isDefault: jest.fn(),
    $isDeleted: jest.fn(),
    $isEmpty: jest.fn(),
    $isValid: jest.fn(),
    $locals: {},
    $model: jest.fn(),
    $op: null,
    $session: jest.fn(),
    $set: jest.fn(),
    $where: {},
    collection: {} as any,
    db: {} as any,
    delete: jest.fn(),
    deleteOne: jest.fn(),
    depopulate: jest.fn(),
    equals: jest.fn(),
    errors: {},
    get: jest.fn(),
    increment: jest.fn(),
    isDirectModified: jest.fn(),
    isInit: jest.fn(),
    isModified: jest.fn(),
    isSelected: jest.fn(),
    markModified: jest.fn(),
    modifiedPaths: jest.fn(),
    modelName: 'Task',
    overwrite: jest.fn(),
    populate: jest.fn(),
    populated: jest.fn(),
    replaceOne: jest.fn(),
    reset: jest.fn(),
    save: jest.fn(),
    schema: {} as any,
    set: jest.fn(),
    toObject: jest.fn(),
    unmarkModified: jest.fn(),
    update: jest.fn(),
    validate: jest.fn(),
    validateSync: jest.fn(),
  } as any;

  const mockTaskModelMethods = {
    new: jest.fn().mockResolvedValue(mockTask),
    constructor: jest.fn().mockResolvedValue(mockTask),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModelMethods,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    mockTaskModel = module.get(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
        priority: 'high',
        category: 'work',
      };

      const mockCreatedTask = { ...mockTask, ...createTaskDto };
      mockTaskModel.new.mockReturnValue(mockCreatedTask);
      mockTaskModel.save.mockResolvedValue(mockCreatedTask);

      const result = await service.create(createTaskDto);

      expect(result).toEqual(mockCreatedTask);
      expect(mockTaskModel.new).toHaveBeenCalledWith(createTaskDto);
      expect(mockTaskModel.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const mockTasks = [mockTask];
      const mockFindQuery = {
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockTasks),
      };

      mockTaskModel.find.mockReturnValue(mockFindQuery);

      const result = await service.findAll();

      expect(result).toEqual(mockTasks);
      expect(mockTaskModel.find).toHaveBeenCalled();
      expect(mockFindQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const mockFindQuery = {
        exec: jest.fn().mockResolvedValue(mockTaskDocument),
      };

      mockTaskModel.findById.mockReturnValue(mockFindQuery);

      const result = await service.findOne('507f1f77bcf86cd799439011');

      expect(result).toEqual(mockTaskDocument);
      expect(mockTaskModel.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should throw NotFoundException when task not found', async () => {
      const mockFindQuery = {
        exec: jest.fn().mockResolvedValue(null),
      };

      mockTaskModel.findById.mockReturnValue(mockFindQuery);

      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        completed: true,
      };

      const mockUpdatedTask = { ...mockTask, ...updateTaskDto };
      const mockUpdateQuery = {
        exec: jest.fn().mockResolvedValue(mockUpdatedTask),
      };

      mockTaskModel.findByIdAndUpdate.mockReturnValue(mockUpdateQuery);

      const result = await service.update('507f1f77bcf86cd799439011', updateTaskDto);

      expect(result).toEqual(mockUpdatedTask);
      expect(mockTaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateTaskDto,
        { new: true }
      );
    });

    it('should throw NotFoundException when task not found', async () => {
      const updateTaskDto: UpdateTaskDto = { completed: true };
      const mockUpdateQuery = {
        exec: jest.fn().mockResolvedValue(null),
      };

      mockTaskModel.findByIdAndUpdate.mockReturnValue(mockUpdateQuery);

      await expect(service.update('invalid-id', updateTaskDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const mockDeleteQuery = {
        exec: jest.fn().mockResolvedValue(mockTask),
      };

      mockTaskModel.findByIdAndDelete.mockReturnValue(mockDeleteQuery);

      await service.remove('507f1f77bcf86cd799439011');

      expect(mockTaskModel.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should throw NotFoundException when task not found', async () => {
      const mockDeleteQuery = {
        exec: jest.fn().mockResolvedValue(null),
      };

      mockTaskModel.findByIdAndDelete.mockReturnValue(mockDeleteQuery);

      await expect(service.remove('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('toggleComplete', () => {
    it('should toggle task completion status', async () => {
      const mockTaskToToggle = { 
        ...mockTaskDocument, 
        completed: false,
        save: jest.fn().mockResolvedValue({ ...mockTaskDocument, completed: true })
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockTaskToToggle);

      const result = await service.toggleComplete('507f1f77bcf86cd799439011');

      expect(result).toEqual({ ...mockTaskDocument, completed: true });
      expect(mockTaskToToggle.completed).toBe(true);
      expect(mockTaskToToggle.save).toHaveBeenCalled();
    });
  });
}); 