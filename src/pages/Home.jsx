import React, {useEffect} from "react";
import { useAnalytic } from "../hooks";
import { About, Banner, Best, Blog, Lookbook, New, Policy, Shortcut } from "../views/home";
function Home() {
  useAnalytic()
  useEffect(() => {
    document.title = "SSSTUTTER - TRANG CHỦ"
  }, [])

  return (
    <div>
      <Banner />
      <Shortcut />
      <New />
      <About />
      <Best />
      <Policy />
      <Lookbook/>
      <Blog/>
    </div>
  );
}
export default Home;
