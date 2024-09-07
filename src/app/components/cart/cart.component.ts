import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {


  private readonly _CartService = inject(CartService);
  cartSub!: Subscription
  cartDetails: any = {} as Icart;


  ngOnInit(): void {
    this.cartSub = this._CartService.getCartProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.cartDetails = res.data;
        // console.log(this.cartDetails.totalCartPrice)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe()
  }
  removeCartItem(id: string) {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  updateCount(id: string, newCount: number) {
    if (newCount > 0) {
      this._CartService.updateProductQuantity(id, newCount).subscribe({
        next: (res) => {
          this.cartDetails = res.data;

        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  clearAllCartItems() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        // console.log(res);
        this.cartDetails = {} as Icart;
        this._CartService.cartNumber.next(0);

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
