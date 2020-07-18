'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState;


function TrakingForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
        var ci = document.querySelector('input[name="ci"]');
        if (ci.value.length > 0) {
            props.getCodes(ci.value);
        } else {
            var err = document.querySelector('.error-msg');
            err.textContent = 'Este campo no puede estar vacio';
            err.classList.remove('hide');
        }
    }

    return React.createElement(
        'div',
        { className: 'traking-form-wrap' },
        React.createElement(
            'h2',
            null,
            'Obtenga los c\xF3digos de los paquetes para su posterior seguimiento'
        ),
        React.createElement(
            'form',
            { className: 'traking-form', onSubmit: handleSubmit },
            React.createElement('input', { type: 'text', name: 'ci', placeholder: 'Ingrese n\xFAmero de identificaci\xF3n del que recibe (CI)' }),
            React.createElement('span', { className: 'error-msg hide' }),
            React.createElement(
                'button',
                { type: 'submit' },
                'Obtener c\xF3digos'
            )
        )
    );
}

function ListCodes(props) {
    function handleCopy(e) {
        e.preventDefault();

        var input_temp = document.createElement("input");
        input_temp.value = e.target.getAttribute('code');
        document.body.appendChild(input_temp);
        input_temp.select();

        document.execCommand("copy");
        document.body.removeChild(input_temp);
    }

    return React.createElement(
        'div',
        { className: 'traking-codes-list' },
        React.createElement(
            'h2',
            null,
            'C\xF3digos de seguimiento'
        ),
        props.codes && props.codes.map(function (v) {
            return React.createElement(
                'div',
                { className: 'traking-code', key: v.cp },
                v.cp,
                ' ',
                React.createElement(
                    'a',
                    { href: '#', onClick: handleCopy, code: v.cp },
                    'copiar'
                )
            );
        }),
        !props.codes && React.createElement(
            'span',
            null,
            'No se encontraron c\xF3digos para la informaci\xF3n proporcionada.'
        ),
        React.createElement(
            'button',
            { onClick: function onClick() {
                    return props.goBack('TrakingForm');
                } },
            'Atras'
        )
    );
}

function App() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        codes = _useState2[0],
        setCodes = _useState2[1];

    var _useState3 = useState('TrakingForm'),
        _useState4 = _slicedToArray(_useState3, 2),
        route = _useState4[0],
        setRoute = _useState4[1];

    var _useState5 = useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        loading = _useState6[0],
        setLoading = _useState6[1];

    function getCodes(ci) {
        setLoading(true);
        var headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "ci": ci });

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        fetch(site_info.site_url + '/wp-json/traking/v1/get-codes', requestOptions).then(function (response) {
            return response.json();
        }).then(function (result) {
            var data = JSON.parse(result);
            setLoading(false);
            setCodes(data.data);
            setRoute('ListCodes');
        }).catch(function (error) {
            return console.log('error', error);
        });
    }

    return React.createElement(
        'div',
        { className: 'traking-app' },
        React.createElement(
            'div',
            { className: loading ? 'loading' : 'hide' },
            React.createElement(
                'span',
                null,
                'Cargando ...'
            )
        ),
        React.createElement(
            'div',
            { className: !loading ? 'wraper' : 'hide' },
            route === 'TrakingForm' ? React.createElement(TrakingForm, { getCodes: getCodes }) : React.createElement(ListCodes, { goBack: setRoute, codes: codes })
        )
    );
}

var domContainer = document.querySelector('#traking-app');
ReactDOM.render(React.createElement(App, null), domContainer);