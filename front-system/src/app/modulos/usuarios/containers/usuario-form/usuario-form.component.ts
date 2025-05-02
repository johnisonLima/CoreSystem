// Importes Angular
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

// Importes Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

// Importes Components
import { FormDebugComponent } from '../../../shared/components/form-debug/form-debug.component';
import { UsuariosService } from '../../services/usuarios.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

// Models
import { Usuario } from '../../models/usuario';

// Enums
import { PhoneTypes } from '../../enums/phone-types.enum';
import { StatusTypes } from '../../enums/status-types.enum';
import { tap } from 'rxjs';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    // Importes Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Importes Angular Material
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,

    // Importes Componentes
    FormDebugComponent
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  formulario!: FormGroup
  phoneTypes = Object.values(PhoneTypes)
  statusTypes = Object.values(StatusTypes)
  toolbarTitle = 'Novo Usuário'

  constructor(
    private usuariosService: UsuariosService,
    private fb: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ){}

  ngOnInit(){
    this.formulario = this.fb.group({
      id: [''],
      email: [''],
      nome: [''],
      sobrenome: [''],
      status: [''],
      endereco: this.fb.group({
        cep: [''],
        estado: [''],
        cidade: [''],
        bairro: [''],
        numero: [''],
        complemento: [''],
        logradouro: [''],
      }),
      senha: [''],
      senhaRepetir: [''],
      telefones: this.fb.array([this.createTelefone()])
    })
  }

  // retrieveTelefones(usuario: Usuario){
  //   const telefones = []

  //   if(usuario?.telefones){
  //     usuario.telefones.forEach(telefone => telefones.push(this.createTelefone(telefone)))
  //   }
  //   else{
  //     telefones.push(this.createTelefone())
  //   }

  //   return telefones
  // }

  private createTelefone(telefone: any = {numero: '', tipo: ''}): FormGroup {
    return this.fb.group({
      numero: [telefone.numero],
      tipo: [telefone.tipo]
    })
  }

  get telefones(): FormArray {
    return this.formulario.get('telefones') as FormArray
  }

  addTelefone() {
    const email = this.formulario.get('email')?.value
    const telefoneGroup = this.createTelefone()

    telefoneGroup.get('email_usuario')?.setValue(email)
    this.telefones.push(telefoneGroup)
  }

  removeTelefone(index: number) {
    this.telefones.removeAt(index)
  }

  onSubmit(){
    const formValue = this.formulario.value

    const usuario: Usuario = {
      id: formValue.id,
      email: formValue.email,
      nome: formValue.nome,
      sobrenome: formValue.sobrenome,
      estado: formValue.endereco.estado,
      cidade: formValue.endereco.cidade,
      bairro: formValue.endereco.bairro,
      logradouro: formValue.endereco.logradouro,
      complemento: formValue.endereco.complemento,
      numero_residencial: formValue.endereco.numero,
      cep: formValue.endereco.cep,
      senha: formValue.senha,
      status: formValue.status || 'ativo',
      telefone: formValue.telefones
    }

    // const telefones: Telefone[] = formValue.telefones.map((telefone: any) => ({
    //   email_usuario: formValue.email,
    //   numero_telefone: telefone.numero_telefone,
    //   tipo_telefone: telefone.tipo_telefone
    // }))

    this.usuariosService.save(usuario)
    .subscribe({
      next: () => {
        let msg = 'Usuário cadastrado com sucesso!';
        if (formValue.id) {
          msg = 'Usuário editado com sucesso!';
        }
        this.onSuccess(msg);
      },
      error: () => this.onError()
    })

    // this.usuariosService.save(this.formulario.value as Usuario)
    // .subscribe({
    //   next: () => {
    //     let msg = 'Usuário cadastrado com sucesso!'
    //     if(this.formulario.value.id != ''){
    //       msg = 'Usuário editado com sucesso!'
    //     }
    //     this.onSuccess(msg)
    //   },
    //   error: () => this.onError()
    // })
  }

  onCancel(): void {
    this.dialogRef.close(true)
  }

  private onSuccess(msg : string){
    this.snackBar.open(msg, '', { duration: 5000 })
    this.onCancel()
  }

  private onError(){
    this.dialog.open(ErrorDialogComponent, {
      data: 'Erro ao salvar usuário!'
    })
  }
}
