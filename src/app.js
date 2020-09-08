'use strict';
import TrakingForm from './TrakingForm';
import ListCodes from './ListCodes';

const { useState } = React;

function App() {
    const [codes, setCodes] = useState([]);
    const [route, setRoute] = useState('TrakingForm');
    const [loading, setLoading] = useState(false);

    function getCodes(ci) {
        setLoading(true);

        fetch(`https://www.solvebigtech.com/bordoy/service/index.php?funcname=status&enterprise=bordoy&identity=${ci}&apikey=bcURfJhHPCNBT4i7ANhVKQDw62e32W`)
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                setCodes(result[ci]);
                setRoute('ListCodes');
            })
            .catch(error => {
                setLoading(false);
                setRoute('Error');
            });
    }

    return (
        <div className="traking-app">
            <div className={(loading) ? 'loading' : 'hide'}><span>Cargando ...</span></div>
            <div className={(!loading) ? 'wraper' : 'hide'}>
                {(route === 'TrakingForm') ? <TrakingForm getCodes={getCodes} /> : (route !== 'Error') ? <ListCodes goBack={setRoute} codes={codes} /> : <span className="error-msg">Error de conexión</span>}
            </div>
        </div>
    )
}

const domContainer = document.querySelector('#traking-app');
ReactDOM.render(<App />, domContainer);