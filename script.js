import request from 'superagent'
import './style.css'

request.get('https://notes-api.glitch.me/api/notes')
  .auth('HankTest', 'password')
  .then(response => {
    let notes = (response.body.notes)
    let noteSection = getId('note-display')
    for (var i = 0; i < notes.length; i++) {
      let text = el('li')
      text.classList.add('note-section')
      text.innerHTML = `<h3 class="note-title">${notes[i].title}</h3>
      <p>${notes[i].text}</p>`
      noteSection.appendChild(text)
      console.log(notes[i])
    }
  })

getId('new-note-form').addEventListener('submit', event => {
  event.preventDefault()

  let newNoteTitle = getId('note-title')
  let newNote = getId('note')
  let noteData = {
    title: newNoteTitle.value,
    text: newNote.value
  }
  request.post('https://notes-api.glitch.me/api/notes')
    .auth('HankTest', 'password')
    .send(noteData)
    .then(response => {
      getId('new-note-form').reset()
    })
  newPage()
})

function newPage () {
  getId('note-display').innerHTML = ''
  request.get('https://notes-api.glitch.me/api/notes')
    .auth('HankTest', 'password')
    .then(response => {
      let notes = (response.body.notes)
      let noteSection = getId('note-display')
      for (var i = 0; i < notes.length; i++) {
        let text = el('li')
        let textTitle = el('li')
        textTitle.classList.add('note-title')
        textTitle.innerText = notes[i].title
        text.innerText = notes[i].text
        noteSection.appendChild(textTitle)
        noteSection.appendChild(text)
        console.log(notes[i])
      }
    })
}


function deleteNote () {
  let id = text.id
  request.delete(`https://notes-api.glitch.me/api/notes/{body.note.id}`)
    .then(response => {
      getId(`book-${book.id}`).remove()
    })
}

function el (tag) {
  return document.createElement(tag)
}
function getId (id) {
  return document.getElementById(id)
}
