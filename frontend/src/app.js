'use strict';

function App(){
    return(
        <div className="traking-app">
            <h1>Hello React</h1>
        </div>
    );
}

const domContainer = document.querySelector('#traking-app');
ReactDOM.render(<App />, domContainer);