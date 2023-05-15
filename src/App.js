import { useEffect, useState } from "react";
import Header from "./components/Header";
import Protester from "./components/Protester";
import { authStep2 } from "./twitter/twitter";
import { BuilderComponent, builder } from "@builder.io/react";

// Put your API key here
builder.init("af3b1c3e890f4a34b949e5ae67fc45ee");

export default function CatchAllRoute() {
  const [isPreviewing, setStateIsPreviewing] = useState(false);
  const [isProtesting, setStateIsProtesting] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/oauth/callback") {
      authStep2();
    }

    async function fetchContent() {
      if (window.location.pathname === "/") {
        const content = await builder
          .get("page", {
            url: window.location.pathname,
          })
          .promise();

        setContent(content);
        setStateIsPreviewing(true);
        setStateIsProtesting(false);
      } else {
        setStateIsPreviewing(false);
        setStateIsProtesting(true);
      }
    }
    fetchContent();
  }, []);

  // return the page when found
  return (
    <>
      <>
        <Header />
        {isPreviewing && <BuilderComponent model="page" content={content} />}
        {isProtesting && <Protester />}
      </>
    </>
  );
}
