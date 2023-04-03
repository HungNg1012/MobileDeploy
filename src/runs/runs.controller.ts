import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiProperty  } from '@nestjs/swagger';
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
  @ApiOperation({ description: 'Removes a run with the given ID if possible.' })
  @ApiResponse({ status: 200, description: 'Run was deleted successfully'})
  @ApiResponse({ status: 404, description: 'A run with the given ID does not exist'})
  deleteRun(@Param('id') id: string) {
    return this.runsService.deleteRun(id);
  }
  @Post('update')
  @ApiResponse({ status: 200, description: 'Run was updated successfully'})
  @ApiResponse({ status: 400, description: 'Request was malformed, e.g. id was null'})
  @ApiResponse({ status: 404, description: 'A run with the given ID does not exist'})
  updateRun(@Body() payload: Run) {
    return this.runsService.updateRun(payload.id, payload);
  }
}
