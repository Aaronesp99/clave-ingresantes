import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        document.title="Cachimbos"
        super(props);
        this.state = {
            alumnos:[]
        }
        this.fetchReinciarClave=this.fetchReinciarClave.bind(this);
        this.HandleClickReiniciarClave=this.HandleClickReiniciarClave.bind(this)
    }
    componentWillMount(){
        fetch("/api/alumnos/")
        .then(res => res.json())
        .then(json => this.setState({alumnos:json}))
    }
    fetchReinciarClave(codigo){
        const formDataCodigo = new FormData();
        formDataCodigo.append("codigo", codigo);

        return fetch("http://oeraae/ajax/reiniciar_contrasena/reset.php",{
            method: 'POST',
            headers: {
                'Accept':'*/*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body:new URLSearchParams(formDataCodigo).toString(),
            credentials: "include"
        }).then(res => res.text())
        .catch((err) => {
            console.log(err);
        });
    }
    HandleClickReiniciarClave(e){
        const {alumnos}=this.state;
        const ComodinEnviarNext = (i) => {
            if (i < alumnos.length) {
                this.fetchReinciarClave(alumnos[i]['codAlumno_fk']).then((text)=>{
                    document.querySelector("tr#tr-"+alumnos[i]['codAlumno_fk']+" .clave").innerHTML=text
                    ComodinEnviarNext(i + 1)
                })   
            }
        }
        ComodinEnviarNext(0);
    }
    render() {
        return ( 
        <div className="p-2 col-10 mx-auto">
            <button className="btn btn-success mb-3" onClick={this.HandleClickReiniciarClave}>Actualizar Clave</button>
            <div className="table-responsive">
            <table border={1} className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.alumnos.map(function(item, key) {
                        return (
                            <tr key = {key} id={"tr-"+item.codAlumno_fk}>
                                <td>{item.codAlumno_fk}</td>
                                <td>{item.nombres}</td>
                                <td>{item.apePaterno}</td>
                                <td>{item.apeMaterno}</td>
                                <td className="clave">--</td>
                            </tr>
                            )
                    })}
                </tbody>
            </table>
            </div>
        </div>
        )
    }
}

ReactDOM.render( < App / > , document.getElementById('root'));