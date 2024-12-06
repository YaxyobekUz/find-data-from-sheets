export const extractNumbers = (text) => {
  return text ? text.replace(/\D/g, "") : null;
};

export const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const formatTime = (input) => {
  const date = new Date(input);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};
