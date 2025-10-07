import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-5">
      <h2>Admin</h2>
      <div className="addCategory">
        <h3>Add new category</h3>
      </div>
      <div className="addCategory">
        <h3>Add new products</h3>
      </div>
    </div>
  );
}

export default page;
