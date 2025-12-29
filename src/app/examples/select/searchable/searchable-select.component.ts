import { Component, signal } from '@angular/core';
import { SelectComponent, OptionComponent } from '../../../../library/select';

@Component({
  selector: 'app-searchable-select-example',
  standalone: true,
  imports: [SelectComponent, OptionComponent],
  template: `
    <div class="example-page">
      <header class="example-header">
        <h1>Searchable Select</h1>
        <p>Filter options with type-ahead search functionality.</p>
      </header>

      <section class="example-section">
        <h2>Search Countries</h2>
        <div class="example-demo">
          <lib-select
            [(value)]="selectedCountry"
            [searchable]="true"
            placeholder="Search countries..."
            searchPlaceholder="Type to filter..."
          >
            @for (country of countries; track country.code) {
              <lib-option [value]="country.code" [searchTerms]="[country.name, country.code]">
                <span class="country-flag">{{ country.flag }}</span>
                <span>{{ country.name }}</span>
              </lib-option>
            }
          </lib-select>

          <div class="example-output">
            <strong>Selected:</strong> {{ getCountryName(selectedCountry()) }}
          </div>
        </div>
      </section>

      <section class="example-section">
        <h2>Search Programming Languages</h2>
        <div class="example-demo">
          <lib-select
            [(value)]="selectedLang"
            [searchable]="true"
            placeholder="Select a language..."
          >
            @for (lang of languages; track lang) {
              <lib-option [value]="lang">{{ lang }}</lib-option>
            }
          </lib-select>
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

      .country-flag {
        font-size: 1.25em;
        margin-inline-end: var(--lib-spacing-2);
      }
    `,
  ],
})
export class SearchableSelectExampleComponent {
  selectedCountry = signal<string | null>(null);
  selectedLang = signal<string | null>(null);

  countries = [
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
    { code: 'br', name: 'Brazil', flag: '🇧🇷' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
    { code: 'it', name: 'Italy', flag: '🇮🇹' },
    { code: 'es', name: 'Spain', flag: '🇪🇸' },
    { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'se', name: 'Sweden', flag: '🇸🇪' },
  ];

  languages = [
    'TypeScript',
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'Go',
    'Rust',
    'Swift',
    'Kotlin',
    'Ruby',
    'PHP',
    'C++',
    'Scala',
    'Dart',
    'Elixir',
  ];

  getCountryName(code: string | null): string {
    if (!code) return 'None';
    return this.countries.find(c => c.code === code)?.name || code;
  }
}
