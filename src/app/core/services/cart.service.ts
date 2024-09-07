import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient)

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  //  myHeaders:any=
  //  {
  //   token:localStorage.getItem('userToken')
  //  }
  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        // body
        "productId": id
      },
      {
        // headers:this.myHeaders

      });

  }
  getCartProducts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`
    )
  }
  deleteSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      // headers:this.myHeaders
    })
  }

  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,

      {

        "count": newCount

      }
    )
  }
  clearCart() {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}
