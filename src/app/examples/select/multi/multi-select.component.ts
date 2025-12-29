import { Component, signal } from '@angular/core';
import { SelectComponent, OptionComponent } from '../../../../library/select';

@Component({
  selector: 'app-multi-select-example',
  standalone: true,
  imports: [SelectComponent, OptionComponent],
  template: `
    <div class="example-page">
      <header class="example-header">
        <h1>Multi-Select</h1>
        <p>Select multiple options with chip display.</p>
      </header>

      <section class="example-section">
        <h2>Select Tags</h2>
        <div class="example-demo">
          <lib-select
            [(value)]="selectedTags"
            [multiple]="true"
            [searchable]="true"
            placeholder="Select tags..."
          >
            @for (tag of tags; track tag.id) {
              <lib-option [value]="tag.id">
                <span class="tag-dot" [style.background]="tag.color"></span>
                {{ tag.name }}
              </lib-option>
            }
          </lib-select>

          <div class="example-output">
            <strong>Selected ({{ selectedTags().length }}):</strong>
            {{ getTagNames(selectedTags()) }}
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>Limited Selections (Max 3)</h2>
        <div class="example-demo">
          <lib-select
            [(value)]="selectedSkills"
            [multiple]="true"
            [maxSelections]="3"
            placeholder="Select up to 3 skills..."
          >
            @for (skill of skills; track skill) {
              <lib-option [value]="skill">{{ skill }}</lib-option>
            }
          </lib-select>

          <div class="example-hint">{{ 3 - selectedSkills().length }} selection(s) remaining</div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .example-page {
        max-width: 600px;
      }

      .example-header {
        margin-block-end: var(--lib-spacing-8);
      }

      .example-header h1 {
        font-size: var(--lib-font-size-2xl);
        font-weight: var(--lib-font-weight-bold);
        color: var(--lib-color-neutral-900);
        margin-block-end: var(--lib-spacing-2);
      }

      .example-header p {
        color: var(--lib-color-neutral-600);
        margin: 0;
      }

      .example-section {
        margin-block-end: var(--lib-spacing-8);
      }

      .example-section h2 {
        font-size: var(--lib-font-size-lg);
        font-weight: var(--lib-font-weight-semibold);
        color: var(--lib-color-neutral-800);
        margin-block-end: var(--lib-spacing-4);
      }

      .example-demo {
        padding: var(--lib-spacing-6);
        background: var(--lib-color-neutral-0);
        border: var(--lib-border-width-thin) solid var(--lib-color-neutral-200);
        border-radius: var(--lib-border-radius-lg);
      }

      .example-output {
        margin-block-start: var(--lib-spacing-4);
        padding: var(--lib-spacing-3);
        background: var(--lib-color-neutral-50);
        border-radius: var(--lib-border-radius-base);
        font-size: var(--lib-font-size-sm);
        color: var(--lib-color-neutral-600);
      }

      .example-hint {
        margin-block-start: var(--lib-spacing-3);
        font-size: var(--lib-font-size-xs);
        color: var(--lib-color-neutral-500);
      }

      .tag-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: var(--lib-border-radius-full);
        margin-inline-end: var(--lib-spacing-2);
      }
    `,
  ],
})
export class MultiSelectExampleComponent {
  selectedTags = signal<string[]>([]);
  selectedSkills = signal<string[]>([]);

  tags = [
    { id: 'bug', name: 'Bug', color: '#ef4444' },
    { id: 'feature', name: 'Feature', color: '#22c55e' },
    { id: 'enhancement', name: 'Enhancement', color: '#3b82f6' },
    { id: 'documentation', name: 'Documentation', color: '#8b5cf6' },
    { id: 'help-wanted', name: 'Help Wanted', color: '#f59e0b' },
    { id: 'urgent', name: 'Urgent', color: '#ec4899' },
    { id: 'question', name: 'Question', color: '#06b6d4' },
  ];

  skills = [
    'Angular',
    'React',
    'Vue',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Go',
    'Rust',
    'Docker',
    'Kubernetes',
    'AWS',
    'GraphQL',
    'PostgreSQL',
    'MongoDB',
  ];

  getTagNames(ids: string[]): string {
    if (ids.length === 0) return 'None';
    return ids.map(id => this.tags.find(t => t.id === id)?.name || id).join(', ');
  }
}
