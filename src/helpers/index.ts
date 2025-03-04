import * as dns from 'dns';
import { Packages } from 'src/packages';

const { InvalidMailServerException } = Packages.EXCEPTIONS;

export class Helpers {
  private counter;
  private denomination;

  constructor() {
    this.denomination = {};
    this.counter = 0;
  }
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

  public currencyDenomination(
    amount: number,
    notes: Array<number>,
  ): Record<string, number> {
    if (amount >= notes[this.counter]) {
      const noteCount = Math.floor(amount / notes[this.counter]);
      const remainderAmt = amount - noteCount * notes[this.counter];
      amount = remainderAmt;
      this.denomination = {
        [notes[this.counter]]: noteCount,
        ...this.denomination,
      };
    }

    if (amount > 1) {
      ++this.counter;
      this.currencyDenomination(amount, notes);
    }

    if (amount == 1) this.denomination = { 1: amount, ...this.denomination };

    return this.denomination;
  }
}
