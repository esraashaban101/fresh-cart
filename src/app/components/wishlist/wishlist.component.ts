import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);




  productsArray:Iproduct[]=[];
  wishListData:string[] = [];

  ngOnInit(): void {
    this._WishlistService.getUserWishList().subscribe({
      next:(response)=>{
        this.productsArray = response.data
        // array of object >> array of id
        const newData = response.data.map( (item:any)=> item._id );
        this.wishListData = newData;
      },
      error:(err)=>{
        console.log('wishlist',err)
      }
    })
  }

  addWishList(pId:string){
    this._WishlistService.addToWishList(pId).subscribe({
      next:(response)=>{
        this.wishListData = response.data;
        this._ToastrService.success(response.message)
        this._WishlistService.favNumber.next(response.data.length);
      },
      error:(err)=>{console.log(err)}
    })
  }

  removeWishList(pId:string):void{
    this._WishlistService.removeFromWishList(pId).subscribe({
      next:(response)=>{
        // console.log('wishlis',response)
        this._ToastrService.success(response.message)
        this.wishListData = response.data;
        const newProductData = this.productsArray.filter( (item)=> this.wishListData.includes(item._id) );
        this.productsArray = newProductData;

        this._WishlistService.favNumber.next(response.data.length);
      },
      error:(err)=>{console.log(err)}
    })
  }


  addToCart(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        // console.log(res)
        this._ToastrService.success(res.message)
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log('wishlist',err)
      }
    })
  }


}
