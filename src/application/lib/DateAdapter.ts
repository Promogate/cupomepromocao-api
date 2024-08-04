import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default class DateAdapter {
  static formatStringToDate(dateString: string): string {
    const formattedDate = dayjs.tz(dateString, "DD/MM/YYY HH:mm:ss", "America/Sao_Paulo");
    return formattedDate.toISOString();
  }
}