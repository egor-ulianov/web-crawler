import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CrawlRecordsRequest {

  @IsNotEmpty()
  @ApiProperty()
  public sourceIds: Array<number>;
}
