//Blogging App using Hooks
import React, { useState, useRef, useEffect } from "react";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebaseInit";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef();

  // To focus on the title input field on component mount
  useEffect(() => {
    titleRef.current.focus();
  }, []); // Empty dependency array means this effect will only run once, on component mount.

  // To fetch the blogs from the database
  async function fetchBlogs() {
    const snapshot = await getDocs(collection(db, "Blogs"));
    const blogs = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setBlogs(blogs);
  }
  // To fetch the blogs from the database in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Blogs"), (snapshot) => {
      const blogs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setBlogs(blogs);
    });
    // fetchBlogs();
  }, []);

  // updating the Title of page with the last blog's title
  useEffect(() => {
    if (blogs.length > 0 && blogs[0].title !== "") {
      document.title = blogs[0].title;
    } else {
      document.title = "Blogs is Fun";
    }
  }, [blogs]);
  //Passing the synthetic event as argument to stop refreshing the page on submit
  async function handleSubmit(e) {
    e.preventDefault();
    setBlogs([{ title, content }, ...blogs]);
    setTitle("");
    setContent("");

    // Add a new document with a generated id.
    await addDoc(collection(db, "Blogs"), {
      title: title,
      content: content,
      createdAt: new Date(),
    });
    // console.log("Document written with ID: ", docRef.id);

    titleRef.current.focus();
  }
  function deleteBlog(i) {
    setBlogs(blogs.filter((blog, index) => index !== i));

    titleRef.current.focus();
  }

  function editBlog(i) {
    const newBlogs = [...blogs];
    newBlogs[i].title = prompt("Enter new title", newBlogs[i].title);
    newBlogs[i].content = prompt("Enter new content", newBlogs[i].content);
    setBlogs(newBlogs);
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              ref={titleRef}
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog goes here.."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-btn">
            <button className="btn" onClick={() => editBlog(i)}>
              EDIT
            </button>
            <button className="btn remove" onClick={() => deleteBlog(i)}>
              DELETE
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
