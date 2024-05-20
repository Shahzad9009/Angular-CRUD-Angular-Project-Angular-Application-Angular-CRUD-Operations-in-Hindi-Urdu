import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { empVM } from 'src/Models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb()
  {
let employees : empVM[] = [
{id:1, department:'Accounts', empName:'Hassan', mobile:'03001234567', gender:'Male', joinDate:'2024-01-01',email:'hassan123@gmail.com', salary:45000, password:'123456', empStatus:true}, 
{id:2, department:'Manager', empName:'Ali', mobile:'03001234000', gender:'Male', joinDate:'2024-05-01',email:'ali123@gmail.com', salary:35000, password:'12345', empStatus:true}, 
{id:3, department:'Accounts', empName:'M Rabi', mobile:'03211234567', gender:'Male', joinDate:'2024-06-08',email:'mrabi123@gmail.com', salary:55000, password:'123', empStatus:true}, 

];
return {employees};
  }
}
