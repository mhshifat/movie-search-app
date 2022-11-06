import { useState } from "react";
import styles from "../../styles/Tab.module.css";

export interface TabProps {
  items: { label: string; component: JSX.Element }[];
}

export default function Tab({ items }: TabProps) {
  const [defaultTabIndex, setDefaultTabIndex] = useState(0);

  return (
    <>
      <ul className={styles.tabs}>
        {items.map(({ label }, idx) => (
          <li key={label} className={defaultTabIndex === idx ? styles.activeTab : ""} onClick={() => setDefaultTabIndex(idx)}>{label}</li>
        ))}
      </ul>
      <div className={styles.tabContent}>
        {items.find((_,tabIdx) => tabIdx === defaultTabIndex)?.component}
      </div>
    </>
  )
}