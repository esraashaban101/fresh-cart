import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(ArrayOfObjects:any[],term:string): any[] {
    return ArrayOfObjects.filter((item)=>item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
