'use strict';

function App() {
    return React.createElement(
        'div',
        { className: 'traking-app' },
        React.createElement(
            'h1',
            null,
            'Hello React'
        )
    );
}

var domContainer = document.querySelector('#traking-app');
ReactDOM.render(React.createElement(App, null), domContainer);