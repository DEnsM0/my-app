import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable} from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../interfaces/interfaces";


@Injectable({providedIn:'root'})

export class ProductService{

    libraryProducts: Product[] =[]
    

    constructor(private http: HttpClient){}
    getAll():Observable <Product[]>{
        return this.http.get(`${environment.Datebase}/products.json`)
        .pipe( map((res:{[key:string]:any}) => {
                return Object.keys(res)
                .map( key => ({
                    ...res[key],
                    id: key
                }))
            })
        )
    }
    getLib():Observable <Product[]>{
        return this.http.get(`${environment.Datebase}/library.json`)
        .pipe( map((res:{[key:string]:any}) => {
                return Object.keys(res)
                .map( key => ({
                    ...res[key],
                    id: key
                }))
            })
        )
    }
    addProduct(product:Product):Observable <Product>{
        return this.http.put<Product>(`${environment.Datebase}/library/${product.id}.json`, product)
    }
    getProductsList(){
        this.getLib().subscribe((products:Product[]) =>{
          this.libraryProducts = products
        }, (err) => {
          console.log(err);
        });
    }

}

