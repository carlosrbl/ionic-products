import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterLink, IonRouterOutlet, IonSplitPane, Platform } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowUndoCircle, camera, checkmarkCircle, documentText, home, images, logIn } from 'ionicons/icons';
import { Auth } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonRouterLink, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonAvatar, IonImg],
})
export class AppComponent {
  #authService = inject(Auth);
  #platform = inject(Platform);

  userResource = this.#authService.getProfile();
  user = computed(() => this.userResource.hasValue() ? this.userResource.value().user : null);

  public appPages = [{ title: 'Home', url: '/products', icon: 'home' }];
  constructor() {
    addIcons({ home, logIn, documentText, checkmarkCircle, images, camera, arrowUndoCircle, });
    this.initializeApp();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
    }
  }
}
