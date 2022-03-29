import moment from "moment";

export function getDurationHourFromNow(isoDatetime) {
  const endTime = moment(isoDatetime);
  const duration = moment.duration(endTime.diff(moment()));
  return duration.asHours();
}

export function getDateFormatted(date, format = "YYYY-MM-DD") {
  return moment(date).format(format);
}

export function getYearFormatted(year, format = "YYYY") {
  if (typeof year === "number")
    year = year.toString();
  return parseInt(moment(year).format(format));
}
