import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../Shared/api.service';
import { PersonalModel } from './personal-dash board.model';

@Component({
  selector: 'app-personal-dash-board',
  templateUrl: './personal-dash-board.component.html',
  styleUrls: ['./personal-dash-board.component.css']
})
export class PersonalDashBoardComponent implements OnInit {

  formValue !: FormGroup;
  personalModelObjet : PersonalModel = new PersonalModel();
  personalData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilber: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      apellido : [''],
      nombre : [''],
      correo:[''],
      NumTelefonico:[''],
      salario:['']
    })
    this.getAllPersonal();
  }
  clickAddPersonal(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate =false;
  }

  postPersonalDetails(){
    this.personalModelObjet.apellido = this.formValue.value.apellido;
    this.personalModelObjet.nombre = this.formValue.value.nombre;
    this.personalModelObjet.correo = this.formValue.value.correo;
    this.personalModelObjet.NumTelefonico = this.formValue.value.NumTelefonico;
    this.personalModelObjet.salario = this.formValue.value.salario;

    this.api.postPersonal(this.personalModelObjet)
    .subscribe(res=>{
      console.log(res);
      alert("Agregada correctamente")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPersonal();
    },
    err=>{
      alert("Esta mal")
    })

  }

  getAllPersonal(){
    this.api.getPersonal()
    .subscribe(res=>{
      this.personalData = res;

    })
  }

  deletePersonal(row :any){
    this.api.deletePersonal(row.id)
    .subscribe(res=>{
      alert("Empleado eliminado")
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.personalModelObjet.id = row.id;
    this.formValue.controls['apellido'].setValue(row.apellido);
    this.formValue.controls['nombre'].setValue(row.nombre);
    this.formValue.controls['correo'].setValue(row.correo);
    this.formValue.controls['NumTelefonico'].setValue(row.NumTelefonico);
    this.formValue.controls['salario'].setValue(row.salario);
  }

  updatePersonalDetails(){
    this.personalModelObjet.apellido = this.formValue.value.apellido;
    this.personalModelObjet.nombre = this.formValue.value.nombre;
    this.personalModelObjet.correo = this.formValue.value.correo;
    this.personalModelObjet.NumTelefonico = this.formValue.value.NumTelefonico;
    this.personalModelObjet.salario = this.formValue.value.salario;

    this.api.updatePersonal(this.personalModelObjet,this.personalModelObjet.id)
    .subscribe(res=>{
      alert('personal actualizado');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPersonal();
    })
  }

}
