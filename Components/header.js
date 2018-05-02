import React from "react";
import { Menu } from "semantic-ui-react";

export default () => {
  return(
    <div>
    <Menu>
      <Menu.Item>
        <h2>EtherTrust</h2>
      </Menu.Item>
      <Menu.Menu position= "right">
        <Menu.Item>
            Campaigns
        </Menu.Item>
        <Menu.Item>
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    </div>
  );
};