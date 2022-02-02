const fs = require("fs");
const util = require("util");
const uuid = require('./helpers/uuid');

const writeToFile = util.promisify(fs.writeFile);
const readFromFile = util.promisify(fs.readFile);

class DB {
  read() {
    return readFromFile("db/db.json", "utf-8");
  }

  write(notes) {
    return writeToFile("db/db.json", JSON.stringify(notes));
  }

  readNotes(){
      return this.read().then((notes)=>{
          let allNotes;
          try{
                allNotes =[].concat(JSON.parse(notes))
          }catch(err){
            allNotes = []
          }
          return allNotes
      })
  }

  writeNotes(data){
    const { title, text } = data;


        const newNote = {
          title,
          text,
          review_id: uuid(),
        }; 

        return this.readNotes().then((notes)=>[...notes, newNote]).then((updated)=> this.write(updated))
  }
}

module.exports = new DB();
