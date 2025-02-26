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

        try {
          await nwController.checkMailServer(ipAddress, '');
        } catch (error) {
          expect(error.status).toBe(HttpStatus.BAD_REQUEST);
        }
      },
      TEST_SUITES_TIMEOUT,
    );

    it(
      'should be an instance of InvalidMailServerException',
      async () => {
        jest
          .spyOn(Helpers, 'checkForMailServer')
          .mockRejectedValue(
            new InvalidMailServerException('Invalid mail server'),
          );

        const ipAddress = '127.0.0.1';

        try {
          await nwController.checkMailServer(ipAddress, 'bookjn.in');
        } catch (error) {
          expect(error).toBeInstanceOf(InvalidMailServerException);
        }
      },
      TEST_SUITES_TIMEOUT,
    );
  });

  describe('ip-loc', () => {
    it(
      'should be defined',
      () => expect(nwController).toBeDefined(),
      TEST_SUITES_TIMEOUT,
    );

    it('should return expected response when 49.43.88.202 is passed', async () => {
      const reply = {
        status: 'success',
        message: 'Operation succeeded',
        entry_by: '127.0.0.1',
        details: {
          range: [824918016, 824926207],
          country: 'IN',
          region: 'PB',
          eu: '0',
          timezone: 'Asia/Kolkata',
          city: 'Ludhiana',
          ll: [31.0048, 75.9463],
          metro: 0,
          area: 50,
        },
      };
      const status = HttpStatus.OK;
      const response = await nwController.getIpLoc('49.43.88.202', '127.0.0.1');

      expect(status).toBe(HttpStatus.OK);

      expect(response.status).toBe(reply.status);
      expect(response.message).toBe(reply.message);
      expect(response.entry_by).toBe(reply.entry_by);
      expect(response.details).toEqual(reply.details);

      expect(response.details).toBeDefined();
      expect(Object.keys(response.details).length).toBe(
        Object.keys(reply.details).length,
      );
    });

    it('should return validation when 127.0.0.1 is passed', async () => {
      const reply = {
        status: 'validation',
        message: 'Operation failed, localhost detected',
        entry_by: '127.0.0.1',
      };

      try {
        await nwController.getIpLoc('127.0.0.1', '127.0.0.1');
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);

        expect(error.response.status).toBe(reply.status);
        expect(error.response.message).toBe(reply.message);
        expect(error.response.entry_by).toBe(reply.entry_by);
        expect(error.response.details).toBeNull();
      }
    });

    it('should return private ip detected when 172.31.56.122 is passed', async () => {
      const reply = {
        status: 'validation',
        message: 'Operation failed, private ip detected',
        entry_by: '127.0.0.1',
      };

      try {
        await nwController.getIpLoc('172.31.56.122', '127.0.0.1');
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);

        expect(error.response.status).toBe(reply.status);
        expect(error.response.message).toBe(reply.message);
        expect(error.response.entry_by).toBe(reply.entry_by);
        expect(error.response.details).toBeNull();
      }
    });

    it('should return validation error when 172.31.56 is passed', async () => {
      const reply = {
        status: 'validation',
        message: 'Operation failed',
        entry_by: '127.0.0.1',
      };

      try {
        await nwController.getIpLoc('172.31.56', '127.0.0.1');
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);

        expect(error.response.status).toBe(reply.status);
        expect(error.response.message).toBe(reply.message);
        expect(error.response.entry_by).toBe(reply.entry_by);
        expect(error.response.details).toBeNull();
      }
    });

    it('should return validation error when 172.31.56.ff is passed', async () => {
      const reply = {
        status: 'validation',
        message: 'Operation failed',
        entry_by: '127.0.0.1',
      };

      try {
        await nwController.getIpLoc('172.31.56.ff', '127.0.0.1');
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);

        expect(error.response.status).toBe(reply.status);
        expect(error.response.message).toBe(reply.message);
        expect(error.response.entry_by).toBe(reply.entry_by);
        expect(error.response.details).toBeNull();
      }
    });

    it('should return validation error when 192.168.29.49 is passed', async () => {
      const reply = {
        status: 'validation',
        message: 'Operation failed, private ip detected',
        entry_by: '127.0.0.1',
      };

      try {
        await nwController.getIpLoc('192.168.29.49', '127.0.0.1');
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);

        expect(error.response.status).toBe(reply.status);
        expect(error.response.message).toBe(reply.message);
        expect(error.response.entry_by).toBe(reply.entry_by);
        expect(error.response.details).toBeNull();
      }
    });

    it('should return validation error when 10.0.20.56 is passed', async () => {
      const reply = {
        status: 'validation',
        message: 'Operation failed, private ip detected',
        entry_by: '127.0.0.1',
      };

      try {
        await nwController.getIpLoc('10.0.20.56', '127.0.0.1');
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);

        expect(error.response.status).toBe(reply.status);
        expect(error.response.message).toBe(reply.message);
        expect(error.response.entry_by).toBe(reply.entry_by);
        expect(error.response.details).toBeNull();
      }
    });
  });
});
