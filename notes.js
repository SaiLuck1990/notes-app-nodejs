const fs = require('fs')
const log = console.log
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    //Not efficient since it will look into each array even after it finds a match 
    //const duplicateNotes = notes.filter((note) => note.title == title)
    const duplicateNote = notes.find((note) => note.title == title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
        log(chalk.green.inverse('New note is saved'))
    } else {
        log(chalk.red.inverse('Note already present'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title != title)

    log(notesToKeep.length)
    log(notes.length)

    if (notes.length > notesToKeep.length) {
        saveNote(notesToKeep)
        log(chalk.green.inverse('Note removed'))
    } else {
        log(chalk.red.inverse('Note not present'))
    }
}

const saveNote = (notes) => {
    const noteData = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteData)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const json = JSON.parse(dataBuffer)
        return json
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    log(chalk.inverse('Your notes'))
    notes.forEach(note => {
        log(chalk.magenta(note.title))
        log(chalk.magenta(note.body))
    });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        log(chalk.inverse(note.title))
        log(note.body)
    } else {
        log(chalk.red('No note found'))
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}