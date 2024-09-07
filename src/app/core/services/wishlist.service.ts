import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  myToken: any = localStorage.getItem('userToken');

  favNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  private readonly _HttpClient = inject(HttpClient)

  url: string = environment.baseUrl + '/api/v1/'

  addToWishList(myProductId: string): Observable<any> {
    return this._HttpClient.post(`${this.url}wishlist`,
      {
        productId: myProductId
      },
      {
        headers: {
          token: this.myToken
        }
      })
  }

  getUserWishList(): Observable<any> {
    return this._HttpClient.get(`${this.url}wishlist`,
      {
        headers: {
          token: this.myToken
        }
      })
  }

  removeFromWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.url}wishlist/${productId}`,
      {
        headers: {
          token: this.myToken
        }
      })
  }
}
