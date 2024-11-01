import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './index';
import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

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
      const mockRequest = { ip: '127.0.0.1' } as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const reply = {
        status: 'success',
        message: 'Pong',
        entry_by: '127.0.0.1',
        details: null,
      };

      appController.ping(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(reply);
    });

    it('should handle request without IP', () => {
      const mockRequest = { ip: '' } as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const reply = {
        status: 'success',
        message: 'Pong',
        entry_by: '0.0.0.0',
        details: null,
      };

      appController.ping(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(reply);
    });
  });

  describe('/api/health-check', () => {
    it('should be defined', () => expect(appController).toBeDefined());

    it('should return 200 status with "All system are operational message"', () => {
      const mockRequest = { ip: '127.0.0.1' } as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const reply = {
        status: 'success',
        message: 'All system are operational',
        entry_by: '127.0.0.1',
        details: null,
      };

      appController.healthCheck(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(reply);
    });

    it('should behave same without an IP', () => {
      const mockRequest = { ip: null } as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const reply = {
        status: 'success',
        message: 'All system are operational',
        entry_by: '0.0.0.0',
        details: null,
      };

      appController.healthCheck(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(reply);
    });
  });
});
