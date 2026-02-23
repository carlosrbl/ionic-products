import { afterRenderEffect, Directive, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[valueEquals]',
})
export class ValueEquals {
  valueEquals = input.required<string>();
  #validationChange: undefined | (() => void);

  constructor() {
    // Con effect da error. afterRenderEffect es similar pero se ejecuta después del renderizado
    afterRenderEffect(() => {
      this.valueEquals(); // Creamos dependencia leyendo la señal
      if (this.#validationChange) {
        this.#validationChange(); // Revalidamos campo si cambia valor de entrada
      }
    });
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (control.value !== this.valueEquals()) {
      return { valueEquals: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.#validationChange = fn;
  }
}
