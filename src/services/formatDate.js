/**
 * Returns a date string in the format YYYY-MM-DD based on the passed date object.
 * @param {Date} date - A date object to convert.
 * @returns {string} The ISO date string.
 */
export const toLocaleISOString = date => {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = "" + date.getFullYear();

    if (month.length < 2) {
        month = "0" + month;
    }

    if (day.length < 2) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
};

/**
 * Returns a date string in the format Weekday, DD.MM based on the passed date object.
 * @param {Date} date - A date object to convert.
 * @returns {string} The formated date string.
 */
export const toLocaleWeekdayDayMonthString = date => date.toLocaleDateString(undefined, { weekday: "long", day: "2-digit", month: "2-digit" });

/**
 * Returns a new date object set to monday of the same week as the passed date.
 * @param {Date} date - A date object.
 * @returns {Date} A new date object for monday.
 */
export const toWeekStart = date => {
    let dayOfWeek = date.getDay() - 1;

    if(dayOfWeek < 0) {
        dayOfWeek = 6;
    }

    let monday = new Date(date);
    monday.setDate(date.getDate() - dayOfWeek);
    monday.setHours(0,0,0,0);
    
    return monday;    
};

/**
 * Returns a new date object set to sunday of the same week as the passed date.
 * @param {Date} date - A date object.
 * @returns {Date} A new date object for sunday.
 */
export const toWeekEnd = date => {
    let dayOfWeek = date.getDay() - 1;

    if(dayOfWeek < 0) {
        dayOfWeek = 6;
    }

    let sunday = new Date(date);
    sunday.setDate(date.getDate() - dayOfWeek + 6);
    sunday.setHours(0,0,0,0);
    
    return sunday;    
};

/**
 * Returns the calendar week based on the passed date.
 * @param {Date} date - A date object.
 * @returns {string} The calendar week.
 */
export const toWeekOfYear = date => {
    let yearStart = new Date(date.getFullYear().toString());
    let dayOfWeek = yearStart.getDay() - 1;

    if(dayOfWeek < 0) {
        dayOfWeek = 6;
    }

    let dif = (date.getTime() - yearStart.getTime()) + (dayOfWeek * 86400000);
    return Math.floor(dif/604800000);
};

/**
 * An array containing the full names of all the months as string.
 */
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
                    "August", "September", "Oktober", "November", "Dezember"];

/**
 * Returns the full name of the month based on the passed date.
 * @param {Date} date - A date object.
 * @returns {string} The full month name.
 */
export const toFullMonthName = date => {
    return months[date.getMonth()];
};

/**
 * Returns a new date object set to the first day of the same month as the passed date.
 * @param {Date} date - A date object.
 * @returns {Date} A new date object for the first day of the month.
 */
export const toMonthStart = date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);    
};

/**
 * Returns a new date object set to the last day of the same month as the passed date.
 * @param {Date} date - A date object.
 * @returns {Date} A new date object for the last day of the month.
 */
export const toMonthEnd = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);       
};