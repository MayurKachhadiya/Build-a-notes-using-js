console.log("magic notes app");
showNotes();

let addTxt = document.getElementById('addTxt');
let addBtn = document.getElementById('addBtn');
let addtitle = document.getElementById('title');

addBtn.addEventListener("click", function() {
    if (addBtn.innerText == "Add Note") {
        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addtitle.value,
            text: addTxt.value
        }
        console.log(myObj);
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        myObj.value = "";
        showNotes();
    } else if (addBtn.innerText == "Edit Note") {
        let notes = localStorage.getItem('notes');
        notesObj = JSON.parse(notes);
        // console.log(notesObj);
        notesObj[parseInt(addBtn.getAttribute("name"))] = addTxt.value;
        // notesObj[parseInt(addBtn.getAttribute("name"))] = addtitle;
        console.log(notesObj);
        // notesObj.findIndex(element, index) => {
        //     addtitle.value = element.title;
        //     addTxt.value = element.text;
        // })

        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addBtn.innerText = "Edit Note";
        showNotes();
    }
})

// function to show note
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-counter">Note${index +1}</h5>
                <h3 class="card-title">${element.title}</h3>
                <p class="card-text">${element.text}</p>
                <a id="${index}" onclick="deletenotes(this.id)" class="btn btn-primary">Delete Note</a>
                <a id="${index}" onclick="Editnotes(this.id)" class="btn btn-primary">Edit Note</a>
            </div>
        </div>`;
    });
    let notesele = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesele.innerHTML = html;
    } else {
        notesele.innerHTML = "first one you can add than show notes";
    }
}

function deletenotes(index) {
    console.log("deleting notes", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

function Editnotes(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj = JSON.parse(notes);
    // console.log(notesObj[index]);
    let add = notesObj[index];
    // console.log(add);
    addTxt.value = add.text;
    addtitle.value = add.title;

    addBtn.innerText = "Edit Note";
    addBtn.setAttribute("name", index.toString())
}

let search = document.getElementById("SearchTxt");
search.addEventListener("input", function() {

    let inputVal = search.value.toLowerCase();
    console.log("Input event fired!", inputVal);
    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
})