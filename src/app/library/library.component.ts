import { Component, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../shared/interfaces/interfaces';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  products$: Observable <Product[]>
  products: Product[] = []
  empty:boolean = false
  loading: boolean = true

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(){
    this.fetchData();
  }
  fetchData(){
    setTimeout(() => {
      this.productServ.getLib().subscribe((products:Product[]) =>{
          this.loading = false;
          this.products$ = this.productServ.getLib();       
    }, () => {
      this.loading = false;
      this.empty = true; 
    });
    }, 500);
  }
}
