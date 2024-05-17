import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {


productId! :string;
product! :Product;
ProductFormGroup! :FormGroup;
  constructor( private route : ActivatedRoute, public productService :ProductService, private fb : FormBuilder) {
    this.productId=this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next : (product)=>{
        this.product=product;
        this.ProductFormGroup=this.fb.group({
          name : this.fb.control( product.name,[Validators.required,Validators.minLength(4)]),
          price : this.fb.control(product.price,[Validators.required,Validators.min(200)]),
          promotion : this.fb.control(product.promotion,[Validators.required])
        })},
      error : (err) =>{
        console.log(err)
      } 
    })
  }

  handleEditProduct() {
    let product = this.ProductFormGroup.value;
    product.id=this.product.id
    this.productService.updateProduct(product).subscribe({
      next :(data) =>{
        alert("Product edited successfully");
        this.ProductFormGroup.reset();
      },
      error : (err) => {
        console.log(err)
      }

    })
    }
}
