import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { RunsService } from './runs.service';
import { Run } from './run.model';

class createDTO {
  @ApiProperty()
  time: number;
  @ApiProperty()
  desc: string;
}

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}
  @Get()
  @ApiOperation({ description: 'Retrieve all runs' })
  @ApiResponse({ status: 200, description: 'Runs was gotten successfully' })
  @ApiResponse({ status: 404, description: 'Runs are not found' })
  getAllRun() {
    return this.runsService.getAllRun();
  }
  @Get(':id')
  @ApiOperation({ description: 'Retrieve a run with an ID' })
  @ApiResponse({ status: 200, description: 'Run was gotten successfully' })
  @ApiResponse({
    status: 404,
    description: 'No run is founded with the given ID',
  })
  getRun(@Param('id') id: string) {
    return this.runsService.getRun(id);
  }
  @Post('add')
  @ApiOperation({ description: 'Create a run' })
  @ApiResponse({ status: 200, description: 'Run was created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Request was malformed, e.g. time or desc was null',
  })
  addRun(@Body() payload: createDTO) {
    return this.runsService.createRun(payload.desc, payload.time);
  }
  @Get('delete/:id')
  @ApiOperation({ description: 'Removes a run with the given ID if possible.' })
  @ApiResponse({ status: 200, description: 'Run was deleted successfully' })
  @ApiResponse({
    status: 404,
    description: 'A run with the given ID does not exist',
  })
  deleteRun(@Param('id') id: string) {
    return this.runsService.deleteRun(id);
  }

  @Post('update')
  @ApiResponse({ status: 200, description: 'Run was updated successfully' })
  @ApiResponse({
    status: 400,
    description: 'Request was malformed, e.g. id was null',
  })
  @ApiResponse({
    status: 404,
    description: 'A run with the given ID does not exist',
  })
  updateRun(@Body() payload: Run) {
    return this.runsService.updateRun(payload.id, payload);
  }
}
