import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importes Angular Material
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

// Importes Models
import { Usuario } from '../../models/usuario';

// Importes Formats
import { TextFormatted } from '../../../shared/text-formatted';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [
    // Importes Angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    // DatePipe,

    // Importes Angular Material
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.scss'
})

export class UsuariosListComponent {
  @Input() usuarios: Usuario[] = []
  usuariosFiltrados: Usuario[] = []
  @Output() add: EventEmitter<boolean> = new EventEmitter(false)
  @Output() edit: EventEmitter<Usuario> = new EventEmitter(false)
  @Output() remove: EventEmitter<Usuario> = new EventEmitter(false)

  readonly displayedColumns = [
    'nome', 'email', 'telefone', 'cidade', 'status', 'data_criacao','acoes'
  ]

  ngAfterContentInit(): void {
    const filterValue = document.getElementsByTagName('input')[0].value.trim().toLowerCase()

    // Se não houver filtro, exibe todos os usuários
    if (!filterValue) {
      this.usuariosFiltrados = this.usuarios
      return
    }
  }

  applyFilter(event: Event) {
    // Função para aplicar o filtro na busca por usuário
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase()

    // Se não houver filtro, exibe todos os usuários
    if (!filterValue) {
      this.usuariosFiltrados = this.usuarios
      return
    }

    // Filtra os usuários com base no valor digitado
    this.usuariosFiltrados = this.usuarios.filter(user =>
      this.filterPredicate(user, filterValue)
    )
  }

  filterPredicate(user: Usuario, filterValue: string): boolean {
    // Função de filtro reutilizável
    return Object.values(user).some(value =>
      value != null && value.toString().toLowerCase().includes(filterValue)
    )
  }

  onAdd(){
    this.add.emit(true)
  }

  onEdit(usuario: Usuario){
    this.edit.emit(usuario)
  }

  onDelete(usuario: Usuario){
    this.remove.emit(usuario)
  }

  formatarTelefone(telefone: string): string{
    return TextFormatted.telFormat(telefone)
  }
}
