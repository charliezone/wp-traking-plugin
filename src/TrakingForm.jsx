function TrakingForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
        const ci = document.querySelector('input[name="ci"]');
        if (ci.value.length > 0) {
            props.getCodes(ci.value);
        } else {
            const err = document.querySelector('.error-msg');
            err.textContent = 'Este campo no puede estar vacio';
            err.classList.remove('hide');
        }

    }

    return (
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

export default TrakingForm;