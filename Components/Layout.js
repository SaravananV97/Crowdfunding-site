import React from "react";
import Factory from  "../pages/index";
import Menu from "./header";
const Layout = (props) => {
    return(
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
    <Menu/>
    {props.children}
    <h2>This is a Footer</h2>
    </div>
)};

export default Layout;
