import React from "react";

export default function Layout({ children }) {
  return (
    <main>
      <div>
        <div>{children}</div>
      </div>
    </main>
  );
}
