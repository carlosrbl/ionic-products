import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
  NavController,
  ToastController,
} from '@ionic/angular/standalone';
import { ProductInsert } from '../interfaces/product';
import { Products } from '../services/products.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormField,
    IonButtons,
    IonItem,
    IonList,
    IonIcon,
    IonMenuButton,
    IonLabel,
    IonButton,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    RouterLink,
    IonInput,
  ],
})
export class ProductFormPage {
  productModel = signal<ProductInsert>({
    description: '',
    price: 0,
    imageUrl: '',
  });

  productForm = form(this.productModel, (schema) => {
    required(schema.description);
    required(schema.price);
    required(schema.imageUrl);
    min(schema.price, 0.1);
  });

  #productsService = inject(Products);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);
  #changeDetector = inject(ChangeDetectorRef);

  addProduct(event: Event) {
    this.#productsService.addProduct(this.productModel()).subscribe({
      next: async (prod) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Product added succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/products']);
      },
      error: async (error) =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Error adding product',
          })
        ).present(),
    });
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.productForm.imageUrl().setControlValue(photo.dataUrl as string);
    this.#changeDetector.markForCheck();
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.productForm.imageUrl().setControlValue(photo.dataUrl as string);
    this.#changeDetector.markForCheck();
  }
}
