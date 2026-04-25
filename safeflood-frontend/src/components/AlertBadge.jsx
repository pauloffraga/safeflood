import React from "react";

export default function AlertBadge({ status, text }) {
  return (
    <span className={`badge ${status}`}>
      {text}
    </span>
  );
}