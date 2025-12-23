# Project Overview

## Purpose

This Angular component library provides enterprise-grade, production-ready UI components that prioritize:

- **Maximum flexibility** without sacrificing ease of use
- **Uncompromising performance** through modern Angular patterns
- **First-class accessibility** built in from the ground up
- **Complete theming support** with no hardcoded values
- **Seamless forms integration** that just works

## Target Audience

- Angular developers building enterprise applications
- Teams requiring highly customizable, accessible components
- Projects using Angular 17+ with standalone components

## Technology Stack

| Technology | Version | Purpose              |
| ---------- | ------- | -------------------- |
| Angular    | 17+     | Core framework       |
| TypeScript | 5.x     | Type safety          |
| RxJS       | 7.x     | Reactive programming |
| Zone.js    | 0.14+   | Change detection     |

## Core Architecture Principles

### 1. Standalone Components

All components are standalone, eliminating the need for NgModules and enabling tree-shaking.

### 2. Signal-Based State

Modern signal-based reactivity for optimal performance and predictable state management.

### 3. OnPush Change Detection

Every component uses `ChangeDetectionStrategy.OnPush` to minimize unnecessary re-renders.

### 4. CSS Variables Only

Zero hardcoded styling values. Everything uses CSS custom properties for complete theming control.

### 5. ControlValueAccessor

All form-compatible components implement `ControlValueAccessor` for seamless Reactive Forms integration.

## Goals

1. **Reference Implementation**: Demonstrate Angular best practices
2. **Developer Experience**: Intuitive APIs with comprehensive documentation
3. **Enterprise Ready**: Production-grade with high test coverage
4. **Accessibility First**: WCAG 2.1 AA compliance as a baseline
