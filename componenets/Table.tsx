import React from "react";
import { useTable, Cell } from "react-table";
import s from "./Table.module.css";

export const Table = ({ columns, items }: any) => {
  const {
    getTableProps,
    getTableBodyProps,
    page,
    prepareRow,
    headerGroups,
  }: any = useTable({
    columns,
    data: items,
  });
  return (
    <>
      <div>Table</div>;
      {!page.length ? (
        <div>No data</div>
      ) : (
        <div>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <table className={s.table} {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        <th
                          className={s.th}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          {column.isSorted ? (
                            <span className={s.isSorted}>
                              &nbsp;&nbsp;&nbsp;
                            </span>
                          ) : column.canSort ? (
                            <span className={s.isSortable}>
                              &nbsp;&nbsp;&nbsp;
                            </span>
                          ) : null}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                  {page.map((row: any) => {
                    prepareRow(row);
                    return (
                      <React.Fragment key={row.id}>
                        <tr className={s.tr} {...row.getRowProps()}>
                          {row.cells.map((cell: Cell) => (
                            <td className={s.td} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                        {row.isExpanded && (
                          <tr>
                            <td
                              colSpan={row.cells.length}
                              className={s.expander}
                            >
                              Detailed COnponent to be build
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </div>
      )}
    </>
  );
};