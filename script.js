import request from 'superagent'
import './style.css'

request.get('https://notes-api.glitch.me/api/notes')
  .auth('HankTest', 'password')
  .then(response => {
    let notes = (response.body.notes)
    let noteSection = getId('note-display')
    for (var i = 0; i < notes.length; i++) {
      let text = el('li')
      text.id = `${notes[i]._id}`
      text.classList.add('textBody')
      text.innerHTML = `<h3 class="note-title">${notes[i].title}</h3>
      <p class="noteText">${notes[i].text}</p>`
      noteSection.appendChild(text)
      let deleteLink = el('a')
      deleteLink.href = '#'
      deleteLink.style.paddingLeft = '0.5rem'
      deleteLink.classList.add('text-danger')
      deleteLink.innerText = 'x'
      deleteLink.addEventListener('click', event => {
        deleteNote(text)
      })
      text.appendChild(deleteLink)
      console.log(notes[i])
    }
  })
function deleteNote (text) {
  request.delete(`https://notes-api.glitch.me/api/notes/${text.id}`)
    .auth('HankTest', 'password')
    .then(response => {
      document.getElementById(text.id).remove()
    })
}

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
        text.id = `${notes[i]._id}`
        text.classList.add('textBody')
        text.innerHTML = `<h3 class="note-title">${notes[i].title}</h3>
        <p>${notes[i].text}</p>`
        noteSection.appendChild(text)
        let deleteLink = el('a')
        deleteLink.href = '#'
        deleteLink.style.paddingLeft = '0.5rem'
        deleteLink.classList.add('text-danger')
        deleteLink.innerText = 'x'
        deleteLink.addEventListener('click', event => {
          deleteNote(text)
        })
        text.appendChild(deleteLink)
        console.log(notes[i])
      }
    })
}

function el (tag) {
  return document.createElement(tag)
}
function getId (id) {
  return document.getElementById(id)
}
