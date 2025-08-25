import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  className?: string;
};

const DateFormatter = ({ dateString, className = "" }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className={`text-muted-foreground text-sm ${className}`}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
};

export default DateFormatter;
