import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login/login.component";
import { RegisterComponent } from "../../components/register/register.component";
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-authlayout',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, NavAuthComponent, RouterOutlet, FooterComponent],
  templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.scss'
})
export class AuthlayoutComponent {

}
