let notetext, notetitle, date;
displaynotes();

let savebtn = document.getElementById('savebtn');
savebtn.addEventListener('click', () => {
    notetitle = localStorage.getItem("notetitle");
    notetext = localStorage.getItem("notetext");
    date = localStorage.getItem("date");

    if (notetitle == null)
        notetext = [], notetitle = [], date = [];
    else
        notetext = JSON.parse(notetext), notetitle = JSON.parse(notetitle), date = JSON.parse(date);

    let text = document.getElementById('addtext');
    let title = document.getElementById('notetitle');

    if (title.value == "")
        return;

    let d = new Date();
    d = d.toDateString();
    date.push(d);
    notetitle.push(title.value);
    notetext.push(text.value);
    title.value = text.value = "";

    localStorage.clear();
    localStorage.setItem('notetitle', JSON.stringify(notetitle));
    localStorage.setItem('notetext', JSON.stringify(notetext));
    localStorage.setItem('date', JSON.stringify(date));

    displaynotes();
});

function displaynotes() {

    notetitle = localStorage.getItem("notetitle");
    notetext = localStorage.getItem("notetext");
    date = localStorage.getItem("date");

    if (notetitle == null)
        notetext = [], notetitle = [];
    else
        notetext = JSON.parse(notetext), notetitle = JSON.parse(notetitle), date = JSON.parse(date);

    let html = "";
    notetext.forEach((element, index) => {
        html += `<div class="card border-dark mb-3" style="max-width: 18rem; padding: 0">
        <div class="card-header">${date[index]}</div>
        <div class="card-body text-dark">
          <h5 class="card-title">${notetitle[index]}</h5>
          <p class="card-text">${element}</p>
          <a href="#" id="${index}" onclick = "deletenote(this.id)" class="btn btn-primary">Delete Note</a>
        </div>
        </div>
        </div>`;
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
            html += `<div class="card border-dark mb-3" style="max-width: 18rem; padding: 0">
            <div class="card-header">${date[index]}</div>
            <div class="card-body text-dark">
              <h5 class="card-title">${notetitle[index]}</h5>
              <p class="card-text">${element}</p>
              <a href="#" id="${index}" onclick = "deletenote(this.id)" class="btn btn-primary">Delete Note</a>
            </div>`;
        }
    });
    
    if (html == "")
    html = `${search.value} doesn't exist`;
    
    document.getElementById('notes').innerHTML = html;
});
