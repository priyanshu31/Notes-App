let notetitle = localStorage.getItem("notetitle");
let notetext = localStorage.getItem("notetext");
if (notetitle == null)
    notetext = [], notetitle = [];
else
    notetext = JSON.parse(notetext), notetitle = JSON.parse(notetitle);

displaynotes();

let savebtn = document.getElementById('savebtn');
savebtn.addEventListener('click', () => {


    let text = document.getElementById('addtext');
    let title = document.getElementById('notetitle');

    if (title.value == "")
        return;

    notetitle.push(title.value);
    notetext.push(text.value);
    title.value = text.value = "";

    localStorage.clear();
    localStorage.setItem('notetitle', JSON.stringify(notetitle));
    localStorage.setItem('notetext', JSON.stringify(notetext));

    displaynotes();
});

function displaynotes() {

    notetitle = localStorage.getItem("notetitle");
    notetext = localStorage.getItem("notetext");
    if (notetitle == null)
        notetext = [], notetitle = [];
    else
        notetext = JSON.parse(notetext), notetitle = JSON.parse(notetitle);

    let html = "";
    notetext.forEach((element, index) => {
        html += `<div class="card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${notetitle[index]}</h5>
          <p class="card-text">${element}</p>
          <a href="#" id="${index}" onclick = "deletenote(this.id)" class="btn btn-primary">Delete Note</a>
        </div>
      </div>`
    });

    if (html == "")
        html = 'No notes added. Add notes using "Add a Note section"';

    document.getElementById('notes').innerHTML = html;
}

function deletenote(index) {

    notetitle = localStorage.getItem("notetitle");
    notetext = localStorage.getItem("notetext");
    if (notetitle == null)
        notetext = [], notetitle = [];
    else
        notetext = JSON.parse(notetext), notetitle = JSON.parse(notetitle);

    notetitle.splice(index, 1);
    notetext.splice(index, 1);

    localStorage.clear();
    localStorage.setItem('notetitle', JSON.stringify(notetitle));
    localStorage.setItem('notetext', JSON.stringify(notetext));

    displaynotes();
}

let search = document.getElementById('searchtext');

search.addEventListener('input', () => {

    let searchval = search.value.toLowerCase();
    console.log(searchval);

    notetitle = localStorage.getItem("notetitle");
    notetext = localStorage.getItem("notetext");
    if (notetitle == null)
        notetext = [], notetitle = [];
    else
        notetext = JSON.parse(notetext), notetitle = JSON.parse(notetitle);

    let html = "";

    notetext.forEach((element, index) => {
        if (notetitle[index].toLowerCase().includes(searchval) || element.toLowerCase().includes(searchval)) {
            html += `<div class="card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${notetitle[index]}</h5>
            <p class="card-text">${element}</p>
            <a href="#" id="${index}" onclick = "deletenote(this.id)" class="btn btn-primary">Delete Note</a>
            </div>
            </div>`;
        }
    });

    if (html == "")
        html = `${search.value} doesn't exist`;

    document.getElementById('notes').innerHTML = html;
});
