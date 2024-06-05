import {
	differenceInCalendarDays,
	format,
	isToday,
	isTomorrow,
	isYesterday,
	parse,
} from "date-fns"
import { DEFAULT_DATE_FORMAT } from "../const/common"

export const formatDateForInput = (date: Date) => {
	return format(date, DEFAULT_DATE_FORMAT)
}

export const getTodayDate = () => {
	return formatDateForInput(new Date())
}

export const formatDateForTaskList = (date: string) => {
	const parseDate = parse(date, DEFAULT_DATE_FORMAT, new Date())
	if (isToday(parseDate)) {
		return "Today"
	} else if (isYesterday(parseDate)) {
		return "Yesterday"
	} else if (isTomorrow(parseDate)) {
		return "Tomorrow"
	} else {
		return format(parseDate, "do LLL yyyy")
	}
}

export const hasDueDatePassed = (date: string) => {
	const convertDate = parse(date, DEFAULT_DATE_FORMAT, new Date())
	return differenceInCalendarDays(convertDate, new Date())
}
