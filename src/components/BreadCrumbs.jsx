import React from "react";
import Link from "next/link";

const BreadCrumbs = ({ breadcrumbs }) => {
  return (
    <div className="container">
      <ul className="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link href={breadcrumb.link || "/"}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && <span> &gt; </span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
