import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAuthComponent } from "./components/nav-auth/nav-auth.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavAuthComponent, FooterComponent,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-route';
}
