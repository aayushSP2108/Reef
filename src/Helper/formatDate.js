export function formatDate(date) {
  // Ensure the input is a valid Date object
  if (!(date instanceof Date)) {
      date = new Date(date); // Convert string to Date if necessary
  }

  if (isNaN(date)) {
      throw new Error("Invalid date passed to formatDate");
  }

  // Define options for formatting the date
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  
  // Get the day of the month and determine the appropriate suffix
  const day = date.getDate();
  let daySuffix;
  
  if (day >= 11 && day <= 13) {
      daySuffix = 'th';
  } else {
      switch (day % 10) {
          case 1: daySuffix = 'st'; break;
          case 2: daySuffix = 'nd'; break;
          case 3: daySuffix = 'rd'; break;
          default: daySuffix = 'th';
      }
  }

  // Create the formatted date string using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
  // Replace the numeric day with the day + suffix
  const dayWithSuffix = day + daySuffix;
  
  // We need to replace the day in the formatted date with the day + suffix
  return formattedDate.replace(/\d+/, dayWithSuffix);
}
