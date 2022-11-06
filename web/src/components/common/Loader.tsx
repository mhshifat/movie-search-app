import { PropsWithChildren } from "react";
import styles from "../../styles/Loader.module.css";

export interface LoaderProps extends PropsWithChildren {
  varient: "horizontal",
  text?: string;
}

export default function Loader({ varient = "horizontal", text }: LoaderProps) {
  if (varient === "horizontal") return (
    <div>
      <div className={styles.pregressBar} />
      {text && <div className={styles.pregressBar__text}>{text}</div>}
    </div>
  );
  return null;
}