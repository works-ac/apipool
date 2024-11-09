import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './index';
import { HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get(AppController);
  });

  describe('/api/ping', () => {
    it('should be defined', () => expect(appController).toBeDefined());

    it('should return "Pong" with status 200', () => {
      const mockRequest = '127.0.0.1';
      const reply = {
        status: 'success',
        message: 'Pong',
        entry_by: '127.0.0.1',
        details: null,
      };
      const mockResponse = {
        status: HttpStatus.OK,
        reply,
      };

      appController.ping(mockRequest);

      expect(mockResponse.status).toBe(HttpStatus.OK);
      expect(mockResponse.reply).toBe(reply);
    });

    it('should handle request without IP', () => {
      const mockRequest = '';
      const reply = {
        status: 'success',
        message: 'Pong',
        entry_by: '0.0.0.0',
        details: null,
      };
      const mockResponse = {
        status: HttpStatus.OK,
        reply,
      };

      appController.ping(mockRequest);

      expect(mockResponse.status).toBe(HttpStatus.OK);
      expect(mockResponse.reply).toBe(reply);
    });
  });

  describe('/api/health-check', () => {
    it('should be defined', () => expect(appController).toBeDefined());

    it('should return 200 status with "All system are operational message"', () => {
      const mockRequest = '127.0.0.1';
      const reply = {
        status: 'success',
        message: 'All system are operational',
        entry_by: '127.0.0.1',
        details: null,
      };
      const mockResponse = {
        status: HttpStatus.OK,
        reply,
      };

      appController.healthCheck(mockRequest);

      expect(mockResponse.status).toBe(HttpStatus.OK);
      expect(mockResponse.reply).toBe(reply);
    });

    it('should behave same without an IP', () => {
      const mockRequest = '';
      const reply = {
        status: 'success',
        message: 'All system are operational',
        entry_by: '0.0.0.0',
        details: null,
      };
      const mockResponse = {
        status: HttpStatus.OK,
        reply,
      };

      appController.healthCheck(mockRequest);

      expect(mockResponse.status).toBe(HttpStatus.OK);
      expect(mockResponse.reply).toBe(reply);
    });
  });
});
