import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  readonly _MytranslateService = inject(MytranslateService);

  cartNum: number = 0;
  favNum: number = 0;

  change(lang: string): void {
    this._MytranslateService.changeLang(lang);
  }

  ngOnInit(): void {
    //real time add & remove
    this._WishlistService.favNumber.subscribe({
      next: (response) => {
        this.favNum = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
    //display when reload
    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        this.favNum = response.count;
      },
      error: (err) => {
        console.log(err)
      }
    });

    //cart number of items
    this._CartService.cartNumber.subscribe({
      next:(response)=>{
        this.cartNum = response;
      },
      error:(err)=>{
        console.log(err);
      }
    });
    //display when reload
    this._CartService.getCartProducts().subscribe({
      next:(response)=>{
        this.cartNum = response.numOfCartItems;
      },
      error:(err)=>{console.log(err)}
    })
  }

}
