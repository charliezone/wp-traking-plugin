import TrackCode from './TrackCode';

const { useState } = React;

function ListCodes(props) {

    const [trackCodeVisible, setTrackCodeVisible] = useState(false);
    const [reviewCp, setReviewCp] = useState(false);
    const [reviewYear, setReviewYear] = useState();

    function handleCopy(e) {
        e.preventDefault();

        const input_temp = document.createElement("input");
        input_temp.value = e.target.getAttribute('code');
        document.body.appendChild(input_temp);
        input_temp.select();

        document.execCommand("copy");
        document.body.removeChild(input_temp);
    }

    function handleReview(e, cp, createAt){
        e.preventDefault();
        const date = new Date(createAt);
        setTrackCodeVisible(true);
        setReviewCp(cp);
        setReviewYear(date.getFullYear());
    }

    function closeReview(){
        setTrackCodeVisible(false);
    }

    return (
        <div className="traking-codes-list">
            <h2>Códigos de seguimiento</h2>
            <small>Los códigos aparecen ordenados por fecha, los más recientes arriba.</small>
            {
                props.codes && props.codes.map(v => {
                    return (
                        <div className="traking-code" key={v.cp}>
                            <strong>{v.cp}</strong>
                            <div className="actions-btn">
                                <button href="#" onClick={handleCopy} code={v.cp}>copiar</button>
                                <button href="#" onClick={(e) => handleReview(e, v.cp, v.create_at)} >Revisar</button>
                            </div>
                        </div>
                    )
                })
            }
            {!props.codes && <span>No se encontraron códigos para la información proporcionada.</span>}
            <button onClick={() => props.goBack('TrakingForm')}>Atras</button>
            <TrackCode visible={trackCodeVisible} cp={reviewCp} year={reviewYear} close={closeReview} />
        </div>
    )
}

export default ListCodes;