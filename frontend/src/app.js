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
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("X-WP-Nonce", site_info.traking_nonce);

        const raw = JSON.stringify({
            "ci": ci
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw
        };

        fetch(`${site_info.site_url}/wp-json/traking/v1/get-codes`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const data = JSON.parse(result);
                setLoading(false);
                setCodes(data.data);
                setRoute('ListCodes');
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="traking-app">
            <div className={(loading) ? 'loading' : 'hide'}><span>Cargando ...</span></div>
            <div className={(!loading) ? 'wraper' : 'hide'}>
                {(route === 'TrakingForm') ? <TrakingForm getCodes={getCodes} /> : <ListCodes goBack={setRoute} codes={codes} />}
            </div>
        </div>
    )
}

const domContainer = document.querySelector('#traking-app');
ReactDOM.render(<App />, domContainer);