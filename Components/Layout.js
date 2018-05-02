import React from "react";
import Factory from  "../pages/index";
import Menu from "./header";
const Layout = (props) => {
    return(
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
    <Menu/>
    {props.children}
    </div>
)};

export default Layout;
