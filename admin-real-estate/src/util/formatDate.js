export const formatDate = (timestamp) => {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  //   let hour = date.getHours().toString().padStart(2, "0");
  //   let minute = date.getMinutes().toString().padStart(2, "0");
  //   let second = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
