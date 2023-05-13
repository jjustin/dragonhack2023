import { useEffect, useState } from "react";
import { builder, useIsPreviewing } from "@builder.io/react";
import Header from "./components/Header";
import Body from "./components/Body";

// Put your API key here
builder.init("af3b1c3e890f4a34b949e5ae67fc45ee");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function CatchAllRoute() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  // get the page content from Builder
  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: window.location.pathname,
        })
        .promise();

      setContent(content);
      setNotFound(!content);

      // if the page title is found,
      // set the document title
      if (content?.data.title) {
        document.title = content.data.title;
      }
    }
    fetchContent();
  }, [window.location.pathname]);

  // If no page is found, return
  // a 404 page from your code.
  // The following hypothetical
  // <FourOhFour> is placeholder.
  if (notFound && !isPreviewingInBuilder) {
    return <div>404</div>;
  }

  // return the page when found
  return (
    <>
      <Header />
      <Body />
    </>
  );
}
