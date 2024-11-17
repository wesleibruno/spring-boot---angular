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

  // Variável para visibilidade da tabela
  tabela: boolean = true;

  // Json de clientes
  clientes: Cliente[] = [];

  //Construtor
  constructor(private servico: ClienteService) {}

  // Método de seleção
  selecionar(): void {
    this.servico.selecionar().subscribe((retorno) => (this.clientes = retorno));
  }

  // Método de cadastro
  cadastrar(): void {
    this.servico.cadastrar(this.cliente).subscribe((retorno) => {
      //Cadastrar o cliente no vetor
      this.clientes.push(retorno);

      //Limpar o formulário
      this.cliente = new Cliente();

      //Mensagem
      alert('Cliente cadastrado com sucesso!');
    });
  }

  // Método de editar clientes
  editar(): void {
    this.servico.editar(this.cliente).subscribe((retorno) => {
      // Obter posição do vetor onde está o cliente
      let posicao = this.clientes.findIndex((objt) => {
        return objt.codigo == this.cliente.codigo;
      });

      //Alterar os dados do cliente no vetor
      this.clientes[posicao] = retorno;

      //Visibilidades dos botões
      this.btnCadastro = true;
      this.btnAlterar = false;
      this.btnRemover = false;
      this.btnCancelar = false;

      //Visibilidade da tabela
      this.tabela = true;

      //Limpar o formulário
      this.cliente = new Cliente();

      //Mensagem
      alert('Cliente alterado com sucesso!');
    });
  }

  // Metodo de remover clientes
  remover(): void {
    this.servico.remover(this.cliente.codigo).subscribe((retorno) => {
      // Obter posição do vetor onde estava o cliente
      let posicao = this.clientes.findIndex((obj) => {
        return obj.codigo == this.cliente.codigo;
      });

      //Remover o cliente do vetor
      this.clientes.splice(posicao, 1);

      //Visibilidades dos botões
      this.btnCadastro = true;
      this.btnAlterar = false;
      this.btnRemover = false;
      this.btnCancelar = false;

      //Visibilidade da tabela
      this.tabela = true;

      //Limpar o formulário
      this.cliente = new Cliente();
      //Mensagem
      alert('Cliente removido com sucesso!');
    });
  }

  // Método para cancelar as alterações
  cancelar(): void {
    //Limpar o formulário
    this.cliente = new Cliente();

    //Visibilidades dos botões
    this.btnCadastro = true;
    this.btnAlterar = false;
    this.btnRemover = false;
    this.btnCancelar = false;

    //Visibilidade da tabela
    this.tabela = true;
  }

  // Método para selecionar um cliente especifico
  selecionarCliente(posicao: number): void {
    // Selecionar cliente no vetor
    this.cliente = this.clientes[posicao];

    //Visibiilidade dos botões
    this.btnCadastro = false;
    this.btnAlterar = true;
    this.btnRemover = true;
    this.btnCancelar = true;

    //Visibilidade da tabela
    this.tabela = false;
  }

  // Método de inicialização
  ngOnInit() {
    this.selecionar();
  }
}
