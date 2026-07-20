import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private http = inject(HttpClient);

  produto = new FormGroup({
    nome: new FormControl(''),
    preco: new FormControl(0),
    quantidade: new FormControl(0)
  });

  cadastrarProduto() {
    this.http.post('http://localhost:8081/api/v1/produtos', this.produto.value)
    .subscribe((resposta) => {
      console.log(resposta);
    });
  }

}
