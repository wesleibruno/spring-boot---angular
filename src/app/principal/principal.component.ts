import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {

  // Objeto do tipo Cliente
  cliente: Cliente = new Cliente();

  // Variavél para visibilidade dos botões
  btnCadastro: boolean = true;
  btnAlterar: boolean = false;
  btnRemover: boolean = false;
  btnCancelar: boolean = false;

  // Json de clientes
  clientes: Cliente[] = [];

  //Construtor
  constructor(private servico: ClienteService) {}

  // Método de seleção
  selecionar(): void {
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno);
  }

  // Método de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
