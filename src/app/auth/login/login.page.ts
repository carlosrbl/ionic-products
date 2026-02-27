import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  AlertController,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormField,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
  ],
})
export class LoginPage {
  userModel = signal({
    email: '',
    password: '',
  });

  userForm = form(this.userModel, (schema) => {
    required(schema.email);
    required(schema.password);
  });

  #authService = inject(Auth);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);

  login(event: Event) {
    event.preventDefault();
    this.#authService
      .login(this.userModel().email, this.userModel().password)
      .subscribe({
        next: () => this.#navCtrl.navigateRoot(['/products']),
        error: async (error) => {
          (
            await this.#alertCtrl.create({
              header: 'Login error',
              message: 'Incorrect email and/or password',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }
}
