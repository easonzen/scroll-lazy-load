import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollLazyLoad from "./components/ScrollLazyLoad";

class Root extends Component {
    render() {
        return (
            <ScrollLazyLoad />
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
);