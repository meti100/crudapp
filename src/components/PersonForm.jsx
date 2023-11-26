import { useEffect, useState } from 'react';

function PersonForm({ blankPerson, personToEdit, updatePerson, mutatePerson }) {
    const [person, setPerson] = useState({ ...personToEdit });

    useEffect(() => {
        setPerson(personToEdit);
    }, [personToEdit]);

    function handleChange(event) {
        const { id, value } = event.target;
        setPerson({ ...person, [id]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('submit', person);
        mutatePerson(person);
    }

    return (
        <div className="container mt-4">
            <h1>Add/Edit Person</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="id">Id</label>
                    <input className="form-control" id="id" type="number" readOnly placeholder="id" value={person.id} />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" id="name" type="text" placeholder="name" value={person.name} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input className="form-control" id="age" type="number" min="1" max="120" placeholder="age" value={person.age} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" id="email" type="email" placeholder="email" value={person.email} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select className="form-control" id="gender" value={person.gender} onChange={handleChange}>
                        <option>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">Update</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setPerson(blankPerson)}>Reset</button>
                </div>

            </form>
        </div>
    );
}

export default PersonForm;
