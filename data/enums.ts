export enum WeekdaysDE {
  Montag = 'Montag',
  Dienstag = 'Dienstag',
  Mittwoch = 'Mittwoch',
  Donnerstag = 'Donnerstag',
  Freitag = 'Freitag',
  Samstag = 'Samstag',
  Sonntag = 'Sonntag',
}

export enum WeekdaysDEShort {
  Mo = 'Mo',
  Di = 'Di',
  Mi = 'Mi',
  Do = 'Do',
  Fr = 'Fr',
  Sa = 'Sa',
  So = 'So',
}

export enum Weekdays {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export const weekdaysMapping: Record<Weekdays, WeekdaysDE> = {
  [Weekdays.Monday]: WeekdaysDE.Montag,
  [Weekdays.Tuesday]: WeekdaysDE.Dienstag,
  [Weekdays.Wednesday]: WeekdaysDE.Mittwoch,
  [Weekdays.Thursday]: WeekdaysDE.Donnerstag,
  [Weekdays.Friday]: WeekdaysDE.Freitag,
  [Weekdays.Saturday]: WeekdaysDE.Samstag,
  [Weekdays.Sunday]: WeekdaysDE.Sonntag,
}

// TODO: think about adding others
export enum VacationEntryTypes {
  Urlaub = 'Urlaub',
  Überstundenabbau = 'Überstundenabbau',
}

export enum VacationEntryDurations {
  Halbtags = 'halbtags',
  Ganztags = 'ganztags',
}

export enum SicknessEntryTitles {
  Krank = 'krank',
  Arztbesuch = 'Arztbesuch',
}
