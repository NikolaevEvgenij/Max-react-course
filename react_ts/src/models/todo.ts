class Todo {
   text: string;
   id: string;

   constructor(todoText: string) {
      this.text = todoText;
      this.id = Math.random().toFixed(6);
   }
}

export default Todo;
