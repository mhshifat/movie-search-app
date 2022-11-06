import { cloneElement } from "react";
import styles from "../../styles/Table.module.css";
import Loader from "./Loader";

export type TableHeader = {
  heading: string;
  key: string;
}

interface TableProps<ValuesOfHeaderKeyProperty extends string, TData> {
  headers: TableHeader[];
  data: TData[];
  components: Record<ValuesOfHeaderKeyProperty, (data: TData) => JSX.Element>;
}

export default function Table<ValuesOfHeaderKeyProperty extends string, TData>({ headers = [], data, components }: TableProps<ValuesOfHeaderKeyProperty, TData>) {
  
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header.heading}>{header.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataRow, dataRowIdx) => (
            <tr key={dataRowIdx}>
              {headers.map(header => (
                <td key={header.heading}>
                  {cloneElement(components[header.key as unknown as ValuesOfHeaderKeyProperty](dataRow))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Loader varient='horizontal' text='Loading items...' />
      <div>
        <p>Item's not found...</p>
      </div>
    </div>
  )
}