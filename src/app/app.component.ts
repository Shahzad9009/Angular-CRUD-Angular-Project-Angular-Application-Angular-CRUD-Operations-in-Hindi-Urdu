import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { empVM } from 'src/Models/employee';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { DBOperation } from 'src/Helpers/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR-Management';
  employeeForm : FormGroup = new FormGroup({});
  employees : empVM[] = [];
  buttonText : string = "Save";
  operation : DBOperation;

  constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _toastr:ToastrService) {}

  ngOnInit(){
    this.setEmpForm();
    this.allEmployees();
  }

  setEmpForm()
  {
    this.buttonText = "Save";
    this.operation = DBOperation.create;
    this.employeeForm = this._fb.group({
      id: [0],
      department: ['', Validators.required],
      empName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      joinDate: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('^([0-9a-zA-Z]([-\\.\\w][0-9a-zA-Z])@([0-9a-zA-Z][\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]],
      salary: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
      empStatus: [false, Validators.requiredTrue],
    });
  }
  
  formSubmit()
  {
    console.log(this.employeeForm.value)
    if(this.employeeForm.invalid)
    {
      return;
    }
    switch(this.operation)
    {
      case DBOperation.create:
      this._empService.addEmployee(this.employeeForm.value).subscribe(res => {
      this._toastr.success("Employee Added Successfully","Employee Registration");
      this.allEmployees();
      this.resetBtn();
      });
      
      break;

      case DBOperation.update:                                                                                                     
      this._empService.updateEmployee(this.employeeForm.value).subscribe(res => {
        this._toastr.success("Employee Update Successfully","Employee Registration");
        this.allEmployees();
        this.resetBtn();
        });

      break;


    }


  }

  get f()
  {

    return this.employeeForm.controls;
  }

  resetBtn()
  {
    this.employeeForm.reset();
    this.buttonText= "Save";
  }
  cancelBtn()
  {
    this.employeeForm.reset();
    this.buttonText= "Save";
  }
  allEmployees()
  {
    this._empService.getAllEmployees().subscribe((response : empVM[]) => {
      
      this.employees = response;
    });
  }

  Edit(empid : number)
  {
    this.buttonText = "Update";
    this.operation = DBOperation.update;
    //alert(empid)
    let empData = this.employees.find((e : empVM)=> e.id === empid );
    this.employeeForm.patchValue(empData);
  }
  Delete(empid : number)
  {
    //alert(empid)
    

    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    this._empService.deleteEmployee(empid).subscribe(res => {
      this.allEmployees();
      this._toastr.success("Employee Deleted","Employee Registration")
    })
    // swalWithBootstrapButtons.fire(
    //   'Deleted!',
    //   'Your file has been deleted.',
    //   'success'
    // )
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
})
  }
}
