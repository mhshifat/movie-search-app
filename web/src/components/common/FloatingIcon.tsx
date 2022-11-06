import styles from "../../styles/FloatingIcon.module.css";
import { HiOutlineChevronUp } from "react-icons/hi";

export interface FloatingIconProps {
  onClick?: () => void;
}

export default function FloatingIcon({ onClick }: FloatingIconProps) {
  return (
    <div className={styles.floatingIcon} onClick={onClick}>
      <HiOutlineChevronUp />
    </div>
  )
}