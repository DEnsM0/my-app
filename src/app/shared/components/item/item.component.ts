import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/interfaces';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

@Input() product: Product
  added: boolean = false

  constructor(
    private productServ: ProductService,
    public _router: Router
  ) { }

  ngOnInit(): void {

  }

  addProduct(product){
    this.productServ.addProduct(product).subscribe()
  }
  checkLibrary(id) {
    if (this.productServ.libraryProducts.some(el => el.id === id)){
      return true
    } 
    else return false
  }

}
