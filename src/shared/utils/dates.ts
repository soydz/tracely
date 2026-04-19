import { CalendarDate } from "@internationalized/date";

export function formatCalendarDateToUTCISO(date: CalendarDate): string {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${date.year}-${pad(date.month)}-${pad(date.day)}T${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
}


export function isValidFormat(date: string | undefined): boolean {
    if (!date) return false;
    return /^\d{4}-\d{2}-\d{2}/.test(date);
}