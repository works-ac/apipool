import * as dns from 'dns';
import { Packages } from 'src/packages';

const { InvalidMailServerException } = Packages.EXCEPTIONS;

export class Helpers {
  public static checkForMailServer(domain: string): Promise<dns.MxRecord[]> {
    return new Promise((resolve, reject) => {
      dns.resolveMx(domain, (err, addresses) => {
        if (err) reject(new InvalidMailServerException('Invalid mail server'));
        else resolve(addresses);
      });
    });
  }
}
