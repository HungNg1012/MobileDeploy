import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RunsService } from './runs.service';
import { Run } from './run.model';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}
  @Get()
  getAllRun() {
    return this.runsService.getAllRun();
  }
  @Get(':id')
  getRun(@Param('id') id: string) {
    return this.runsService.getRun(id);
  }
  @Post('add')
  addRun(@Body('time') time: number, @Body('desc') desc: string) {
    return this.runsService.createRun(desc, time);
  }
  @Get('delete/:id')
  deleteRun(@Param('id') id: string) {
    return this.runsService.deleteRun(id);
  }
  @Post('update')
  updateRun(@Body() payload: Run) {
    return this.runsService.updateRun(payload.id, payload);
  }
}
