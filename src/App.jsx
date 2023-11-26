
import './styles/App.css'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import { useEffect, useState } from 'react';
import { fetchData } from './util/persistence';


const blankPerson = {id: '', age: '', name: '', email: '', gender:''};


function App() {
  const [persons, setPersons] = useState([]);
  const [personToEdit, setPersonToEdit] = useState(blankPerson);

  const APIURL = "http://localhost:3000/api";

  function editPerson (person) {
    setPersonToEdit(person);
  }

  function mutatePerson (person) {
    if (person.id != "") {
      //PUT
      updatePerson(person)
    } else {
      //POST
      createPerson(person)
    }
  }

  function updatePerson(person) {
    console.log("update");
    fetchData(`${APIURL}/${person.id}`, setPersons(persons.map(p => p.id == person.id ?  {...person} : p)), 'PUT', person);
  }

  function createPerson(person) {
    console.log("create");
    fetchData(`${APIURL}`, (person) => setPersons([...persons, person]), 'POST', person);
  }

  function getPersons(callback) {
    //fetch data
    fetchData(APIURL, callback);
    //update useState (setPersons)
  }

  function deletePersonById(personId) {
    // fjern via API - JSON-server
    fetchData(`${APIURL}/${personId}`, () => {}, "DELETE");
    // fjern fra persons array via setPersons

  setPersons([...persons.filter(p => p.id != personId)]);

  }

  useEffect(() => {
    //get all persons
    getPersons((data) => setPersons(data));
  }, []);

  return (
    <div>
      <h1>App</h1>
      
      <PersonList persons={persons} deletePersonById={deletePersonById} editPerson={editPerson}/>
      <PersonForm blankPerson={blankPerson} personToEdit={personToEdit} mutatePerson={mutatePerson}/>
    </div>
  )
}

export default App;