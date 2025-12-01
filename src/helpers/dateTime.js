export function toDatetimeLocal(listing) {
  const dateTime = new Date(listing.endsAt);
  const date = dateTime.toDateString();
  const dateClock = dateTime.toLocaleTimeString();
  const formattedDate = date + " " + dateClock;
  return formattedDate;
}
