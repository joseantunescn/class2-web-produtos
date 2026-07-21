import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private http = inject(HttpClient);

  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  produtos = signal<any[]>([]);

  produto = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required, Validators.min(0)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(0)])
  });

  ngOnInit() {
    this.consultarProdutos();
  }

  cadastrarProduto() {
    this.http.post('http://localhost:8081/api/v1/produtos', this.produto.value)
    .subscribe({
      next: (response: any) => {
        this.mensagemSucesso.set(response.mensagem);
        this.mensagemErro.set('');
        this.produto.reset();
      },
      error: (e: any) => {
        this.mensagemErro.set(e.error.mensagem);
        this.mensagemSucesso.set('');
      }
    });
  }

    //Função para consultar os produtos da API
  consultarProdutos() {
    //fazendo uma requisição HTTP GET para a api de produtos
    this.http.get('http://localhost:8081/api/v1/produtos')
      .subscribe({ //Aguardando o retorno da API
        next: (dados) => { //Capturando a resposta de foi sucesso
          this.produtos.set(dados as any[]);
        },
        error: (e) => { //Capturando a resposta se foi erro
          console.log(e.error);
        }
      });
  }


}
