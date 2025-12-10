export function toDatetimeLocal(listing) {
  const dateTime = new Date(listing);
  const date = dateTime.toDateString();
  const dateClock = dateTime.toLocaleTimeString();
  const formattedDate = date + " " + dateClock;
  return formattedDate;
}

export function getTimeRemaining(endsAt) {
  if (!endsAt) {
    return "No end date";
  }

  const endDate = new Date(endsAt);
  const now = new Date();
  const timeLeft = endDate - now;

  if (timeLeft <= 0) {
    return "Auction ended";
  }

  const minutes = Math.floor(timeLeft / (1000 * 60));
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return days === 1 ? "1 day left" : days + " days left";
  } else if (hours > 0) {
    return hours === 1 ? "1 hour left" : hours + " hours left";
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute left" : minutes + " minutes left";
  } else {
    return "Less than 1 minute left";
  }
}
