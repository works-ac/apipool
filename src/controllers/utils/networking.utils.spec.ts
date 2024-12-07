import { Test, TestingModule } from '@nestjs/testing';
import { NetworkingController } from './networking.utils.controller';
import { HttpStatus } from '@nestjs/common';
import { ApiResponse, SUPPORTED_API_RES } from 'src/api';
import { TEST_SUITES_TIMEOUT } from 'src/constant';
import { Helpers } from 'src/helpers';
import { Packages } from 'src/packages';

const { InvalidMailServerException } = Packages.EXCEPTIONS;

describe('/api/basic-utils/networking/', () => {
  let nwController: NetworkingController;
  let helpers: Helpers;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworkingController],
    }).compile();

    nwController = module.get(NetworkingController);
  });

  afterAll(() => jest.clearAllMocks());

  describe('check-ip', () => {
    it(
      'should be defined',
      () => expect(nwController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return ip address of client with status 200 in json format',
      () => {
        const mockRequest = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: { ip: '127.0.0.1' },
        };
        const mockResponse = {
          status: HttpStatus.OK,
          reply,
        };

        nwController.checkIpAddr(mockRequest, SUPPORTED_API_RES.JSON);

        expect(mockResponse.status).toBe(HttpStatus.OK);
        expect(mockResponse.reply).toBe(reply);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return ip address of client with status 200 in xml format',
      () => {
        const mockRequest = '127.0.0.1';
        const reply = `<?xml version="1.0" encoding="UTF-8"?><ApiResponse><ApiStatus>success</ApiStatus><ApiMessage>Operation succeeded</ApiMessage><ClientInfo>127.0.0.1</ClientInfo><Misc><ip>127.0.0.1</ip></Misc></ApiResponse>`;
        const mockResponse = {
          status: HttpStatus.OK,
          reply,
        };

        nwController.checkIpAddr(mockRequest, SUPPORTED_API_RES.XML);

        expect(mockResponse.status).toBe(HttpStatus.OK);
        expect(mockResponse.reply).toBe(reply);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return ip address of client with status 200 in html format',
      () => {
        const mockRequest = '127.0.0.1';
        const reply = `<h1>Api Operation: success</h1><br/><p>Api Message: Operation succeeded</p><br/><p>Client Info: 127.0.0.1</p><br/><table><tr><th>ip</th></tr><tr><td>127.0.0.1</td></tr>`;
        const mockResponse = {
          status: HttpStatus.OK,
          reply,
        };

        nwController.checkIpAddr(mockRequest, SUPPORTED_API_RES.XML);

        expect(mockResponse.status).toBe(HttpStatus.OK);
        expect(mockResponse.reply).toBe(reply);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return ip address of client with status 200 in plain text format',
      () => {
        const mockRequest = '127.0.0.1';
        const reply = `{"message":"Operation succeeded","status":"success","entry_by":"127.0.0.1","details":{"ip":"127.0.0.1"}}`;
        const mockResponse = {
          status: HttpStatus.OK,
          reply,
        };

        nwController.checkIpAddr(mockRequest, SUPPORTED_API_RES.XML);

        expect(mockResponse.status).toBe(HttpStatus.OK);
        expect(mockResponse.reply).toBe(reply);
      },
      TEST_SUITES_TIMEOUT,
    );
  });

  describe('check-mail-server', () => {
    it(
      'should be defined',
      () => expect(nwController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return 200 when google.com is provided',
      async () => {
        const mxRecords = [{ exchange: '123', priority: 1 }];
        jest.spyOn(Helpers, 'checkForMailServer').mockResolvedValue(mxRecords);

        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: { ans: 'DELIVERABLE' },
        };
        const status = HttpStatus.OK;

        const response = await nwController.checkMailServer(
          ipAddress,
          'google.com',
        );

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(ApiResponse);

        expect(status).toBe(HttpStatus.OK);
        expect(response.status).toBe(reply.status);
        expect(response.message).toBe(reply.message);
        expect(response.entry_by).toBe(reply.entry_by);
        expect(response.details).toEqual(reply.details);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return 400 when no domain is provided',
      async () => {
        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'validation',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: { ans: 'All fields are mandatory.' },
        };
        const status = HttpStatus.BAD_REQUEST;

        try {
          await nwController.checkMailServer(ipAddress, '');
        } catch (error) {
          expect(status).toBe(HttpStatus.BAD_REQUEST);
          expect(reply).toBeDefined();
          expect(reply).toBeInstanceOf(Object);
        }
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return 500 when an unknown domain is provided',
      async () => {
        jest
          .spyOn(Helpers, 'checkForMailServer')
          .mockRejectedValue(
            new InvalidMailServerException('Invalid mail server'),
          );

        const ipAddress = '127.0.0.1';
        const reply = {
          status: 'exception',
          message: 'Invalid mail server',
          entry_by: '127.0.0.1',
        };
        const status = HttpStatus.INTERNAL_SERVER_ERROR;

        try {
          await nwController.checkMailServer(ipAddress, 'bookjn.in');
        } catch (error) {
          expect(status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
          expect(reply).toBeDefined();
          expect(reply).toBeInstanceOf(Object);
        }
      },
      TEST_SUITES_TIMEOUT,
    );
  });
});
