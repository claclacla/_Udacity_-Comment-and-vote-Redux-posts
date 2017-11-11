let getTimeDataString = function (timeData) {
  let timeDataString = timeData.toString();

  if (timeDataString.length === 1) {
    timeDataString = "0" + timeDataString;
  }
  return timeDataString;
};

export function parseTimestamp(timestamp) {
  let date = new Date(timestamp);

  let dateString = getTimeDataString(date.getHours());
  dateString += ":" + getTimeDataString(date.getMinutes());
  dateString += " " + getTimeDataString(date.getDate());
  dateString += "/" + getTimeDataString(date.getMonth());
  dateString += "/" + date.getFullYear();

  return dateString;
}