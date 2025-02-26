import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './index';
import { HttpStatus } from '@nestjs/common';
import { TEST_SUITES_TIMEOUT } from 'src/constant';
import { ApiResponse } from 'src/api';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get(AppController);
  });

  describe('/api/ping', () => {
    it(
      'should be defined',
      () => expect(appController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return "Pong" with status 200',
      () => {
        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Pong',
          entry_by: '127.0.0.1',
          details: null,
        };
        const status = HttpStatus.OK;

        const response = appController.ping(ipAddress);

        expect(status).toBe(HttpStatus.OK);

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(ApiResponse);

        expect(response.status).toBe(reply.status);
        expect(response.message).toBe(reply.message);
        expect(response.entry_by).toBe(reply.entry_by);
        expect(response.details).toEqual(reply.details);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should handle request without IP',
      () => {
        const ipAddress = '';
        const reply = {
          status: 'success',
          message: 'Pong',
          entry_by: '0.0.0.0',
          details: null,
        };
        const status = HttpStatus.OK;

        const response = appController.ping(ipAddress);

        expect(status).toBe(HttpStatus.OK);

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(ApiResponse);

        expect(response.status).toBe(reply.status);
        expect(response.message).toBe(reply.message);
        expect(response.entry_by).toBe(reply.entry_by);
        expect(response.details).toEqual(reply.details);
      },
      TEST_SUITES_TIMEOUT,
    );
  });

  describe('/api/health-check', () => {
    it(
      'should be defined',
      () => expect(appController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return 200 status with "All system are operational message"',
      () => {
        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'All system are operational',
          entry_by: '127.0.0.1',
          details: null,
        };
        const status = HttpStatus.OK;

        const response = appController.healthCheck(ipAddress);

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(ApiResponse);

        expect(status).toBe(HttpStatus.OK);
        expect(response.status).toBe(response.status);
        expect(response.message).toBe(reply.message);
        expect(response.entry_by).toBe(reply.entry_by);
        expect(response.details).toEqual(reply.details);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should behave same without an IP',
      () => {
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
      },
      TEST_SUITES_TIMEOUT,
    );
  });
});
