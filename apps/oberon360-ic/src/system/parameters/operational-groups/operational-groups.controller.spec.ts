import { Test, TestingModule } from '@nestjs/testing';
import { OperationalGroupsController } from './operational-groups.controller';

describe('OperationalGroupsController', () => {
  let controller: OperationalGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationalGroupsController],
    }).compile();

    controller = module.get<OperationalGroupsController>(OperationalGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
