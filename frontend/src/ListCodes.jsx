const { useEffect } = React;

function ListCodes(props) {
    useEffect(() => {
        new Accordion('.accordion-container');
    });

    function handleCopy(e) {
        e.preventDefault();

        const input_temp = document.createElement("input");
        input_temp.value = e.target.getAttribute('code');
        document.body.appendChild(input_temp);
        input_temp.select();

        document.execCommand("copy");
        document.body.removeChild(input_temp);
    }

    return (
        <div className="traking-codes-list">
            <h2>Códigos de seguimiento</h2>
            <div className="accordion-container">
                <div className="ac">
                    <h2 className="ac-header">
                    <button className="ac-trigger">Consejos a tener en cuenta</button>
                    </h2>
                    <div className="ac-panel">
                        <ul>
                            <li className="tip ac-text">Los códigos aparecen ordenados por fecha, los más recientes arriba.</li>
                            <li className="tip ac-text">El enlace "revisar" lleva a la web de revisión del proveedor de servicios en el país de entrega.</li>
                            <li className="tip ac-text">Se recomienda que pulse en el botón copiar primeramente, para que pueda pegar el código en la página que se abrirá.</li>
                            <li className="tip ac-text">Tenga en cuenta que a veces la pagina externa del proveedor falla, recuerde que ese es un servicio ajeno al nuestro por lo que deberá esperar a que este disponible.</li>
                        </ul>
                    </div>
                </div>
            </div>    
            {
                props.codes && props.codes.map(v => {
                    return (
                        <div className="traking-code" key={v.cp}>
                            <strong>{v.cp}</strong>
                            <div className="actions-btn">
                                <button href="#" onClick={handleCopy} code={v.cp}>copiar</button>
                                <a className="review-btn" href="http://www.correos.cu/rastreador-de-envios/" target="_blank">revisar</a>
                            </div>
                        </div>
                    )
                })
            }
            {!props.codes && <span>No se encontraron códigos para la información proporcionada.</span>}
            <button className="back-btn" onClick={() => props.goBack('TrakingForm')}>Atras</button>
        </div>
    )
}

export default ListCodes;