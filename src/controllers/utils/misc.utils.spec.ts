import { Test, TestingModule } from '@nestjs/testing';
import { TEST_SUITES_TIMEOUT } from 'src/constant';
import { MiscController } from './misc.utils.controller';
import { ApiResponse } from 'src/api';
import { CountryModel } from 'src/db/models';
import { getModelToken } from '@nestjs/sequelize';
import { HttpStatus } from '@nestjs/common';

describe('/api/basic-utils/misc/', () => {
  let miscController: MiscController;

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
  const mockCountryModel = {
    findAndCountAll: jest.fn().mockResolvedValue({ count: 2, rows: countries }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiscController],
      providers: [{ provide: getModelToken(CountryModel), useValue: mockCountryModel }]
    }).compile();

    miscController = module.get(MiscController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('geography/countries', () => {
    it(
      'should be defined',
      () => expect(miscController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return countries list with 200 status',
      async () => {
        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: { countries, totalRecords: countries.length },
        };
        const response = await miscController.getAllCountries(1, ipAddress);

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(ApiResponse);

        expect(response.status).toBe(reply.status);
        expect(response.message).toBe(reply.message);
        expect(response.entry_by).toBe(reply.entry_by);
        expect(response.details).toEqual(reply.details);
        expect(response.details.totalRecords).toBe(countries.length);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return countries list with 200 status without ip',
      async () => {
        const ipAddress = '';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '0.0.0.0',
          details: { countries, totalRecords: countries.length },
        };

        const response = await miscController.getAllCountries(1, ipAddress);

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(ApiResponse);

        expect(response.status).toBe(reply.status);
        expect(response.message).toBe(reply.message);
        expect(response.entry_by).toBe(reply.entry_by);
        expect(response.details).toEqual(reply.details);
      },
      TEST_SUITES_TIMEOUT,
    );

    it('should return a 400 response for 2q page number', async () => {
      const ipAddress = '127.0.0.1';
      const reply = { message: "Api operation failed", entry_by: "127.0.0.1", status: "exception", details: { message: "Validation failed (numeric string is expected)", error: "Bad Request", statusCode: 400 } };

      try {
        await miscController.getAllCountries(Number('2q'), ipAddress);
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);

        expect(error.response).toBeDefined();
        expect(error.response).toBeInstanceOf(ApiResponse);

        expect(error.response.status).toBe(reply.status);
        expect(error.response.message).toBe(reply.message);
        expect(error.response.entry_by).toBe(reply.entry_by);
        expect(error.response.details).toEqual(reply.details);
      }

    }, TEST_SUITES_TIMEOUT);
  });
});
