import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export default class DateAdapter {
  static formatStringToDate(dateString: string): string {
    const format = "DD/MM/YYYY HH:mm:ss";
    const formattedDate = dayjs(dateString, format).tz("America/Sao_Paulo", true);
    if (!formattedDate.isValid()) {
      throw new Error('Invalid date format');
    }
    return formattedDate.toISOString();
  }
}