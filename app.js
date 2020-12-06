const notes = require('./notes.js')
const log = console.log
const yargs = require('yargs')


yargs.version('1.0.1')

// create add command with mandatory title 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of note',
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv) => {
        log(argv.title, argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command 
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

// Listing notes
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: () => {
        notes.listNotes()
    }
})

// Reading notes
yargs.command({
    command: 'read',
    describe: 'Reading a node',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNotes(argv.title)
    }
})

yargs.parse()

