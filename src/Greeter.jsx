import React, { Component } from 'react';
import text from "./data.json";
import styles from "./Greeter.css";
import { Menu, Dropdown, Icon } from 'antd';

class Greeter extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)">3rd menu item</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={styles.root}>
                <div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            click me <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

/* let getPopupContainer=(triggerNode) => {
    let temp,
        content = document.getElementById("ew-content"),
        dialog = document.getElementsByClassName("ant-modal-wrap"),
        sidebar = document.getElementsByClassName("ew-sidebar");

    if(dialog.length>0){
        temp = dialog[dialog.length-1];
    }else if(sidebar.length>0){
        temp = sidebar[sidebar.length-1];
    }else temp = content;
    return temp;
} */

// Dropdown.defaultProps.getPopupContainer = getPopupContainer;

export default Greeter