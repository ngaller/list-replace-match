import moment from 'moment';

function dateFromDate(date) {
  if(!date) {
    return moment();
  }

  if(typeof date === 'string') {
    let dateObj = new Date(date);
    if(dateObj.toString() === 'Invalid Date') {
      console.log('Invalid Date:', date);
      throw date;
    }
    return moment(dateObj);
  }

  if(typeof date === 'object') {
    if(moment.isMoment(date)) {
      return date;
    } else {
      return moment(date);
    }
  }

  throw new Error('Do not know how to handle this type:', typeof date);
}

function dayFromString(dayOfWeek) {
  if (typeof dayOfWeek === 'string'){
    const dow = dayOfWeek.toLowerCase().slice(0, 3);
    const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayNumber = weekDays.indexOf(dow);
    if (dayNumber === -1) {
      throw new Error('Do not recognize this day: ', dayOfWeek);
    }
    return dayNumber;
  }
  return dayOfWeek;
}

// nth - value from 1 through 5 for the (say) 4th Friday
//   Negative numbers count backwards from the end of the month
//   (For example, the last Friday, or the second to last Sunday)
// dayOfWeek - 0 through 6 (Sun through Sat) or can be string (e.g. 'monday')
// relevantDate - a date as a string or Date object or moment object
// Returns a moment date
export function nthDay(nth, dayOfWeek, relevantDate, afterDay) {
  relevantDate = dateFromDate(relevantDate);
  const month = relevantDate.month();
  const year = relevantDate.year();
  afterDay = afterDay || 0;

  if (nth < 0) {
    // nth-last day of the month
    const fourthDay = nthDay(4, dayOfWeek, relevantDate);
    let occurrences;

    if (fourthDay.add(1, 'week').month() > month) {
      // It's a month with four of this day of the week
      occurrences = 4;
    } else {
      // It's a month with five of this day of the week
      occurrences = 5;
    }
    return nthDay(occurrences + 1 + nth, dayOfWeek, relevantDate, afterDay);
  }

  var dow = dayFromString(dayOfWeek);

  let counter = nth - 1;
  let day = counter * 7 + 1 + afterDay;

  const date = moment([year, month, day]);
  date.subtract(1, 'day');
  while(counter !== nth) {
    date.add(1, 'day');
    if(date.day() === dow) {
      counter++;
    }
  }
  return date;
}
