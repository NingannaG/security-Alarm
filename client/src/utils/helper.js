export const getLastUpdatedTime = (timeStamp) => {
  const dateObj = new Date(timeStamp);

  const hours =
    dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = dateObj.getHours() >= 12 ? "PM" : "AM";
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  const formattedDate = `${hours}:${minutes}:${seconds} ${ampm}`;
  return formattedDate;
};

export const handleEventData = (data, setData) => {
  if (data.length) {
    const updatedData = data.map((d) => {
      return { ...d, time: getLastUpdatedTime(d.time) };
    });
    setData([...updatedData]);
  }
};
