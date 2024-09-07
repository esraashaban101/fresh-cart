import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit  {
   private readonly _BrandsService=inject(BrandsService);
   private readonly _NgxSpinnerService=inject(NgxSpinnerService);
   brandList:Ibrands[] = []

   ngOnInit(): void {
    this._NgxSpinnerService.show();

    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
         this.brandList=res.data;
        this._NgxSpinnerService.hide()
      },

      error:(err)=>{
        console.log(err)
      }
    })
   }

}
