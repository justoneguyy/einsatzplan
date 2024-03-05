import { Assignment, Employee } from '@/lib/types'

export const weekDays = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
]

export const weekDaysShort = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

// roles: admin, user, rufbereitschaft
export const employees: Employee[] = Array.from({ length: 13 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Employee ${i + 1}`,
  profilePicture: '/images/enton.png',
  availability: [
    { status: 'available', color: 'green' },
    { status: 'unavailable', color: 'red' },
    { status: 'do-not-disturb', color: 'yellow' },
    { status: 'on-vacation', color: 'blue' },
    { status: 'at-school', color: 'purple' },
  ],
  assignments: [
    {
      day: 'Monday',
      tasks: [
        { timeFrom: '8:00', timeTil: '10:00', task: 'Daily meeting 1' },
        { timeFrom: '10:00', timeTil: '12:00', task: 'Coding' },
        { timeFrom: '12:00', timeTil: '13:00', task: 'Lunch break' },
        { timeFrom: '13:00', timeTil: '15:00', task: 'Coding' },
        { timeFrom: '15:00', timeTil: '17:00', task: 'Documentation' },
      ],
    },
    {
      day: 'Tuesday',
      tasks: [
        { timeFrom: '8:00', timeTil: '10:00', task: 'Daily meeting 2' },
        { timeFrom: '10:00', timeTil: '12:00', task: 'Code review' },
        { timeFrom: '12:00', timeTil: '13:00', task: 'Lunch break' },
        { timeFrom: '13:00', timeTil: '15:00', task: 'Code review' },
        { timeFrom: '15:00', timeTil: '17:00', task: 'Testing' },
      ],
    },
    {
      day: 'Wednesday',
      tasks: [
        { timeFrom: '8:00', timeTil: '10:00', task: 'Daily meeting 3' },
        { timeFrom: '10:00', timeTil: '12:00', task: 'Code review' },
        { timeFrom: '12:00', timeTil: '13:00', task: 'Lunch break' },
        { timeFrom: '13:00', timeTil: '15:00', task: 'Code review' },
        { timeFrom: '15:00', timeTil: '17:00', task: 'Testing' },
      ],
    },
    {
      day: 'Thursday',
      tasks: [
        { timeFrom: '8:00', timeTil: '10:00', task: 'Daily meeting 4' },
        { timeFrom: '10:00', timeTil: '12:00', task: 'Code review' },
        { timeFrom: '12:00', timeTil: '13:00', task: 'Lunch break' },
        { timeFrom: '13:00', timeTil: '15:00', task: 'Code review' },
        { timeFrom: '15:00', timeTil: '17:00', task: 'Testing' },
      ],
    },
    {
      day: 'Friday',
      tasks: [
        { timeFrom: '8:00', timeTil: '10:00', task: 'Daily meeting 5' },
        { timeFrom: '10:00', timeTil: '12:00', task: 'Code review' },
        { timeFrom: '12:00', timeTil: '13:00', task: 'Lunch break' },
        { timeFrom: '13:00', timeTil: '15:00', task: 'Code review' },
        { timeFrom: '15:00', timeTil: '17:00', task: 'Testing' },
      ],
    },
    {
      day: 'Saturday',
      tasks: [],
    },
    {
      day: 'Sunday',
      tasks: [],
    },
  ],
}))
