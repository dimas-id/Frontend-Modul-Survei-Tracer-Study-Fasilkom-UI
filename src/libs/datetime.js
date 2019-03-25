import moment from 'moment';

export function getDurationHourFromNow(isoDatetime) {
  const endTime = moment(isoDatetime);
  const duration = moment.duration(endTime.diff(moment()));
  return duration.asHours();
}
