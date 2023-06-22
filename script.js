
const homeFolderButton = document.getElementById("Home");
const deletedFolderButton = document.getElementById("deleted");
const archivedFolderButton = document.getElementById("archived");
const addNoteButton = document.getElementById("addNote");
const notesDiv = document.getElementById("notes")
const searchbar = document.getElementById("searchbar")
const searchbutton = document.getElementById("searchbutton")
const inputElement = document.getElementById("addTitle"); // Replace 'your-input-id' with the actual ID of your input element




showNotes()

homeFolderButton.addEventListener("click", showNotes)

function addNotes(){

    let notes = localStorage.getItem("LocalNotes")

    if (notes===null){
        notes=[];
    }else {
        notes = JSON.parse(notes);
    }

    if(addText.value==""){
        alert("Add your note first");
        return;
    }

        const notesobj= {
            title: (addTitle.value == "") ? "Note" : addTitle.value ,
            text : addText.value
        }

        addTitle.value = '';
        addText.value = '';

        notes.push(notesobj) ;

        localStorage.setItem("LocalNotes", JSON.stringify(notes))
        showNotes();

         // Scroll to the last position at the bottom of the page
window.scrollTo({
  top: document.documentElement.scrollHeight - window.innerHeight,
  behavior: 'smooth' // Optional, adds a smooth scrolling effect
});

    }


addNoteButton.addEventListener("click", addNotes)

function showNotes(){

        let notesHTML ="" ;
        let notes = localStorage.getItem("LocalNotes");
        

        if(notes===null){
            return;
        }else {
            notes = JSON.parse(notes)
        }

        for(let i=0; i<notes.length; i++){
        notesHTML += ` <div class="note" id=note${i} >
                                <div id="items">
                                <div class="title" id="title${i}" >${ (notes[i].title== "") ? "note" : notes[i].title }</div>
                                <div class="text" id="text${i}" >${notes[i].text }</div>
                                </div>
                                <div id="access">
                                <button class="Editbutton" id=edit${i} onclick = "editNotes(${i})">Edit</button>
                                <button class="archivebutton" id=archive${i} onclick = "archiveNotes(${i})">Archive</button>
                                <button class="deletebutton" id=${i} onclick = "deleteNotes(${i})">Delete</button>
                                </div>
                        </div> `  
        }

        notesDiv.innerHTML = notesHTML ;
    }



    function archiveNotes(ind){
        let notes = localStorage.getItem("LocalNotes");
        notes= JSON.parse(notes);

        let arcLocNotes = localStorage.getItem("archivedLocalNotes");

    if (arcLocNotes === null) {
        arcLocNotes = [];
        }else {
        arcLocNotes = JSON.parse(arcLocNotes);
        }

        const arcNoteObj = {
            title : (notes[ind].title== "") ? "note" : notes[ind].title ,
            text : notes[ind].text
        }

        arcLocNotes.push(arcNoteObj) ;

        localStorage.setItem("archivedLocalNotes", JSON.stringify(arcLocNotes) );


        notes.splice(ind,1);
        localStorage.setItem('LocalNotes', JSON.stringify(notes));
        showNotes();
        
    }
   
    function showarchiveNotes(){
        let arcLocNotesHTML = "";

    let arcLocNotes = localStorage.getItem("archivedLocalNotes");

    if(arcLocNotes===null){
        return;
    }else {
        arcLocNotes= JSON.parse(arcLocNotes);
    }


    for(let i=0; i<arcLocNotes.length; i++){
    
        arcLocNotesHTML+= ` <div class="note" >
                                <div id="items">
                                <div class="title" id=title${i} >${ (arcLocNotes[i].title== "") ? "note" : arcLocNotes[i].title }</div>
                                <div class="text" id=text${i} >${arcLocNotes[i].text }</div>
                                </div>
                                <div id="access">
                                <button class="retreivebutton" id=${i} onclick = "retrieveNotesfromarchive(${i})" >Retreive</button>
                                <button class="deletebutton" id=${i} onclick = "deleteNotesinthearchive(${i})" >Delete</button>
                                </div>
                            </div> ` 
                         

      }
    notesDiv.innerHTML = arcLocNotesHTML;

    }

    archivedFolderButton.addEventListener("click", showarchiveNotes)


    function deleteNotes(ind) {
        let notes = localStorage.getItem("LocalNotes");
        notes = JSON.parse(notes);
      
        if (notes === null) {
          return;
        }
      
        let delLocNotes = localStorage.getItem("deletedLocalNotes");
      
        if (delLocNotes === null) {
          delLocNotes = [];
        } else {
          delLocNotes = JSON.parse(delLocNotes);
        }
      
        const delNoteObj = {
          title: notes[ind].title || "note",
          text: notes[ind].text,
        };
      
        delLocNotes.push(delNoteObj);
      
        localStorage.setItem("deletedLocalNotes", JSON.stringify(delLocNotes));
      
        notes.splice(ind, 1);
        localStorage.setItem("LocalNotes", JSON.stringify(notes));     
        showNotes();
      }
      




    function showdeletedNotes(){
        let delLocNotesHTML = "";

        let delLocNotes = localStorage.getItem("deletedLocalNotes");

    if(delLocNotes===null){
        return;
    }else {
        delLocNotes= JSON.parse(delLocNotes);
    }


    for(let i=0; i<delLocNotes.length; i++){
    
        delLocNotesHTML+= ` <div class="note" >
                                <div id="items">
                                <div class="title" id=title${i} >${ (delLocNotes[i].title== "") ? "note" : delLocNotes[i].title }</div>
                                <div class="text" id=text${i} >${delLocNotes[i].text }</div>
                                </div>
                                <div id="access">
                                
                                </div>
                            </div> ` 
                            // onclick = "deleteNotes(${i})"

      }
    notesDiv.innerHTML = delLocNotesHTML;

    }


    deletedFolderButton.addEventListener("click", showdeletedNotes)



   

    function deleteNotesinthearchive(ind) {
        let arcLocNotes = localStorage.getItem("archivedLocalNotes");
        arcLocNotes = JSON.parse(arcLocNotes);
      
        if (arcLocNotes === null) {
          return;
        }
      
        let delLocNotes = localStorage.getItem("deletedLocalNotes");
      
        if (delLocNotes === null) {
          delLocNotes = [];
        } else {
          delLocNotes = JSON.parse(delLocNotes);
        }
      
        const delNoteinarcObj = {
          title: arcLocNotes[ind].title || "Note",
          text: arcLocNotes[ind].text,
        };
      
        delLocNotes.push(delNoteinarcObj);
      
        localStorage.setItem("deletedLocalNotes", JSON.stringify(delLocNotes));
      
        arcLocNotes.splice(ind, 1);
        localStorage.setItem("archivedLocalNotes", JSON.stringify(arcLocNotes));     
        showarchiveNotes();
      }




      function retrieveNotesfromarchive (ind) {
        let arcLocNotes = localStorage.getItem("archivedLocalNotes");
        arcLocNotes = JSON.parse(arcLocNotes);
      
        if (arcLocNotes === null) {
          return;
        }
      
        let notes = localStorage.getItem("LocalNotes");
          
        if (notes === null) {
          notes = [];
        } else {
          notes = JSON.parse(notes);
        }
      
        const arcNoteObj = {
          title: arcLocNotes[ind].title || "note",
          text: arcLocNotes[ind].text,
        };
      
        notes.push(arcNoteObj);
      
        localStorage.setItem("LocalNotes", JSON.stringify(notes));
      
        arcLocNotes.splice(ind, 1);
        localStorage.setItem("archivedLocalNotes", JSON.stringify(arcLocNotes));     
        showarchiveNotes();
      }



