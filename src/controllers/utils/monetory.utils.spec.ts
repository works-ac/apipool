import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { TEST_SUITES_TIMEOUT } from 'src/constant';
import { Helpers } from 'src/helpers';
import { ApiResponse } from 'src/api';
import { MonetoryController } from './monetory.utils.controller';

describe('/api/basic-utils/monetory/', () => {
  let miscController: MonetoryController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonetoryController],
    }).compile();

    miscController = module.get(MonetoryController);
  });

  afterAll(() => jest.clearAllMocks());

  describe('currencies', () => {
    it(
      'should be defined',
      () => expect(miscController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return currencies list with 200 status',
      async () => {
        const currencies = [
          { country: 'Russia', currency: 'RUB', symbol: '₽' },
          { country: 'India', currency: 'INR', symbol: '₹' },
        ];
        jest.spyOn(Helpers, 'loadJSONContent').mockResolvedValue(currencies);

        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: currencies,
        };
        const status = HttpStatus.OK;

        const response = await miscController.getAllCurrencies(ipAddress);

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
      'should return currencies list with 200 status without ip',
      async () => {
        const currencies = [
          { country: 'Russia', currency: 'RUB', symbol: '₽' },
          { country: 'India', currency: 'INR', symbol: '₹' },
        ];
        jest.spyOn(Helpers, 'loadJSONContent').mockResolvedValue(currencies);

        const ipAddress = '0.0.0.0';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '0.0.0.0',
          details: currencies,
        };
        const status = HttpStatus.OK;

        const response = await miscController.getAllCurrencies(ipAddress);

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
});
