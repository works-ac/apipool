export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  EXCEPTION = 'exception',
  NA = 'not found',
  CONFLICT = 'conflict',
  VALIDATION = 'validation',
  UNAUTH_ACCESS = 'unauthorized access',
}

export class ApiResponse {
  public status: ApiStatus;
  public message: string;
  public entry_by: string;
  public details: any;

  constructor();
  constructor(status: ApiStatus, message: string);
  constructor(status: ApiStatus, message: string, entry_by: string);
  constructor(status: ApiStatus, message: string, entry_by: string, data: any);

  constructor(
    status?: ApiStatus,
    message?: string,
    entry_by?: string,
    data?: any,
  ) {
    this.status = status ?? ApiStatus.SUCCESS;
    this.message = message ?? 'Api operation succeeded';
    this.entry_by = entry_by ?? '0.0.0.0';
    this.details = data ?? null;
  }

  public toText() {
    return JSON.stringify({
      message: this.message,
      status: this.status,
      entry_by: this.entry_by,
      details: this.details,
    });
  }

  public toHtml() {
    let htmlString: string = `<h1>Api Operation: ${this.status}</h1><br/><p>Api Message: ${this.message}</p><br/><p>Client Info: ${this.entry_by}</p><br/>`;

    if (this.details) {
      if (!Array.isArray(this.details) && typeof this.details === 'object') {
        htmlString += '<table><tr>';
        const headings = Object.keys(this.details);
        const content = Object.values(this.details);

        for (let index = 0; index < headings.length; index++)
          htmlString += `<th>${headings[index]}</th>`;

        htmlString += '</tr><tr>';

        for (let index = 0; index < content.length; index++)
          htmlString += `<td>${content[index]}</td>`;

        htmlString += '</tr>';
      } else if (
        Array.isArray(this.details) &&
        typeof this.details === 'object'
      ) {
        htmlString += '<table><tr>';
        const headings = Object.keys(this.details[0]);

        for (let index = 0; index < headings.length; index++)
          htmlString += `<th>${headings[index]}</th>`;

        htmlString += '</tr>';

        for (let index = 0; index < this.details.length; index++) {
          htmlString += `<tr>`;

          for (
            let jindex = 0;
            jindex < Object.keys(this.details[index]).length;
            jindex++
          )
            htmlString += `<td> ${this.details[index][jindex]} </td>`;

          htmlString += '</tr>';
        }
      } else {
        htmlString += `<p> Misc: ${this.details} </p>`;
      }
    }

    return htmlString;
  }

  public toXml() {
    let xmlString = `<?xml version="1.0" encoding="UTF-8"?><ApiResponse><ApiStatus>${this.status}</ApiStatus><ApiMessage>${this.message}</ApiMessage><ClientInfo>${this.entry_by}</ClientInfo><Misc>`;

    if (this.details) {
      if (!Array.isArray(this.details) && typeof this.details === 'object') {
        for (let keys in this.details) {
          xmlString += `<${keys}>${this.details[keys]}</${keys}>`;
        }
      } else if (
        Array.isArray(this.details) &&
        typeof this.details === 'object'
      ) {
        for (let index = 0; index < this.details.length; index++) {
          for (let keys in this.details[index]) {
            xmlString += `<${keys}>${this.details[index][keys]}<${keys}>`;
          }
        }
      } else {
        xmlString += this.details;
      }

      xmlString += '</Misc>';
    }

    xmlString += '</ApiResponse>';

    return xmlString;
  }
}

export const BASE_URL = '/api';
export enum URLS {
  NETWORKING_CONTROLLER_URL = `${BASE_URL}/basic-utils/networking/`,
  MISC_CONTROLLER_URL = `${BASE_URL}/basic-utils/misc/`,
}

export enum SUPPORTED_API_RES {
  JSON = 'json',
  TXT = 'text',
  HTM = 'html',
  XML = 'xml',
}
