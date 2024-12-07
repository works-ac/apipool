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

  public static paginate(
    data: Array<Record<string, any>>,
    offset: number,
    limit: number,
  ): Array<Record<string, any>> {
    const result = [];
    if (offset + limit > data.length) return result;

    for (let index = offset; index <= limit; index++) {
      result.push(data[index]);
    }

    return result;
  }

  public static async loadJSONContent(
    path: string,
  ): Promise<Array<Record<string, any>>> {
    const content = await import(path);
    return content?.default || [];
  }
}
