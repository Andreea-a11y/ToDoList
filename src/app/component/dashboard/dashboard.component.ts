import { Component,OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task ();
  taskArr : Task[]=[]

  addTaskValue : string='';
  editTaskValue: string='';
  handleUpdateResponse: any;
  handleError: any;
  constructor(private crudService : CrudService){}

  ngOnInit(): void {
    this.editTaskValue='';
    this.addTaskValue='';
    this.taskObj=new Task();
    this.taskArr=[];
    this.getAllTasks();
    
  }
  async getAllTasks() {
    try {
    const res = await this.crudService.getAllTask().toPromise();
    this.handleUpdateResponse(res);
    } catch (err) {
    this.handleError(err);
    }
    }
    
    async addTask() {
    this.taskObj.task_name = this.addTaskValue;
    try {
    const res = await this.crudService.addTask(this.taskObj).toPromise();
    this.ngOnInit();
    this.addTaskValue = '';
    } catch (err) {
    this.handleError(err);
    }
    }
    
    async editTask() {
    this.taskObj.task_name = this.editTaskValue;
    try {
    const res = await this.crudService.editTask(this.taskObj).toPromise();
    this.ngOnInit();
    } catch (err) {
    this.handleError(err);
    }
    }
    
    async deleteTask(etask: Task) {
    try {
    const res = await this.crudService.deleteTask(etask).toPromise();
    this.ngOnInit();
    } catch (err) {
    this.handleError(err);
    }
    }
    
    call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    }
  }