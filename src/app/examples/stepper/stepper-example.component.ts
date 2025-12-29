import { Component, signal, viewChild } from '@angular/core';
import { StepperComponent, StepComponent } from '../../../library/stepper';
import type {
  StepChangeEvent,
  StepperAnimation,
  StepperOrientation,
} from '../../../library/stepper';

@Component({
  selector: 'app-stepper-example',
  standalone: true,
  imports: [StepperComponent, StepComponent],
  templateUrl: './stepper-example.component.html',
  styleUrl: './stepper-example.component.css',
})
export class StepperExampleComponent {
  readonly stepper = viewChild<StepperComponent>('stepper');

  // State
  readonly activeIndex = signal(0);
  readonly orientation = signal<StepperOrientation>('horizontal');
  readonly animation = signal<StepperAnimation>('slide');
  readonly linear = signal(true);
  readonly step2Disabled = signal(false);

  // Demo form data
  readonly formData = signal({
    name: '',
    email: '',
    plan: 'basic',
  });

  onStepChange(event: StepChangeEvent): void {
    console.log('Step changed:', event);
  }

  // Navigation
  nextStep(): void {
    const stepperRef = this.stepper();
    if (stepperRef) {
      stepperRef.completeCurrentStep();
      stepperRef.next();
    }
  }

  prevStep(): void {
    this.stepper()?.previous();
  }

  // Programmatic control demos
  goToStepById(id: string): void {
    this.stepper()?.goToStepById(id);
  }

  toggleStep2Disabled(): void {
    const stepperRef = this.stepper();
    if (!stepperRef) return;

    if (this.step2Disabled()) {
      stepperRef.enableStep(1);
    } else {
      stepperRef.disableStep(1);
    }
    this.step2Disabled.update(v => !v);
  }

  setStepError(): void {
    this.stepper()?.setStepError(1, 'Please fill all required fields');
  }

  clearStepError(): void {
    this.stepper()?.clearStepError(1);
  }

  reset(): void {
    this.stepper()?.reset();
    this.step2Disabled.set(false);
  }
}
