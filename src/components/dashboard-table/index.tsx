import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CountryEmission } from "../../types/CountryEmission";
import "./styles.scss";

const EmissionTable = () => {

    const data: CountryEmission[] = useSelector(
        (state: RootState) => state.countryEmissionData.Countries
    );
    const countries: string[] = useSelector(
        (state: RootState) => state.selectedCountries.CountryOptions
    );
    const yearRange: [number, number] = useSelector(
        (state: RootState) => state.yearRange.YearRange
    );
    const isPerCapita: boolean = useSelector(
      (state: RootState) => state.isPerCapita.isPerCapita
    );

    //Map row data for table, first column is the year, every next column is the value for each country
    const tableData = React.useMemo(() => {
      const years = range(yearRange[0], yearRange[1]);

      return years.map((year) => {
        const row: { [key: string]: string | number } = { year };
        data.forEach((country) => {
          if(countries.some(n=> n === country.name))
          {
            const yearData = isPerCapita ? country.values.find((v) => Number(v.year) === year)?.perCapita : country.values.find((v) => Number(v.year) === year)?.value;
            row[country.name] = yearData ? yearData : 0;
          }
        });
        return row;
      });
    }, [data, countries, yearRange, isPerCapita]);
  
    //Map column headers
    const columns = React.useMemo<ColumnDef<any>[]>(
      () => [
        {
          accessorKey: "year",
          header: "Year", // First column is Year
        },
        ...countries.map((country) => ({
          accessorKey: country,
          header: country, // Country name as column header
        })),
      ],
      [data, countries]
    );
  
    const table = useReactTable({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
      pagination: {
        pageIndex: 0, 
        pageSize: 10, 
      },
    },
    });
  
    return (
      <div className="table-container">
        <table className="table-container__table">
          <thead className="table-container__table__head">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="table-container__table__head__column">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="table-container__table__head__column__header">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-container__table__body">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="table-container__table__body__row">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="table-container__table__body__row__column">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="pagination__button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span className="pagination__pages_label">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            className="pagination__button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  function range(start:number, end:number) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }
  
  export default EmissionTable;