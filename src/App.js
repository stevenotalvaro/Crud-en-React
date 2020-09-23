import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//complementos e Reactstrap
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  
];

class App extends React.Component {
  //estado para almacenar el registro de las peliculas
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      genero: "",
      nombre: "",
      url: "",
      duracion: "",
      descripcion: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].genero = dato.genero;
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].url = dato.url;
        arreglo[contador].duracion = dato.duracion;
        arreglo[contador].descripcion = dato.descripcion;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }
  // funcion para que se actualice en el estado
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Registrar</Button>
          <br />
          <br/>
          {/* creacion de tabla  */}
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Generos</th>
                <th>Nombre</th>
                <th>Image URL</th>                
                <th>Duaracion</th>
                <th>Descripcion</th>
                <th>Acción</th>
              </tr>
            </thead>
                  {/* desplegar los elementos */}
            <tbody>
              {/* map para desglozar elementos */}
              {this.state.data.map((dato) => (  
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.genero}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.url}</td>
                  <td>{dato.duracion}</td>
                  <td>{dato.descripcion}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
                  
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>
            
            <FormGroup>
              <label>
                Generos: 
              </label>
              <input className="form-control" name="genero" type="text" onChange={this.handleChange} value={this.state.form.genero}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}/>
            </FormGroup>

            <FormGroup>
              <label>
                Image URL: 
              </label>
              <input className="form-control" name="url" type="text" onChange={this.handleChange} value={this.state.form.url}/>
            </FormGroup>

            <FormGroup>
              <label>
                Duracion: 
              </label>
              <input className="form-control" name="duracion" type="text" onChange={this.handleChange} value={this.state.form.duracion}/>
            </FormGroup>

            <FormGroup>
              <label>
                Descripcion: 
              </label>
              <input className="form-control" name="descripcion" type="textarea" onChange={this.handleChange} value={this.state.form.descripcion}/>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>
              Editar
            </Button>

            <Button
              color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

                  {/* ventana modal */}

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Registrar Pelicula</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Generos: 
              </label>
              <input className="form-control" name="genero" type="text" onChange={this.handleChange}/>
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>
                Image URL: 
              </label>
              <input className="form-control" name="url" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>
                Duracion: 
              </label>
              <input className="form-control" name="duracion" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>
                Descripcion: 
              </label>
              <input className="form-control" name="descripcion" type="textarea" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Registrar
            </Button>
            <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}> 
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
