
export const randomID = () => {
  return Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
}
