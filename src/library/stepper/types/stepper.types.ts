export type StepState = 'number' | 'active' | 'completed' | 'error' | 'disabled';
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperAnimation = 'none' | 'slide' | 'fade' | 'scale' | 'bounce' | 'flow';
export type StepperLabelPosition = 'end' | 'bottom';

export interface StepConfig {
  id?: string;
  label: string;
  sublabel?: string;
  icon?: string;
  optional?: boolean;
  editable?: boolean;
  completed?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

export interface StepChangeEvent {
  previousIndex: number;
  currentIndex: number;
  previousStepId?: string;
  currentStepId?: string;
}

export interface StepperConfig {
  orientation: StepperOrientation;
  animation: StepperAnimation;
  animationDuration: number;
  linear: boolean;
  labelPosition: StepperLabelPosition;
  showConnector: boolean;
  alternativeLabel: boolean;
}

export const DEFAULT_STEPPER_CONFIG: StepperConfig = {
  orientation: 'horizontal',
  animation: 'slide',
  animationDuration: 300,
  linear: true,
  labelPosition: 'end',
  showConnector: true,
  alternativeLabel: false,
};
