import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SUPPORTED_API_RES } from 'src/api';

@Injectable()
export class ParseSuppResTypeQuery implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): SUPPORTED_API_RES {
    const val = value ? (value as SUPPORTED_API_RES) : SUPPORTED_API_RES.JSON;

    return val;
  }
}
