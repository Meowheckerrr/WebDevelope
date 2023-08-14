
// ForEach Grab the Element 
    // titles = document.getElementsByClassName('title')

    // console.log(Array.isArray(titles)) // return False 
    // console.log(Array.isArray(Array.from(titles)))  //return True 

    // titlesArray = Array.from(titles)

    // titlesArray.forEach( title => {
    //    console.log(title) 
    // });


// Query Selector 

// const wrapper = document.querySelector('#wrapper')  //# -> Id 
// console.log(wrapper)


// const bookeNametextContent = document.querySelector('#book-list li:nth-child(4) span').textContent   // div id, element:第幾個.attribute 
// console.log(bookeNametextContent) //return only one Element 


// Change the element Context 
    // const bookNameElements = document.querySelectorAll('#book-list li span.name')
    // //console.log(bookNameElements)

    // Array.from(bookNameElements).forEach(function(book){
    //     console.log(book.textContent +=" (Author: MeowHacker)")
    // })

//display the element HTML

    // const bookDivElement= document.querySelector('#book-list')
    // console.log(bookDivElement.innerHTML)
    // bookDivElement.innerHTML="<h2>Meowhecker chaged this element!!</h2>"
    // bookDivElement.innerHTML+= 'malicious Codeee append on this'


// Show node information 

    // const banner = document.querySelector('#page-banner')

    // console.log('#page-banner node type is ',banner.nodeType)
    // console.log('#page-banner node name is ',banner.nodeName)
    // console.log('#page-banner hasChildNodes?',banner.hasChildNodes())

    // const bannerClone = banner.cloneNode(true) //true;travse all node data  
    // console.log(bannerClone)

//Travaseing the Node

    const bookListsNode = document.querySelector('#book-list')
    // console.log('the paranet node is ',bookListsNode.parentNode)
    // console.log('the paranet paranet node is ',bookListsNode.parentElement.parentElement)

    // console.log('booklist child Node:', bookListsNode.childNodes)

    // console.log('booklist children:', bookListsNode.children)

    //sibling 

    // console.log("book list  next sibling", bookListsNode.nextSibling)
    // console.log("book list next element sibling", bookListsNode.nextElementSibling)

    // console.log("book list privious sibling", bookListsNode.previousSibling)
    // console.log("book list privious element sibling", bookListsNode.previousElementSibling)

bookListsNode.previousElementSibling.querySelector('h1')


const h1 = bookListsNode.previousElementSibling.querySelector('h1')

h1.addEventListener('mouseover',(event)=>{
    h1.textContent = "Meowhecker Hack in"
    console.log(event.target)
})

// implement delete buttutn 

    // const delenteButtens = document.querySelectorAll('#book-list .delete')
    // // html collection 
    // Array.from(delenteButtens).forEach((delenteButten)=>{
    //     //console.log(delenteButten)
        
    //     // delete Event 
    //     delenteButten.addEventListener('click',(event)=>{
    //         const delenteButten = event.target
            
    //         // remove li  (par)
    //         const li = delenteButten.parentNode
    //         li.parentNode.removeChild(li)

    //     })

    // })

    // // Prvent User to navigation to admin pennel XD

    const adminLink = document.querySelector('#page-banner a')

    adminLink.addEventListener('click',(event)=>{
        event.preventDefault()
        console.log("navigation to ",event.target.textContent,'was prevented !!! 哈哈')
        event.target.innerHTML = "<p>navigation was prevented !!! 哈哈</p>"

    })

// listener (bubble)

const list = document.querySelector('#book-list ul')

list.addEventListener('click', (event)=>{
    if(event.target.className == "delete"){
        // remove li
        const li = event.target.parentNode
        list.removeChild(li)
    }
})

// Adding New book


    const addBookFrom = document.forms['add-book']

    addBookFrom.addEventListener('submit',(event)=>{
        event.preventDefault()

        //grab the input value

        var value = addBookFrom.querySelector('input[type="text"]').value
        console.log(value)

        const ul = document.querySelector('#book-list ul')

        const li = document.createElement('li')
        const spanName = document.createElement('span');
        spanName.textContent = value;
        spanName.classList.add('name');
        

        
        const spanDelete = document.createElement('span');
        spanDelete.textContent = 'delete';
        spanDelete.classList.add('delete');

        li.appendChild(spanName);
        li.appendChild(spanDelete);

        // 將新的書籍元素加入書籍列表中
        ul.appendChild(li);

        // 清空輸入框的值
        value = "";
    })


// Attribute 

    const bookListFrist = document.querySelector('li:first-child .name')
    const AttrValue = bookListFrist.getAttribute('class')
    console.log(AttrValue)

//chage value of Attribute

    // bookListFrist.setAttribute('class','meowhecker')
    // bookListFrist.hasAttribute('class')
    // bookListFrist.removeAttribute('class')

//Hide Books with Check Box 

    const hideBox = document.querySelector('#add-book #hide')


    hideBox.addEventListener('change', (event)=>{
        // check box be select
        if (hideBox.checked){
            list.style.display = 'none'
        }
        else{
            list.style.display = 'initial'
        }
    })

// filter books

const serachBar = document.forms['search-books'].querySelector('input')

//keyup 放開key board 
serachBar.addEventListener('keyup',(event)=>{
    
    const seachString = event.target.value.toLowerCase()
    const books = list.getElementsByTagName('li')

    Array.from(books).forEach((book)=>{
        const bookName = book.textContent.toLowerCase()

        //check 
        if (bookName.indexOf(seachString)!= -1 ){
            book.style.display="block" //Show
        }else{
            book.style.display="none"
        }
    })

})