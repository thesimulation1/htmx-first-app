const createEditFormTemplate = (book) => /*html*/`
  <form hx-put="/books/${book.id}" hx-target="closest li" hx-swap="outerHTML" onsubmit="return confirm('Do you want to submit?')">
    <input 
      name="title"
      placeholder="title" 
      type="text" 
      value="${book.title}" 
    />
    <input 
      name="author"
      placeholder="author" 
      type="text" 
      value="${book.author}" 
    />
    <input 
      name="year"
      placeholder="year" 
      type="text" 
      value="${book.year}" 
    />
    <input 
      name="price"
      placeholder="price" 
      type="text" 
      value="${book.price}" 
    />
    <input 
      name="pages"
      placeholder="pages" 
      type="text" 
      value="${book.pages}" 
    />
    <button>Confirm</button>
  </form>
`;

export default createEditFormTemplate;