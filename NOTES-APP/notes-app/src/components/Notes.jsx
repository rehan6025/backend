import { useState, useEffect } from 'react';
import axios from "axios";

function Notes() {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/notes")
            .then((res) => setNotes(res.data))
            .catch(err => console.log(err));
    }, []);

    const addNote = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/notes", { text: newNote });
            setNotes(res.data);
            setNewNote("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-gray-600 text-white font-sans h-screen w-screen flex justify-center items-center flex-col'>
            <h1 className='text-3xl mb-4 font-bold'>Notes</h1>

            <div className="flex gap-4 mb-6">
                
                <textarea
                    className="p-2 w-80 h-24 rounded-md bg-gray-700 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a note..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                />
                <button onClick={addNote} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                    Add Note
                </button>
            </div>

            <ul className='w-80 space-y-2'>
                {notes.length === 0 ? (
                    <h5 className='font-black align-middle'>No notes to display</h5>
                ) : (
                    notes.map((note) => (
                        <li key={note._id} 
                            className="p-2 bg-gray-700 rounded-md"
                            dangerouslySetInnerHTML={{ __html: note.text.replace(/\n/g, "<br />") }}
                        />
                    ))
                )}
            </ul>
        </div>
    );
}

export default Notes;
