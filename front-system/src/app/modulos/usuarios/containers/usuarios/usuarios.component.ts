// Importes Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// Importes Angular Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Importes Components
import { UsuariosListComponent } from '../../components/usuarios-list/usuarios-list.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

// Importes Models
import { Usuario } from '../../models/usuario';

// Importes Services
import { UsuariosService } from '../../services/usuarios.service';
import { FormDialogComponent } from '../../../shared/components/form-dialog/form-dialog.component';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    // Importes Angular
    HttpClientModule,
    CommonModule,

    // Importes Angular Material
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    // Importes Components
    UsuariosListComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})

export class UsuariosComponent {
  usuarios$: Observable<Usuario[]> | null = null

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    // private snackBar: MatSnackBar,
  ){}

  ngOnInit(){
    this.refresh()
  }

  refresh(){
    this.usuarios$ = this.usuariosService.listUserAndPhone()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar usuários.')
        return of([])
      })
    )
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      // width: '800px',
      width: '1000px',
      data: {
        toolbarTitle: 'Novo Usuário',
        component: UsuarioFormComponent
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.refresh()
      }
    })
  }

  onEdit(usuario: Usuario){
    this.router.navigate(['edit', usuario.id], { relativeTo: this.route })
  }

  onRemove(usuario: Usuario){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o usuário ${usuario.nome}?`
    })

    // dialogRef.afterClosed().subscribe((result: boolean) => {
    //   if(result){
    //     this.usuariosService.remove(usuario.id)
    //     .subscribe({
    //       next: () => {
    //         this.refresh()
    //         this.snackBar.open('Usuário removido com sucesso!', 'Fechar',
    //         {
    //           duration: 6000,
    //           verticalPosition: 'top',
    //           horizontalPosition: 'center'
    //         })
    //       },
    //       error: () => this.onError('Erro ao tentar remover usuário.')
    //     })
    //   }
    // })
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }
}
