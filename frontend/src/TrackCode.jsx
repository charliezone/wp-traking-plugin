const { useState, useEffect } = React;

function TrackCode(props){
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [trakingData, setTrakingData] = useState();

    function fetchRemote(cp, year){
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "cp": cp,
            "year": year,
            'nonce': site_info.traking_nonce
        });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw
        };

        fetch(`${site_info.site_url}/wp-json/traking/v1/track-codes`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const data = JSON.parse(result);
                setLoading(false);
                setTrakingData(JSON.parse(data.data.body));
                setSuccess(data.susses);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if(props.cp){
            setLoading(true);
            fetchRemote(props.cp, props.year);
        }
    }, [props.cp]);

    return(
        <div className={`track-code ${!props.visible && 'hide'}`}>
            <div className={(loading) ? 'loading' : 'hide'}><span>Cargando ...</span></div>
            <button className="close" onClick={() => props.close()}>Cerrar</button>
            <div className="track-wraper">
                {success && <div className="contry-from"><span>País de origen:&nbsp;</span> {trakingData.p_origen}</div> }
                {success && (trakingData.timeline == 'ENTREGADO' && <div className="pack-status"><span>Estado:&nbsp;</span> {trakingData.timeline}</div> )  }
                {success && <div className="timeline-wraper">
                    {trakingData.datos.map(item => {
                        return(
                            <div className="time-item">
                                <div className="status">
                                    <div className="date">{item.fecha}</div>
                                    <div className="status-name"><strong>{item.estado}</strong></div>
                                </div>
                                <div className="location">
                                    <div className="from"><span>En:&nbsp;</span> {item.oficina_origen}</div>
                                    {(item.oficina_destino != ' ') && <div className="to">
                                        <span>Hacia:&nbsp;</span> {item.oficina_destino}
                                    </div> }
                                </div>
                            </div>
                        );
                    })}
                </div> }
                {success && console.log(trakingData.datos) }
            </div>
        </div>
    );
}

export default TrackCode;