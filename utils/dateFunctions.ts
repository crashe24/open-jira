
import { formatDistanceToNow } from "date-fns";
import { es, enUS } from "date-fns/locale";

export const getFormatDistanceToNow2 = (date:number) => {
    const fromNow = formatDistanceToNow(date, {locale: es})

    return fromNow
}

export const getFormatDistanceToNow = (date:number) => {
    const fromNow = formatDistanceToNow(date, {locale: enUS})

    return fromNow
}