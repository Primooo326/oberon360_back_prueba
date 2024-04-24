import { Test, TestingModule } from '@nestjs/testing';
import { OperationalGroupsService } from './operational-groups.service';

describe('OperationalGroupsService', () => {
  let service: OperationalGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationalGroupsService],
    }).compile();

    service = module.get<OperationalGroupsService>(OperationalGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
