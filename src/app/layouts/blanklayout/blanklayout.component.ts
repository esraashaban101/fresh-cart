import { Component } from '@angular/core';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blanklayout',
  standalone: true,
  imports: [NavBlankComponent, FooterComponent,RouterOutlet],
  templateUrl: './blanklayout.component.html',
  styleUrl: './blanklayout.component.scss'
})
export class BlanklayoutComponent {

}
