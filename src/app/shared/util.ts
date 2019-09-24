export function normalizeDate(data: Date, offset = 3) {
  // Default offset from UTC+3
  const miliseconds = data.getTime() + (data.getTimezoneOffset() * 60000);
  return new Date(miliseconds + (3600000 * offset));
}
