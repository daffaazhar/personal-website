// Fixed-width ISO values compare chronologically only after calendar validation.
export function isCalendarMonth(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}$/.test(value)) {
    return false;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  return year > 0 && month >= 1 && month <= 12;
}

export function isCalendarDate(value: unknown): value is string {
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    !isCalendarMonth(value.slice(0, 7))
  ) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function isDateRangeOrdered(start: string, end: string) {
  return isCalendarDate(start) && isCalendarDate(end) && start <= end;
}

export function isMonthRangeOrdered(start: string, end: string) {
  return isCalendarMonth(start) && isCalendarMonth(end) && start <= end;
}

export function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(new Date(date))
    .toUpperCase();
}

export function formatMonthYear(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(new Date(`${value}-01T00:00:00.000Z`))
    .toUpperCase();
}

export function formatLongMonthYear(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}-01T00:00:00.000Z`));
}

export function formatProjectPeriod(yearStart: number, yearEnd: number | null) {
  return yearEnd === null ? `${yearStart}—Now` : `${yearStart}—${yearEnd}`;
}

export function formatExperiencePeriod(start: string, end: string | null) {
  return `${formatLongMonthYear(start)} — ${end === null ? 'Present' : formatLongMonthYear(end)}`;
}
