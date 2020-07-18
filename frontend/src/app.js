'use strict';
const { useState } = React;

function TrakingForm(props){

    function handleSubmit(e){
        e.preventDefault();
        const ci = document.querySelector('input[name="ci"]');
        if(ci.value.length > 0){
            props.getCodes(ci.value);
        }else{
            const err = document.querySelector('.error-msg');
            err.textContent = 'Este campo no puede estar vacio';
            err.classList.remove('hide');
        }
        
    }

    return(
        <div className="traking-form-wrap">
            <h2>Obtenga los códigos de los paquetes para su posterior seguimiento</h2>
            <form className="traking-form" onSubmit={handleSubmit}>
                <input type="text" name="ci" placeholder="Ingrese número de identificación del que recibe (CI)" />
                <span className="error-msg hide"></span>
                <button type="submit">Obtener códigos</button>
            </form>
        </div>
    )
}

function ListCodes(props){
    function handleCopy(e){
        e.preventDefault();

        const input_temp = document.createElement("input");
        input_temp.value = e.target.getAttribute('code');
        document.body.appendChild(input_temp);
        input_temp.select();

        document.execCommand("copy");
        document.body.removeChild(input_temp);
    }

    return(
        <div className="traking-codes-list">
            <h2>Códigos de seguimiento</h2>
            {
                props.codes && props.codes.map(v => {
                    return (
                        <div className="traking-code" key={v.cp}>
                            {v.cp} <a href="#" onClick={handleCopy} code={v.cp}>copiar</a>
                        </div>
                    )
                })
            }
            {!props.codes && <span>No se encontraron códigos para la información proporcionada.</span>}
            <button onClick={() => props.goBack('TrakingForm')}>Atras</button>
        </div>
    )
}

function App(){
    const [codes, setCodes] = useState([]);
    const [route, setRoute] = useState('TrakingForm');
    const [loading, setLoading] = useState(false);

    function getCodes(ci){
        setLoading(true);
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({"ci": ci});

        var requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
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

    return(
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