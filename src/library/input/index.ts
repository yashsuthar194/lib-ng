/**
 * Input Module Public API
 * 
 * @example
 * ```typescript
 * import { InputDirective, FormFieldComponent, PrefixDirective, SuffixDirective } from '@lib/input';
 * ```
 */

// Core directive
export { InputDirective } from './core/input.directive';

// Container components
export { FormFieldComponent } from './container/form-field.component';
export { PrefixDirective, SuffixDirective } from './container/affixes.directive';

// Types
export * from './types/input.types';
