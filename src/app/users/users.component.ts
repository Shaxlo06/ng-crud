import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './user.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel()
  employeeDate !: any 
  showAdd !: boolean
  showUpdate !: boolean

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [1],
      firstName: [""],
      lastName: [""],
      email: [""],
      mobile: [""],
      salary: [""]
    })
    this.getAllEmployees()
  }

  clickAddEmploye(){
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName
    this.employeeModelObj.lastName = this.formValue.value.lastName
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.mobile = this.formValue.value.mobile
    this.employeeModelObj.salary = this.formValue.value.salary

    this.api.postEmploye(this.employeeModelObj)
      .subscribe(res => {
        this.getAllEmployees()
        alert("User added succesfully") 
        let ref = document.getElementById("cancel") 
        ref?.click() 
        this.formValue.reset()    
      },
      err => {
        alert("Something went wrong")
      })
  }

  getAllEmployees() {
    this.api.getEmploye()
    .subscribe(res => {
      this.employeeDate = res
    })
  }

  deleteEmploye(row : any) {
    this.api.deleteEmploye(row.id)
    .subscribe( res => {
      alert("Employee deleted")
      this.getAllEmployees()
    })
  }

  onEdit(row: any) {
    this.showAdd = false
    this.showUpdate = true

    this.employeeModelObj.id = row.id
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updatedEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName
    this.employeeModelObj.lastName = this.formValue.value.lastName
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.mobile = this.formValue.value.mobile
    this.employeeModelObj.salary = this.formValue.value.salary

    this.api.updateEmploye(this.employeeModelObj, this.employeeModelObj.id) 
    .subscribe(res => {
      alert("Updated successfully")
      let ref = document.getElementById("cancel")
      ref?.click()
      this.formValue.reset()
      this.getAllEmployees()
    })
  }

}
