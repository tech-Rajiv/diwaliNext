import React from "react";
import SingleBlogBox from "../components/SingleBlogBox";

function page() {
  const allBlogs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <h2>Blog page</h2>
      <div className="grid grid-cols-3 gap-x-10 gap-y-5 mt-5">
        {allBlogs.map((blog) => (
          <SingleBlogBox blog={blog} key={blog} />
        ))}
      </div>
    </div>
  );
}

export default page;
