import { ApiProperty } from '@nestjs/swagger';
export class Run {
  @ApiProperty()
  id: string;
  @ApiProperty()
  time: number;
  @ApiProperty()
  desc: string;
}
