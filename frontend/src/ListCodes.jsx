function ListCodes(props) {
    function handleCopy(e) {
        e.preventDefault();

        const input_temp = document.createElement("input");
        input_temp.value = e.target.getAttribute('code');
        document.body.appendChild(input_temp);
        input_temp.select();

        document.execCommand("copy");
        document.body.removeChild(input_temp);
    }

    function formatDate(d) {
        const date = new Date(d);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    return (
        <div className="traking-codes-list">
            <h2>Códigos de seguimiento</h2>
            {
                props.codes && props.codes.map(v => {
                    return (
                        <div className="traking-code" key={v.cp}>
                            <small>{formatDate(v.create_at)}</small><strong>{v.cp}</strong> <a href="#" onClick={handleCopy} code={v.cp}>copiar</a>
                        </div>
                    )
                })
            }
            {!props.codes && <span>No se encontraron códigos para la información proporcionada.</span>}
            <button onClick={() => props.goBack('TrakingForm')}>Atras</button>
        </div>
    )
}

export default ListCodes;