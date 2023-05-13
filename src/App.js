import { useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { authStep2 } from "./twitter/twitter";

export default function CatchAllRoute() {
  useEffect(() => {
    if (window.location.pathname === "/oauth/callback") {
      authStep2();
    }
  }, [window.location.pathname]);

  // return the page when found
  return (
    <>
      <Header />
      <Body />
    </>
  );
}
