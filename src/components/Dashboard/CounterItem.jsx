import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const CounterItem = ({
  bgColor,
  textColor,
  iconColor,
  borderColor,
  title,
  total,
  icon,
}) => {
  return (
    <div className={`counter-item  ${bgColor} ${borderColor}`}>
      <div className="counter-info">
        <h1 className={`font-[500] text-2xl  ${textColor}`}>Total {title}</h1>
        <h1 className={`font-[600] text-2xl ${textColor}`}>{total}</h1>
      </div>
      <div className="counter-info-icon">
        <FontAwesomeIcon icon={icon} className={`text-4xl ${iconColor}`} />
      </div>
    </div>
  );
};
