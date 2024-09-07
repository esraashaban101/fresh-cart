import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  categoriesList:Icategory[]=[]
  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._CategoriesService.getAllCategories().subscribe({



          next:(res)=>{
            console.log(res.data)
            this.categoriesList=res.data;
            this._NgxSpinnerService.show()
    },
    error:(err)=>{
      console.log(err)
    }
    })
  }

}
