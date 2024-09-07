import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  text: string = ''
  productList: Iproduct[] = [];
  categoriesList: Icategory[] = []
  wishListData: string[] = [];

  // // pagination properties
  // pageSize: number = 0;
  // currentPage: number = 1;
  // total: number = 0;


  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService)
  private readonly _WishlistService = inject(WishlistService)



  getAllProductsSub!: Subscription


  customOptionsMain: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
  customOptionsCategory: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      767: {
        items: 3
      },
      940: {
        items: 4
      },
      1100:
      {
        items: 6
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data)
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.productList = res.data;
        // this.pageSize = res.metadata.limit;
        // this.currentPage = res.metadata.currentPage;
        // this.currentPage = res.results;
        this._NgxSpinnerService.hide()
      },
      error: (err) => {
        console.log(err)
      }
    })

    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        // array of object >> array of id
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
      error: (err) => {
        console.log('wishlist', err)
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllProductsSub.unsubscribe()
  }

  addToCart(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        // console.log(res)
        this._ToastrService.success(res.message)
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  // ---- WishList Section ----

  addWishList(pId: string) {
    this._WishlistService.addToWishList(pId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
        this.wishListData = response.data;
        this._WishlistService.favNumber.next(response.data.length);
      },
      error: (err) => { console.log(err) }
    })
  }

  removeWishList(pId: string): void {
    this._WishlistService.removeFromWishList(pId).subscribe({
      next: (response) => {
        this.wishListData = response.data;
        this._ToastrService.success(response.message)
        this._WishlistService.favNumber.next(response.data.length);
      },
      error: (err) => { console.log(err) }
    })

    // pagination
  }

}
