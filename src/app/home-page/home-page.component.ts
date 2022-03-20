import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../shared/interfaces/interfaces';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  products$: Observable <Product[]>
  searchInput: string
  products: Product[]
  currentProducts: Product[]
  searchBar: false
  rangeMax: number =100
  rangeMin: number
  currentRange: number 

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.fetchAll()
  }
  fetchAll(){
    setTimeout(() => {
      this.products$ = this.productServ.getAll();
      this.getProducts();
      this.productServ.getProductsList();
      this.setRangeValues();
      this.currentRange = this.rangeMax
    }, 500);
  }
  getProducts(){
    this.productServ.getAll().subscribe((products:Product[]) =>{
      this.products = products
    }, (err) => {
      console.log(err);
      });
  }
  searchProducts(){
    this.currentProducts = this.products
        .filter(product =>{
          return product.title.toLowerCase().includes(this.searchInput.trim().toLocaleLowerCase())
        });
        this.filterBySlider(this.currentRange);
      this.products$ = of(this.currentProducts);
  }
  setRangeValues(){
    this.productServ.getAll().subscribe((products:Product[]) =>{
      this.rangeMax = Math.max.apply(Math, products.map(product =>{return product.price}));
      this.rangeMin = Math.min.apply(Math, products.map(product =>{return product.price}));
    }, (err) => {
      console.log(err);
      });
  }
  filterBySlider(value: number){
    let products
    if(this.currentProducts ===undefined) products = this.products.filter(product =>{
      return product.price<=value;
    });
       else products = this.currentProducts
        .filter(product =>{
          return product.price<=value;
        });
      this.products$ = of(products);
  }
}
