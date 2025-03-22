import { useState, useEffect } from 'react';
import axios from "axios";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    // 🟢 Fetch notes on component mount
    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/notes");
            setNotes(res.data);
        } catch (err) {
            console.log("Error fetching notes:", err);
        }
    };

    const addNote = async () => {
        if (!newNote.trim()) return;  // 🛑 Prevent empty notes

        try {
            const res = await axios.post("http://localhost:5000/api/notes", { text: newNote });
            
            // ✅ Backend se updated notes list milega
            setNotes(res.data);
            setNewNote("");
        } catch (error) {
            console.log("Error adding note:", error);
        }
    };

    return (
        <div className='bg-gray-600 text-white font-sans h-screen w-screen flex justify-center items-center flex-col'>
            <h1 className='text-3xl mb-4 font-bold '>Notes</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    className="p-2 w-80 rounded-md bg-gray-700 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a note..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                />
                <button 
                    onClick={addNote} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    Add Note
                </button>
            </div>

            <ul className='w-80 space-y-2'>
                {notes.length === 0 ? (
                    <h5 className='font-black text-center'>No notes to display</h5>
                ) : (
                    notes.map((note) => (
                        <li key={note._id} className="bg-gray-700 p-2 rounded-md">{note.text}</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Notes;
