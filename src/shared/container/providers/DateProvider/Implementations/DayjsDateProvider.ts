import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    const formattedDate = dayjs(date).utc().local().format();

    return formattedDate;
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const compareDate = dayjs(end_date_utc).diff(start_date_utc, "hours");

    return compareDate;
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const compareDate = dayjs(end_date_utc).diff(start_date_utc, "days");

    return compareDate;
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  compareIfExpired(start_date: Date, end_date: Date): boolean {
    return dayjs(end_date).isAfter(start_date);
  }
}

export { DayjsDateProvider };
