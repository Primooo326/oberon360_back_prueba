import { Test, TestingModule } from '@nestjs/testing';
import { Oberon360WebController } from './oberon360-web.controller';
import { Oberon360WebService } from './oberon360-web.service';

describe('Oberon360WebController', () => {
  let oberon360WebController: Oberon360WebController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Oberon360WebController],
      providers: [Oberon360WebService],
    }).compile();

    oberon360WebController = app.get<Oberon360WebController>(Oberon360WebController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(oberon360WebController.getHello()).toBe('Hello World!');
    });
  });
});
