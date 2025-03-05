import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { TEST_SUITES_TIMEOUT } from 'src/constant';
import { Helpers } from 'src/helpers';
import { ApiResponse } from 'src/api';
import { MonetoryController } from './monetory.utils.controller';

describe('/api/basic-utils/monetory/', () => {
  let monetoryController: MonetoryController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonetoryController],
    }).compile();

    monetoryController = module.get(MonetoryController);
  });

  afterAll(() => jest.clearAllMocks());

  describe('currencies', () => {
    it(
      'should be defined',
      () => expect(monetoryController).toBeDefined(),
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

        const response = await monetoryController.getAllCurrencies(ipAddress);

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

        const response = await monetoryController.getAllCurrencies(ipAddress);

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

  describe('currency-denomination', () => {
    it(
      'should be defined',
      () => expect(monetoryController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return currency denomination with 200 status',
      () => {
        const amount = 100;
        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: ipAddress,
          details: {
            100: 1,
          },
        };

        const response = monetoryController.currencyDenomination(
          amount,
          ipAddress,
        );

        expect(response.status).toBe(reply.status);
        expect(response.message).toBe(reply.message);
        expect(response.entry_by).toBe(reply.entry_by);
        expect(response.details).toEqual(reply.details);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return validation error with 400 status',
      () => {
        const amount = -100;
        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'validation',
          message: 'Operation failed',
          entry_by: ipAddress,
          details: {
            msg: 'Amount should be a natural number',
          },
        };

        try {
          monetoryController.currencyDenomination(amount, ipAddress);
        } catch (error) {
          expect(error.status).toBe(HttpStatus.BAD_REQUEST);
          expect(error.response.status).toBe(reply.status);
          expect(error.response.message).toBe(reply.message);
          expect(error.response.entry_by).toBe(reply.entry_by);
          expect(error.response.details).toEqual(reply.details);
        }
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return validation error with 406 status',
      () => {
        const amount = 1e6;
        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'validation',
          message: 'Operation failed',
          entry_by: ipAddress,
          details: {
            msg: 'Amount is too large',
          },
        };

        try {
          monetoryController.currencyDenomination(amount, ipAddress);
        } catch (error) {
          expect(error.status).toBe(HttpStatus.NOT_ACCEPTABLE);
          expect(error.response.status).toBe(reply.status);
          expect(error.response.message).toBe(reply.message);
          expect(error.response.entry_by).toBe(reply.entry_by);
          expect(error.response.details).toEqual(reply.details);
        }
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return exception status with 400 status',
      () => {
        const amount = 'www';
        const ipAddress = '127.0.0.1';
        const reply = {
          message: 'Validation failed (numeric string is expected)',
          entry_by: '127.0.0.1',
          status: 'exception',
          error: 'Bad Request',
          statusCode: 400,
        };

        try {
          monetoryController.currencyDenomination(Number(amount), ipAddress);
        } catch (error) {
          expect(error.status).toBe(HttpStatus.NOT_ACCEPTABLE);
          expect(error.response.status).toBe(reply.status);
          expect(error.response.message).toBe(reply.message);
          expect(error.response.entry_by).toBe(reply.entry_by);
        }
      },
      TEST_SUITES_TIMEOUT,
    );
  });
});
