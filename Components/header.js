import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
export default () => {
  return(
    <div>
    <Menu>
      <Menu.Item>
      <Link route = "/">
          <a><h2 style = {{padding:"2px"}}>EtherTrust</h2></a>
      </Link>
      </Menu.Item>
      <Menu.Menu position= "right">
        <Menu.Item>
          <Link route = "/">
              <a><h3 style = {{padding:"2px"}}>Projects</h3></a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link route = "/projects/new">
              <a><h3 style = {{padding:"2px"}}>+</h3></a>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    </div>
  );
};
