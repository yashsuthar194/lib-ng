/**
 * Card Example Component
 * 
 * Demonstrates Card component with various configurations.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardContentComponent,
  CardFooterComponent,
  CardImageDirective,
} from '../../../library/card';

@Component({
  selector: 'app-card-example',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
    CardImageDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-page">
      <h1>Card Examples</h1>
      
      <!-- Basic Card -->
      <section class="example-section">
        <h2>Basic Card</h2>
        <div class="card-grid">
          <lib-card>
            <lib-card-header>
              <h3>Card Title</h3>
              <p>Subtitle text</p>
            </lib-card-header>
            <lib-card-content>
              This is the card content. You can put any content here including text, images, and other components.
            </lib-card-content>
            <lib-card-footer>
              <button class="btn btn--primary">Action</button>
              <button class="btn btn--outline">Cancel</button>
            </lib-card-footer>
          </lib-card>
        </div>
      </section>

      <!-- Variants -->
      <section class="example-section">
        <h2>Variants</h2>
        <div class="card-grid card-grid--3">
          <lib-card variant="elevated">
            <lib-card-header>
              <h3>Elevated</h3>
            </lib-card-header>
            <lib-card-content>
              Card with shadow elevation.
            </lib-card-content>
          </lib-card>
          
          <lib-card variant="outlined">
            <lib-card-header>
              <h3>Outlined</h3>
            </lib-card-header>
            <lib-card-content>
              Card with border only.
            </lib-card-content>
          </lib-card>
          
          <lib-card variant="filled">
            <lib-card-header>
              <h3>Filled</h3>
            </lib-card-header>
            <lib-card-content>
              Card with solid background.
            </lib-card-content>
          </lib-card>
        </div>
      </section>

      <!-- With Image -->
      <section class="example-section">
        <h2>With Image</h2>
        <div class="card-grid card-grid--3">
          <lib-card>
            <img 
              libCardImage 
              [height]="160"
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" 
              alt="Mountains"
            />
            <lib-card-content>
              <h4>Mountain View</h4>
              <p>Beautiful mountain landscape with snow caps.</p>
            </lib-card-content>
          </lib-card>
          
          <lib-card>
            <img 
              libCardImage 
              [height]="160"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop" 
              alt="Ocean"
            />
            <lib-card-content>
              <h4>Ocean Waves</h4>
              <p>Calm ocean waves at sunset.</p>
            </lib-card-content>
          </lib-card>
          
          <lib-card>
            <img 
              libCardImage 
              [height]="160"
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop" 
              alt="Forest"
            />
            <lib-card-content>
              <h4>Forest Path</h4>
              <p>Peaceful walk through nature.</p>
            </lib-card-content>
          </lib-card>
        </div>
      </section>

      <!-- Clickable Cards -->
      <section class="example-section">
        <h2>Clickable Cards</h2>
        <p class="hint">Cards can be interactive. Try clicking or pressing Enter/Space.</p>
        <div class="card-grid card-grid--3">
          <lib-card [clickable]="true" (cardClick)="onCardClick('Project 1')">
            <lib-card-header>
              <h3>📁 Project Alpha</h3>
            </lib-card-header>
            <lib-card-content>
              Click this card to navigate to Project Alpha details.
            </lib-card-content>
          </lib-card>
          
          <lib-card [clickable]="true" variant="outlined" (cardClick)="onCardClick('Project 2')">
            <lib-card-header>
              <h3>📁 Project Beta</h3>
            </lib-card-header>
            <lib-card-content>
              Outlined clickable card with hover effects.
            </lib-card-content>
          </lib-card>
          
          <lib-card [clickable]="true" variant="filled" (cardClick)="onCardClick('Project 3')">
            <lib-card-header>
              <h3>📁 Project Gamma</h3>
            </lib-card-header>
            <lib-card-content>
              Filled clickable card variant.
            </lib-card-content>
          </lib-card>
        </div>
      </section>

      <!-- Footer with Divider -->
      <section class="example-section">
        <h2>Footer with Divider</h2>
        <div class="card-grid">
          <lib-card>
            <lib-card-header>
              <h3>Product Details</h3>
              <p>Premium subscription</p>
            </lib-card-header>
            <lib-card-content>
              <p><strong>$99/month</strong></p>
              <p>Includes all features, unlimited users, and priority support.</p>
            </lib-card-content>
            <lib-card-footer [divider]="true">
              <button class="btn btn--primary">Subscribe</button>
              <button class="btn btn--outline">Learn More</button>
            </lib-card-footer>
          </lib-card>
        </div>
      </section>

      <!-- Content Only -->
      <section class="example-section">
        <h2>Content Only</h2>
        <div class="card-grid card-grid--2">
          <lib-card>
            <lib-card-content>
              <h4>Simple Card</h4>
              <p>Just content, no header or footer needed.</p>
            </lib-card-content>
          </lib-card>
          
          <lib-card variant="outlined">
            <lib-card-content>
              <h4>Outlined Simple</h4>
              <p>Minimal card with border style.</p>
            </lib-card-content>
          </lib-card>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .example-page {
      padding: var(--lib-spacing-6, 24px);
      max-width: 1000px;
    }

    h1 {
      font-size: var(--lib-font-size-2xl, 1.5rem);
      margin-block-end: var(--lib-spacing-6, 24px);
      color: var(--lib-color-neutral-900, #18181b);
    }

    .example-section {
      margin-block-end: var(--lib-spacing-8, 32px);
    }

    .example-section h2 {
      font-size: var(--lib-font-size-lg, 1.125rem);
      margin-block-end: var(--lib-spacing-4, 16px);
      color: var(--lib-color-neutral-800, #27272a);
    }

    .hint {
      font-size: var(--lib-font-size-sm, 0.875rem);
      color: var(--lib-color-neutral-500, #71717a);
      margin-block-end: var(--lib-spacing-4, 16px);
    }

    .card-grid {
      display: grid;
      gap: var(--lib-spacing-4, 16px);
    }

    .card-grid--2 {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .card-grid--3 {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    lib-card-content h4 {
      margin: 0 0 var(--lib-spacing-2, 8px);
      font-size: var(--lib-font-size-base, 1rem);
      font-weight: var(--lib-font-weight-semibold, 600);
      color: var(--lib-color-neutral-900, #18181b);
    }

    lib-card-content p {
      margin: 0;
      color: var(--lib-color-neutral-600, #52525b);
    }

    .btn {
      padding: var(--lib-spacing-2, 8px) var(--lib-spacing-4, 16px);
      font-size: var(--lib-font-size-sm, 0.875rem);
      font-weight: 500;
      font-family: inherit;
      border-radius: var(--lib-border-radius-md, 6px);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn--primary {
      background: var(--lib-color-primary-500, #6366f1);
      color: white;
      border: none;
    }

    .btn--primary:hover {
      background: var(--lib-color-primary-600, #4f46e5);
    }

    .btn--outline {
      background: transparent;
      color: var(--lib-color-neutral-700, #374151);
      border: 1px solid var(--lib-color-neutral-300, #d1d5db);
    }

    .btn--outline:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }
  `]
})
export class CardExampleComponent {
  onCardClick(name: string): void {
    console.log(`Card clicked: ${name}`);
  }
}
