const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
        //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log('Note title taken!')
    }
    //console.log(notes)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => {
            return note.title !== title
        })
        //console.log(newNotes);
    if (notes.length === newNotes.length) {
        console.log(chalk.red('Note not found'))
    } else {
        saveNotes(newNotes)
        console.log(chalk.green('Note ' + title + ' removed'));
    }

}

const listNotes = () => {
    console.log('Your notes');
    const notes = loadNotes()
    notes.forEach(element => console.log(element.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const existe = notes.find((note) => note.title === title)
    if (existe) {
        return existe
    } else {
        console.log('Note not found');
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    //loadNotes: loadNotes,
    listNotes: listNotes,
    readNote: readNote
}