## things to handle

- todos
- mobile version
- zod
- unused imports, empty Classnames
- refactor imports to not use relative paths
- html best practices (handling tags and attributes e.g. dont use div all the time)
- look over the file/folder structure & potentially refactor
- add favicon
- umlaute reinpacken
- standardize all const and function components; also ui components -> no default export; also normal components -> default export

## einsatzplan

### weekview

- reusable tasks (e.g. "Urlaub", "Berufsschule", "Hotline")
- tasks should be cards with the following attributes:
  - title
  - start date (should be extandable with maybe a time picker or a time range picker)
  - end date (should be extandable with maybe a time picker or a time range picker)
  - user (from dropdown menu)
  - redmine ticket url
  - description
  - ? singlePerson or multiplePerson icon in the top right corner which indicates if the task is for one person or for multiple persons; it also shows which persons are involved on hover (or click). persons can also be quickly added or removed
  - ? type (e.g. "Urlaub", "Berufsschule", "Hotline")
  - ? color
- tasks should be draggable (with prefined ones); maybe with a "copy" button; i currently dont know where to put & how handle this
- saturday and sunday should collapsable

- the cards are all horizontal placed and the user can scroll horizontally to see all cards/tasks.
- maybe make the above optional to a vertical solution
- the default shown task/card should be in sync with the current time. also use an animation for this.

## calendar

### behaviour

should the calendar be closed when a date is selected?

### button states

- daily: "20 Januar 2024"
- weekly: "KW 05 2024" OR "20 Jan 24 - 27 Jan 24" OR "20.01.24 - 27.01.24"
- monthly: "01.01.24 - 31.01.24"

### version states

- daily: only highlight current day and selected day
- weekly: current week is highlighted
- monthly: current day is highlighted

### homepage

- maybe the startpage shouldnt be the einsatzplan but an overview of
  (only my) - todos - appointments - holidays - messages/notifications
