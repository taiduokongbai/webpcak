
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter.jsx';
import "antd/dist/antd.css";
import "./index.scss";
console.log('I am index.js');
render(<Greeter />, document.getElementById('root'))