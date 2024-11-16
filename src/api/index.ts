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
}

export const BASE_URL = '/api';
