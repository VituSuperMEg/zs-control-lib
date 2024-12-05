export const day = () => {
  const date = new Date();

  const format = (formatString: string) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return formatString
      .replace(/Y/g, year)
      .replace(/m/g, month)
      .replace(/d/g, day)
      .replace(/H/g, hours)
      .replace(/i/g, minutes)
      .replace(/s/g, seconds);
  };

  return { format };
};

export const clock = (format : string) => {
  const timerId = setInterval(() => {
    day().format(format);
  }, 1000);
  return timerId;
};
