import { GeneralException } from './exceptions/errors.exception';
import { InvalidMailServerException } from './exceptions/network.exception';
import { ContentTypeInterceptor } from './interceptors/response.interceptor';
import { ParseSuppResTypeQuery } from './pipes/response.pipe';

export const Packages = {
  EXCEPTIONS: { GeneralException, InvalidMailServerException },
  PIPES: { ParseSuppResTypeQuery },
  INTERCEPTORS: { ContentTypeInterceptor },
};
