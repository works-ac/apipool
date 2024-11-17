import { Test, TestingModule } from '@nestjs/testing';
import { NetworkingController } from './networking.utils.controller';
import { HttpStatus } from '@nestjs/common';
import { SUPPORTED_API_RES } from 'src/api';
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
        helpers = {
          checkForMailServer: jest
            .fn()
            .mockResolvedValue([{ exchange: '123', priority: 1 }]),
        };
        const mockRequest = '127.0.0.1';
        const reply = {
          status: 'success',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: { ans: 'DELIVERABLE' },
        };
        const mockResponse = {
          status: HttpStatus.OK,
          reply,
        };

        await nwController.checkMailServer(mockRequest, 'google.com');

        expect(mockResponse.status).toBe(HttpStatus.OK);
        expect(mockResponse.reply).toBe(reply);
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should 400 when no domain is provided',
      async () => {
        const mockRequest = '127.0.0.1';
        const reply = {
          status: 'validation',
          message: 'Operation succeeded',
          entry_by: '127.0.0.1',
          details: { ans: 'All fields are mandatory.' },
        };
        const mockResponse = {
          status: HttpStatus.BAD_REQUEST,
          reply,
        };

        try {
          await nwController.checkMailServer(mockRequest, '');
        } catch (error) {
          expect(mockResponse.status).toBe(HttpStatus.BAD_REQUEST);
          expect(mockResponse.reply).toBe(reply);
        }
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should return 500 when an unknown domain is provided',
      async () => {
        helpers = {
          checkForMailServer: jest
            .fn()
            .mockRejectedValue(
              new InvalidMailServerException('Invalid mail server'),
            ),
        };

        const mockRequest = '127.0.0.1';
        const reply = {
          status: 'exception',
          message: 'Invalid mail server',
          entry_by: '127.0.0.1',
        };
        const mockResponse = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          reply,
        };

        try {
          await nwController.checkMailServer(mockRequest, 'bookjn.in');
        } catch (error) {
          expect(mockResponse.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
          expect(mockResponse.reply).toBe(reply);
        }
      },
      TEST_SUITES_TIMEOUT,
    );
  });
});
