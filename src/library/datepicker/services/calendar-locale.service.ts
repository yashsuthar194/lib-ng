/**
 * Calendar Locale Service
 *
 * Centralized i18n service for DatePicker components.
 * Manages month names, weekday names, date formats, and week start day.
 *
 * @example
 * // In component
 * localeService.setLocale('es');
 *
 * // All pickers will now show Spanish months/weekdays
 * <lib-date-picker />
 */

import { Injectable, signal, computed } from '@angular/core';
import type { CalendarLocale, WeekStart } from '../types/datepicker.types';
import { DEFAULT_CALENDAR_LOCALE } from '../types/datepicker.types';

// ============================================================================
// BUILT-IN LOCALES
// ============================================================================

export const LOCALES: Record<string, CalendarLocale> = {
  en: DEFAULT_CALENDAR_LOCALE,
  
  es: {
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    weekdaysFromStart: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    weekStart: 1,
    today: 'Hoy',
    clear: 'Limpiar',
    close: 'Cerrar',
    cancel: 'Cancelar',
    apply: 'Aplicar',
  },
  
  fr: {
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    weekdaysFromStart: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    weekStart: 1,
    today: 'Aujourd\'hui',
    clear: 'Effacer',
    close: 'Fermer',
    cancel: 'Annuler',
    apply: 'Appliquer',
  },
  
  de: {
    months: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    weekdaysFull: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekdaysFromStart: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    dateFormat: 'DD.MM.YYYY',
    timeFormat: '24h',
    weekStart: 1,
    today: 'Heute',
    clear: 'Löschen',
    close: 'Schließen',
    cancel: 'Abbrechen',
    apply: 'Anwenden',
  },
  
  hi: {
    months: [
      'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
      'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
    ],
    monthsShort: ['जन', 'फ़र', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुला', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'],
    weekdays: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    weekdaysFull: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    weekdaysFromStart: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    weekStart: 0,
    today: 'आज',
    clear: 'साफ़ करें',
    close: 'बंद करें',
    cancel: 'रद्द करें',
    apply: 'लागू करें',
  },
  
  ar: {
    months: [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ],
    monthsShort: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'],
    weekdays: ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
    weekdaysFull: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    weekdaysFromStart: ['سبت', 'أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع'],
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    weekStart: 6,
    today: 'اليوم',
    clear: 'مسح',
    close: 'إغلاق',
    cancel: 'إلغاء',
    apply: 'تطبيق',
  },
};

// ============================================================================
// SERVICE
// ============================================================================

@Injectable({ providedIn: 'root' })
export class CalendarLocaleService {
  /** Current locale configuration */
  private readonly _locale = signal<CalendarLocale>(DEFAULT_CALENDAR_LOCALE);
  
  /** Current locale key */
  private readonly _localeKey = signal<string>('en');

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  /** Get current locale (read-only) */
  readonly locale = this._locale.asReadonly();

  /** Get current locale key */
  readonly localeKey = this._localeKey.asReadonly();

  /** Get week start day */
  readonly weekStart = computed<WeekStart>(() => this._locale().weekStart);

  /** Get months array */
  readonly months = computed(() => this._locale().months);

  /** Get short months array */
  readonly monthsShort = computed(() => this._locale().monthsShort);

  /** Get weekdays array */
  readonly weekdays = computed(() => this._locale().weekdays);

  /** Get full weekdays array */
  readonly weekdaysFull = computed(() => this._locale().weekdaysFull);

  /** Get date format string */
  readonly dateFormat = computed(() => this._locale().dateFormat);

  /**
   * Set locale by key
   * @param key Locale key (e.g., 'en', 'es', 'fr', 'de', 'hi', 'ar')
   */
  setLocale(key: string): void {
    const locale = LOCALES[key];
    if (locale) {
      this._locale.set(locale);
      this._localeKey.set(key);
    } else {
      console.warn(`CalendarLocaleService: Unknown locale "${key}", falling back to "en"`);
      this._locale.set(DEFAULT_CALENDAR_LOCALE);
      this._localeKey.set('en');
    }
  }

  /**
   * Set custom locale configuration
   * @param locale Custom locale configuration
   */
  setCustomLocale(locale: CalendarLocale): void {
    this._locale.set(locale);
    this._localeKey.set('custom');
  }

  /**
   * Register a new locale
   * @param key Locale key
   * @param locale Locale configuration
   */
  registerLocale(key: string, locale: CalendarLocale): void {
    LOCALES[key] = locale;
  }

  /**
   * Get all available locale keys
   */
  getAvailableLocales(): string[] {
    return Object.keys(LOCALES);
  }

  /**
   * Check if a locale is available
   */
  hasLocale(key: string): boolean {
    return key in LOCALES;
  }
}