//       function filterNotes(event) {
//   // Get the search string from the input field.
//   let searchString = searchbar.value;

//   // Create a new array to store the filtered notes.
//   let filteredNotes = [];

//   // Iterate through the notes array.
//   for (let i = 0; i < notes.length; i++) {
//     // Check if the title or text of the note contains the search string.
//     if (notes[i].title.toLowerCase().includes(searchString.toLowerCase()) || notes[i].text.toLowerCase().includes(searchString.toLowerCase())) {
//       // If it does, add the note to the filtered notes array.
//       filteredNotes.push(notes[i]);
//     }
//   }

//   // Clear the contents of the notes div.
//   notesDiv.innerHTML = "";

//   // Iterate through the filtered notes array and add each note to the notes div.
//   for (let i = 0; i < filteredNotes.length; i++) {
//     notesDiv.innerHTML += `
//       <div class="note" id="note${i}">
//         <div id="items">
//           <div class="title" id="title${i}">${filteredNotes[i].title}</div>
//           <div class="text" id="text${i}">${filteredNotes[i].text}</div>
//         </div>
//         <div id="access">
//           <button class="archivebutton" id="archive${i}" onclick="archiveNotes(${i})">Archive</button>
//           <button class="deletebutton" id="${i}" onclick="deleteNotes(${i})">Delete</button>
//         </div>
//       </div>
//     `;
//   }
// }

// // Attach the event listener to the search button.
// searchbutton.addEventListener("click", filterNotes);



function filterNotes(event) {
    let notes = localStorage.getItem("LocalNotes");
          
    if (notes === null) {
      notes = [];
    } else {
      notes = JSON.parse(notes);
    }
    
    // Get the search string from the input field.
    let searchString = searchbar.value;
  
    // Create a new array to store the filtered notes.
    let filteredNotes = [];
  
    // Iterate through the notes array.
    for (let i = 0; i < notes.length; i++) {
      // Check if the title or text of the note contains the search string.
      if (notes[i].title.toLowerCase().includes(searchString.toLowerCase()) || notes[i].text.toLowerCase().includes(searchString.toLowerCase())) {
        // If it does, add the note to the filtered notes array.
        filteredNotes.push(notes[i]);
      }
    }
  
       
    // Clear the contents of the notes div.
    notesDiv.innerHTML = "";
  
    // Iterate through the filtered notes array and add each note to the notes div.
    for (let i = 0; i < filteredNotes.length; i++) {
      notesDiv.innerHTML += `
        <div class="note" id="note${i}">
          <div id="items">
            <div class="title" id="title${i}">${filteredNotes[i].title}</div>
            <div class="text" id="text${i}">${filteredNotes[i].text}</div>
          </div>
          <div id="access">
            <button class="Editbutton" id=edit${i} href="#Home" onclick = "editNotes(${i})">Edit</button>
            <button class="archivebutton" id="archive${i}" onclick="archiveNotes(${i})">Archive</button>
            <button class="deletebutton" id="${i}" onclick="deleteNotes(${i})">Delete</button>
          </div>
        </div>
      `;
    }
  }

  // Attach the event listener to the search button.
  searchbutton.addEventListener("click", filterNotes);



  function editNotes(ind) {

    inputElement.focus();

    let notes = localStorage.getItem("LocalNotes");
    notes = JSON.parse(notes);

    addTitle.value = notes[ind].title ;
    addText.value = notes[ind].text ;

    if (notes === null) {
      return;
    }
  
    notes.splice(ind, 1);
    localStorage.setItem("LocalNotes", JSON.stringify(notes));     
    showNotes();

  }
  