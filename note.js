const container = document.getElementById('app');
const card = document.getElementById('add');
const btn = document.getElementById('addButton');


//Startup
getNotes().forEach( note => {
    const elem = createNoteElement(note.id, note.text);

    container.insertBefore(elem, card);
})


//button
btn.addEventListener('click', ()=> addNote());

//crud
function getNotes(){
    return JSON.parse(localStorage.getItem('notes') || []);
}

function createNoteElement(id, content){

    const textarea = document.createElement('textarea');
    textarea.className = 'note';
    textarea.value = content;
    textarea.placeholder = "Type here...";

    //update
    textarea.addEventListener('change', ()=> updateNote(id, textarea.value));

    //delete
    textarea.addEventListener('dblclick', ()=>{
        const sure = confirm("Are you sure?");

        if(sure) deleteNotes(id, textarea);
    });
    return textarea;
}

function addNote(){

    const arr = getNotes();

    const newNote = {
        id: new Date().getMilliseconds(),
        text: ''
    };

    const newElement = createNoteElement(newNote.id, newNote.text);
    container.insertBefore(newElement, card);

    arr.push(newNote);

    saveNote(arr);
}

function saveNote(array){
    localStorage.setItem('notes', JSON.stringify(array));
}

function updateNote(id, newContent){
    
    const arr = getNotes();

    const note = arr.filter(notes => notes.id == id)[0];

    note.text = newContent;

    saveNote(arr);
}

function deleteNotes(id, htmlElement){

    const arr = getNotes().filter( notes => notes.id !== id);
    saveNote(arr);

    container.removeChild(htmlElement);
}
