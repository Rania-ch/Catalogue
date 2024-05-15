import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {



  products! : Array<Product>;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentPage : number =0;
  pageSize:number =5;
  totalPages : number=0;
  currentAction :string="all"
  constructor(private ProductService : ProductService, private fb : FormBuilder) { }

  ngOnInit(): void {
 
  this.searchFormGroup=this.fb.group({
    Keyword : this.fb.control(null)
   
   
  });
  this.handleGetPageProducts();
  }
  handleGetAllProducts(){
    this.ProductService.getAllProducts().subscribe({
      next : (data) => {
       this.products=data;
      },
      error : (err) =>{
       this.errorMessage=err;
      }
     });
  }
  handleDeleteProduct(p :Product){
    let conf =confirm("Are you sure?")
    if (conf==false) return;
     this.ProductService.deleteProduct(p.id).subscribe({
      next :(data) =>{
        // this.handleGetAllProducts()
        let index =this.products.indexOf(p);
        this.products.splice(index,1);
      }
     })
  }
  handleSetPromotion(p: Product) {
    let promo=p.promotion;
   this.ProductService.setPromotion(p.id).subscribe({
    next :(data) =>{
      p.promotion=!promo;
    }, 
    error : err=> {this.errorMessage=err;}
        
   
   })
    }
    handleSearchProducts() {
      this.currentAction="search";
     
      let keyword=this.searchFormGroup.value.Keyword;
      this.ProductService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe(
        {
          next : (data) =>{
            this.products=data.products;
            this.totalPages=data.totalPages;
          }
        }
      )
    }
    handleGetPageProducts(){
      this.ProductService.getPageProducts(this.currentPage,this.pageSize).subscribe({
        next : (data) => {
         this.products=data.products;
         this.totalPages=data.totalPages;
        },
        error : (err) =>{
         this.errorMessage=err;
        }
       });
    }
    gotoPage(i: number) {
      this.currentPage=i;
      if(this.currentAction==='all')
      this.handleGetPageProducts();
    else
      this.handleSearchProducts();
      }
}
