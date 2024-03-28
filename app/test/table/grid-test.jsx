'use client'

import { useEffect, useState } from 'react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'

import tasksData from './tasks.json'

const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue
    if (dateAsString == null) return -1
    var dateParts = dateAsString.split('-')
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    )
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1
    }
  },
  browserDatePicker: true,
}

export function GridTest() {
  const [gridApi, setGridApi] = useState()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const rowData = tasksData

  const columns = [
    {
      headerName: 'Mitarbeiter',
      field: 'data.employees[0].employee.firstName',
    },
    { headerName: 'Montag', field: 'title' },
    { headerName: 'Dienstag', field: 'tuesday' },
    { headerName: 'Mittwowch', field: 'wednesday' },
    { headerName: 'Donnerstag', field: 'thursday' },
    { headerName: 'Freitag', field: 'friday' },
    {
      headerName: 'Datum',
      field: 'dateFrom',
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams,
    },
  ]
  const defColumnDefs = { flex: 1 }

  const onGridReady = (params) => {
    setGridApi(params)
  }
  const getFilterType = () => {
    if (startDate !== '' && endDate !== '') return 'inRange'
    else if (startDate !== '') return 'greaterThan'
    else if (endDate !== '') return 'lessThan'
  }
  useEffect(() => {
    if (gridApi) {
      if (startDate !== '' && endDate !== '' && startDate > endDate) {
        alert('Start Date should be before End Date')
        setEndDate('')
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance('dateFrom')
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        })
        gridApi.api.onFilterChanged()
      }
    }
  }, [startDate, endDate])

  return (
    <div className='App'>
      <h2 align='center'>Ag Grid with React</h2>
      <p align='center'>Date Range Filtering </p>
      <div className='ag-theme-alpine' style={{ height: 400 }}>
        From :{' '}
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        To :{' '}
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  )
}
