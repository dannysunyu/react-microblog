import { useEffect } from "react";

export default function Welcome(props) {
  useEffect(() => {
    console.log(`Hello, ${props.name}`);
  }, [props.name]);
  return null;
}