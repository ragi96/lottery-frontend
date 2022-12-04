import React from "react";

// the interface needs to explicitly declare which strings are safe to pass
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  text: string;
}

export default function Heading(props: HeadingProps) {
  const Heading = props.headingLevel;
  return <Heading>{props.text}</Heading>;
}
