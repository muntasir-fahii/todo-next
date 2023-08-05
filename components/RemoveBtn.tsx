"use client";
import variabls from "../app/varibles.module.scss";

interface RemoveBtnProps {
  icon: React.ElementType;
  onClick: () => void;
  label: string;
}

const RemoveBtn: React.FC<RemoveBtnProps> = ({
  icon: Icon,
  onClick,
  label,
}) => {
  return (
    <button
      className={variabls.delete}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon />
    </button>
  );
};

export default RemoveBtn;
