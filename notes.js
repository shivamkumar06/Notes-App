const fs = require('fs')
const chalk = require('chalk')


const addNotes = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title )

if(!duplicateNote){
    notes.push({
        title : title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New notes added'))
} else{
    console.log(chalk.red.inverse("Note title taken"))
}
}

const removeNote = (title) => {
    const notes = loadNotes()
    const availableNotes = notes.filter((note) => note.title !== title )

    
    if(availableNotes.length < notes.length){
        console.log(chalk.green.inverse("Notes removed"))
        saveNotes(availableNotes)
    }else{
        console.log(chalk.red.inverse("No Note found"))
        
    }
}

const saveNotes = (notes) => { 
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes  = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e){
        return []
    }
    
}




const listNotes = () => {
const notes = loadNotes()


console.log(chalk.inverse('Your Notes'))
notes.forEach((note) => {
    console.log(note.title)
})
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else{
        console.log(chalk.red.inverse("Note not found"))
    }
}



module.exports ={
    addNotes : addNotes,
    removeNote: removeNote,
    listNotes : listNotes,
    readNotes : readNotes
}