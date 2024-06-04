import { format } from "date-fns"
import { DEFAULT_DATE_FORMAT } from "../const/common"

export const formatDateForInput = (date: Date) => {
	return format(date, DEFAULT_DATE_FORMAT)
}

export const getTodayDate = () => {
	return formatDateForInput(new Date())
}
