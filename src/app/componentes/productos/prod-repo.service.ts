import { Injectable } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdRepoService {

  listado: Producto[] = [];

  constructor(private httpClient: HttpClient) {}

  getAll() {
    this.httpClient.get<Producto[]>('http://localhost:3000/producto')
    .subscribe(
      (data) => this.listado = data.sort((a, b) => a.descripcion.localeCompare(b.descripcion))
    );
  }

  getById(id: number) {
    return this.httpClient.get<Producto>(`http://localhost:3000/producto/${id}`);
  }

  agregar(n: Producto) {
    return this.httpClient.post('http://localhost:3000/producto', n );
  }

  eliminar(id: number) {
    if (confirm('Desea eliminar el producto?')) {
      return this.httpClient.delete(`http://localhost:3000/producto/${id}`);
    }
  }

  actualizar(nn: Producto) {
    return this.httpClient.put(`http://localhost:3000/producto/${nn.id}`, nn);
  }
}
