class Note {
    readonly id: string
    readonly text: string

    constructor(text: string, id: string = randomText()) {
      this.id = id
      this.text = text
    }

    setText(text: string): Note {
      return new Note(text, this.id)
    }
}

function randomText(): string {
  return Math.random().toString(36)
}

export default Note