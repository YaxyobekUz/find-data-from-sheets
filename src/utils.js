export const extractNumbers = (text) => {
  return text ? text.replace(/\D/g, "") : null;
};
