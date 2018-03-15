// Greeter.js
/*var text = require('./data.json')
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = text.greeterText;
  return greet;
};
*/
import React, {Component} from 'react';
import text from "./data.json";
import styles from "./Greeter.css";
class Greeter extends Component{
    render(){
        return (
            <div className={styles.root}>{text.greeterText}</div>
        )
    }
}

export default Greeter