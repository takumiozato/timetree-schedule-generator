# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TimeTree schedule generator application that creates QR codes for TimeTree calendar app events. Users can input event details (title, dates, times, memo, location, URL) via a form interface, and the app generates a QR code that, when scanned, creates an event in the TimeTree app.

## Commands

### Development
- `npm run dev` - Start the development server with Vite
- `npm run build` - Build the project (runs TypeScript compilation and Vite build)
- `npm run preview` - Preview the production build locally

### Code Quality
- `npm run lint` - Run ESLint on the codebase
- `npm run format` - Run Prettier to format code
- `npm run lint:all` - Run both linting and formatting

### Testing
- `npm run test` - Run all tests with Vitest
- `npm run test -- path/to/test.ts` - Run a specific test file
- `npm run test -- -t "test name"` - Run tests that match a specific name

## Architecture

### Core Data Flow

1. User inputs event data through the form (App.tsx)
2. On submit, form data is passed to the `generateQRCode` function from `useQRCode` hook
3. The `generateURL` helper creates a TimeTree-specific URL with the event data:
   - Event data is converted to JSON
   - Compressed with pako (gzip)
   - Base64 encoded
   - Formatted as a TimeTree URL (`https://timetr.ee/ne/{encoded-data}`)
4. This URL is passed to QRCode library to generate a QR code image
5. The QR code is displayed to the user

### Key Components

- **Form Management**: Uses `react-hook-form` for validation and state management
- **Date/Time Handling**: Custom components for date selection with validation
- **Data Processing**: Uses compression (pako) and encoding to create compact QR codes
- **Validation**: Custom validation functions check for valid date/time combinations

### State Management

The application uses React's built-in state management:
- Form state is managed by react-hook-form
- QR code generation state is managed by the `useQRCode` custom hook
- The in-progress user list feature uses the `useUsers` custom hook for API data fetching

### Validation Logic

The app implements validation for:
- Required fields (title, start/end dates)
- Date/time consistency (end time must be after start time)
- Different validation rules for all-day vs. timed events
- URL format validation for attached links