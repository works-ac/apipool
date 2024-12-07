import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { TEST_SUITES_TIMEOUT } from 'src/constant';
import { Helpers } from 'src/helpers';
import { MiscController } from './misc.utils.controller';
import { ApiResponse } from 'src/api';

describe('/api/basic-utils/misc/', () => {
  let miscController: MiscController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiscController],
    }).compile();

    miscController = module.get(MiscController);
  });

  afterAll(() => jest.clearAllMocks());

  describe('geography/countries', () => {
    it(
      'should be defined',
      () => expect(miscController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return countries list with 200 status',
      async () => {
        const countries = [
          {
            name: 'Iceland',
            dial_code: '+354',
            emoji: '🇮🇸',
            code: 'IS',
          },
          {
            name: 'India',
            dial_code: '+91',
            emoji: '🇮🇳',
            code: 'IN',
          },
        ];
        jest.spyOn(Helpers, 'loadJSONContent').mockResolvedValue(countries);

        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: countries,
        };
        const status = HttpStatus.OK;

        const response = await miscController.getAllCountries(ipAddress);

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
      'should return countries list with 200 status without ip',
      async () => {
        const countries = [
          {
            name: 'Iceland',
            dial_code: '+354',
            emoji: '🇮🇸',
            code: 'IS',
          },
          {
            name: 'India',
            dial_code: '+91',
            emoji: '🇮🇳',
            code: 'IN',
          },
        ];
        jest.spyOn(Helpers, 'loadJSONContent').mockResolvedValue(countries);

        const ipAddress = '';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '0.0.0.0',
          details: countries,
        };
        const status = HttpStatus.OK;

        const response = await miscController.getAllCountries(ipAddress);

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

  describe('monetory/currencies', () => {
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
