import { useState, useEffect } from 'react'
import axios from "axios"

function Notes() {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        
    }, []);

    return (
        <div className='bg-gray-600  text-white font-sans h-screen w-screen flex justify-center items-center flex-col'>
            <h1 className='text-3xl mb-4 font-bold '>Notes</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    className="p-2 w-80 rounded-md bg-gray-700 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a note..."
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                    Add Note
                </button>
            </div>

            <ul className='w-80 space-y-2'>
                <li className="bg-gray-700 p-3 rounded-md shadow-md">Example Note</li>
            </ul>
        </div>
    )
}

export default Notes
