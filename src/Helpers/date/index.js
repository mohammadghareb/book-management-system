const canPublishBook = (date_published) => {
  let currentDate = new Date().getTime();
  let publishDate = new Date(date_published).getTime();

  //we will assume that if both dates are equal or current date is greater than publish date return true
  return currentDate > publishDate || currentDate === publishDate;
};

export default canPublishBook;
