
/*
  1-Crie um App para cadastrar os municípios de nascimento com os campos:
    Código do IBGE
    Município
    Estado
  < 
  2- Os dados devem ser listados em formato de tabela na parte inferior do formulário e com a opção de excluir. 
  3- Salve as informações no localstorage.
  4- Crie uma validação para não permitir a gravação de registro em branco.

  Rodrigo Franco Bruno 20-09-2021 - LPW II - Professor: Luiz
*/

import React, {useState, useEffect} from "react"
import "./styles.css"

function Home() {
  // ATRIBUTOS //
  const [codIbge, setSemester] = useState("")
  const [municipio, setSubject] = useState("")
  const [estado, setTeacher] = useState("")
  const [students, setStudents] = useState([])
  const [error, setError] = useState("")

  // METODOS //
  function handleStudent(event) {
    event.preventDefault()

    if ( codIbge !== "" && municipio !== "" && estado !== "") {
        const data = {
          id: new Date().getTime(),
          codIbge,
          municipio,
          estado
      }
      setStudents([...students, data])
      setError("")
      setSemester("")
      setSubject("")
      setTeacher("")
    } else {
      setError("ATENÇÃO! CAMPO VAZIO ...")
    } 
  }

  function handleDelete(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  useEffect(() => {
    function loadData() {
      const storageStudents = localStorage.getItem("@cadnascimento:nascimento");
      if (storageStudents) {
        setStudents(JSON.parse(storageStudents));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    function saveData() {
      localStorage.setItem("@cadnascimento:nascimento", JSON.stringify(students));
    }
    saveData();
  }, [students]);

  return (

    

    <div className="page">
      
      <h7>.</h7>
      <h7 className="TituloTabela" >Olá... Seja bem vindo!</h7>
      <h7 className="TituloTabela">Por favor, faça o cadastro do seu município de nascimento.</h7>

      <form className="cadastro" onSubmit={handleStudent}>
      
        <label for="semester">COD. IBGE</label> 
        <input id="semester"
          type="text" 
          name="semester"  
          className="border"
          value={codIbge} 
          onChange={(event) => setSemester(event.target.value)}
        />

        <label for="subject" >MUNICÍPIO</label>
        <input id="subject"
          type="text" 
          name="subjecter"  
          className="border"
          value={municipio} 
          onChange={(event) => setSubject(event.target.value)}
        />  
        
       
        <label for="teacher">ESTADO</label>
        <input id="teacher"
          type="text" 
          name="teacher"  
          className="border"
          value={estado} 
          onChange={(event) => setTeacher(event.target.value)}
        />  
      
                
        <h7>----------------------------------------------------------------------------------</h7>
        <p>
          <h7>Verifique os dados...</h7>
          <h7> Se estiverem corretos aperte "Enviar"</h7>
          <h7>.</h7>
        </p>
        <h7>----------------------------------------------------------------------------------</h7>
        <p>{error}</p>
        <h7>----------------------------------------------------------------------------------</h7>

        <div className="page">
          <button  onClick={handleStudent}>Enviar</button>
        </div>

      </form>
      
      <h7>.</h7>
      <h1 className="TituloTabela"> Dados na tabela </h1>
      <h7>.</h7>
      <table >
        
        <thead >
          <tr>
            <th>COD. IBGE</th>
            <th>MUNICÍPIO</th>
            <th>ESTADO</th>
            <th colSpan={1}>AÇÕES</th>
          </tr>
        </thead>

        <tbody >
          {students.map((student) => (
            <tr key={student.id} >
              <td>{student.codIbge}</td>
              <td>{student.municipio}</td>
              <td>{student.estado}</td>
              <td>
                <button
                  className="Excluir"
                  onClick={() => handleDelete(student.id)}
                >Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export { Home };
