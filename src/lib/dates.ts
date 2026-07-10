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
