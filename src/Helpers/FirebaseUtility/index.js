import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Configuration/Firebase";

const getAuthorRelatedBooks = async () => {
  const blogRef = collection(db, "blogs");
  const trendQuery = query(blogRef, where("trending", "==", "yes"));
  const querySnapshot = await getDocs(trendQuery);
  let trendBlogs = [];
  querySnapshot.forEach((doc) => {
    trendBlogs.push({ id: doc.id, ...doc.data() });
  });
  setTrendBlogs(trendBlogs);
};

const getAllPublishedBooks = async () => {
  const booksRef = collection(db, "books");
  const publishedBooksQuery = query(
    booksRef,
    where("status_published", "==", "true")
  );
  const querySnapshot = await getDocs(publishedBooksQuery);
  let publishedBooks = [];
  querySnapshot.forEach((doc) => {
    publishedBooks.push({ id: doc.id, ...doc.data() });
  });
  setPublishedBooks(publishedBooks);
};
export { getAllPublishedBooks, getAuthorRelatedBooks };
