import { Observable, Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit ,OnDestroy {

   private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService)
  detailsProuduct:Iproduct|null = null;
  specificproductsub!:Subscription
  ngOnInit(): void {
     this.specificproductsub= this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
    let idProduct=  p.get('id');

    // call api for specific product
    this._ProductsService.getSpecificProduct(idProduct).subscribe(
      {
              next:(res)=>{
                      this.detailsProuduct=res.data;
              },
              error:(err)=>{
                       console.log(err)
              }
      })



    }
})
  }
  ngOnDestroy(): void {
   this.specificproductsub.unsubscribe()
  }

  addToCart(id:string)
  {

    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>
      {
            // console.log(res)
            this._ToastrService.success(res.message)
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
