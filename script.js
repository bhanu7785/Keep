const addButton=document.querySelector('#add');

//storing data in local storage
const updateLSData=()=>{
    const textareaData=document.querySelectorAll('textarea');
    const notes=[];

    textareaData.forEach((note)=>{
        return notes.push(note.value);

    })
    console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote =(text= '') =>{

    const note= document.createElement('div');
    note.classList.add('note');

    const htmlData=`<div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash"></i></button>
</div>

<div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" :""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin',htmlData);


    const editButton=note.querySelector('.edit');
    const delButton=note.querySelector('.delete');
    const mainDiv=note.querySelector('.main');
    const textarea=note.querySelector('textarea');


    //deleting notes
    delButton.addEventListener('click',()=>{
        note.remove();
    })
    
  //adding text to area
    textarea.value=text;
    mainDiv.innerHTML=text;

  //on click only one is enable either only edit button then only enter data
    editButton.addEventListener('click' ,()=>{
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })


    //changing value
    textarea.addEventListener('change' ,(event) =>{
        const value=event.target.value;
        mainDiv.innerHTML=value;

        updateLSData();
    })


   //it appends as the last child of a node
    document.body.appendChild(note);

}

//getting notes from local storage
const notes=JSON.parse(localStorage.getItem('notes'));

if(notes){  notes.forEach((note) => addNewNote(note) )};


addButton.addEventListener('click',()=>{
    addNewNote()
});