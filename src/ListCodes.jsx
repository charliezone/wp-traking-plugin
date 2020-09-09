function ListCodes(props) {
    function handleCopy(e) {
        e.preventDefault();

        const inputTemp = document.createElement("input");
        inputTemp.value = e.target.getAttribute('code');
        document.body.appendChild(inputTemp);
        inputTemp.select();

        document.execCommand("copy");
        document.body.removeChild(inputTemp);
    }

    const template = (
        <table className="table">
            <thead>
                <tr>
                    <th>Estado</th>
                    <th>Código</th>
                    <th>Documento</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(props.codes).map(v => {
                        if (v === 'length') return;
                        return (
                            <tr className="traking-code" key={props.codes[v].hbl}>
                                <td>{props.codes[v].status}</td>
                                <td>
                                    <strong>{props.codes[v].hbl}</strong><br />
                                    <a href="#" className="copyMovil" onClick={handleCopy} code={props.codes[v].hbl}>copiar</a>
                                </td>
                                <td>{props.codes[v].mailguide.trim().match(/^[\d]{3}-/) || props.codes[v].mailguide.trim().startsWith('BL-') ? props.codes[v].mailguide : '-'}</td>
                                <td><a href="#" onClick={handleCopy} code={props.codes[v].hbl}>copiar</a></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );

    return (
        <div className="traking-codes-list">
            <h2>Códigos de seguimiento</h2>
            {props.codes.length !== 0 && template}
            {!props.codes.length && <span>No se encontraron códigos para la información proporcionada.</span>}
            <button onClick={() => props.goBack('TrakingForm')}>Atras</button>
        </div>
    )
}

export default ListCodes;