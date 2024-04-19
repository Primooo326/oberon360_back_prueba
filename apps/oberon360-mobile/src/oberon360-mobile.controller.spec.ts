import { Test, TestingModule } from '@nestjs/testing';
import { Oberon360MobileController } from './oberon360-mobile.controller';
import { Oberon360MobileService } from './oberon360-mobile.service';

describe('Oberon360MobileController', () => {
  let oberon360MobileController: Oberon360MobileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Oberon360MobileController],
      providers: [Oberon360MobileService],
    }).compile();

    oberon360MobileController = app.get<Oberon360MobileController>(Oberon360MobileController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(oberon360MobileController.getHello()).toBe('Hello World!');
    });
  });
});
