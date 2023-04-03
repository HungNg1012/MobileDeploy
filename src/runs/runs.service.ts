import { Injectable, NotFoundException } from '@nestjs/common';
import { Run } from './run.model';
import { parse } from 'path';
import { log } from 'console';

@Injectable()
export class RunsService {
  private runs: Run[] = [
    {
      id: '1',
      time: 100,
      desc: 'Run Alone',
    },
    {
      id: '2',
      time: 100,
      desc: 'Run 2lone',
    },
    {
      id: '3',
      time: 100,
      desc: 'Run with friend',
    },
  ];

  getAllRun() {
    return [...this.runs];
  }
  findRun(id: string) {
    return this.runs.find((value) => value.id == id);
  }
  getRun(id: string) {
    const run = this.findRun(id);
    if (run == null) {
      throw new NotFoundException('Run Not Found');
    }
    return run;
  }
  createRun(desc: string, time: number) {
    const lastID = this.runs[this.runs.length - 1].id;
    const nextID = (parseInt(lastID) + 1).toString();
    this.runs.push({
      id: nextID,
      time,
      desc,
    });
    return { newId: nextID };
  }

  deleteRun(id: string) {
    // findIndex
    const run = this.findRun(id);
    if (run == null)
      throw new NotFoundException('Cannot find Run with ID: ' + id);
    this.runs = this.runs.filter((run) => run.id != id);
    return this.runs;
  }

  updateRun(id: string, payload: Run) {
    const currentRun = this.findRun(id);
    if (currentRun == null)
      throw new NotFoundException('Cannot find Run with ID: ' + id);
    const update = {
      ...currentRun,
      ...payload,
    };
    const index = this.runs.findIndex((value) => value.id == id);
    this.runs[index] = update;
    return update;
  }

  // updateRun() {

  // }
}
