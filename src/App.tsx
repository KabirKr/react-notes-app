import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { clsx } from "clsx";

import { nanoid } from "nanoid";

type Note = {
  id: string;
  text: string;
  date: Date;
};

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  // Close dialog
  const closeDialog = () => {
    setIsOpen(false);
  };

  const saveNote = () => {
    // Validate input
    if (!noteText.trim().length) {
      setError("Can not add empty note");
      return;
    }

    const newNote: Note = {
      id: nanoid(),
      text: noteText,
      date: new Date(),
    };

    setNotes([...notes, newNote]);
    closeDialog();
  };

  return (
    <>
      <div className="container py-10">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notes App</h1>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-1 rounded bg-indigo-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors ease-in hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300 active:bg-indigo-700"
          >
            <span>New Note</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </button>
        </header>

        <main className="mt-10">
          {notes.length ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="rounded border border-gray-300 p-5 shadow-sm"
                >
                  <div className="leading-relaxed">
                    <p>{note.text}</p>
                    <p className="mt-5 flex items-center space-x-1 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#000000"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 12l2 3" />
                        <path d="M12 7v5" />
                      </svg>
                      <span>
                        {note.date.toLocaleDateString("en-GB", {
                          hour12: true,
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-20 text-center text-gray-800">
              No notes found
            </div>
          )}
        </main>
      </div>

      {/* Dialog start */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto w-full space-y-5 rounded bg-white p-5 md:w-9/12 lg:w-1/2">
            <Dialog.Title className="text-lg font-semibold">
              Add new note
            </Dialog.Title>

            <textarea
              name="newNote"
              cols={30}
              rows={10}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className={clsx("block w-full rounded-sm focus:ring", {
                "focus:border-indigo-700 focus:ring-indigo-200": !error,
                "border-red-500 focus:border-red-500 focus:ring-red-300": error,
              })}
            ></textarea>

            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={closeDialog}
                className="flex items-center space-x-1 rounded bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors ease-in hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 active:bg-red-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNote}
                className="flex items-center space-x-1 rounded bg-indigo-800 px-5 py-2 text-sm font-semibold text-white transition-colors ease-in hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300 active:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Dialog end */}
    </>
  );
}

export default App;
