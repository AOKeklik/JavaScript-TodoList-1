
// GELEN VERILER
const   cardOne = document.querySelectorAll('.card-body')[0],
        cardTwo = document.querySelectorAll('.card-body')[1],
        form    = document.querySelector('#todo-form'),
        txtGir  = document.querySelector('#todo'),
        txtAra  = document.querySelector('#filter'),
        btnSil  = document.querySelector('#clear-todos'),
        ulTodo  = document.querySelector('.list-group');
// addeventListener LARI CALISTIR
    eventListeners();

    function eventListeners()
    {
        form.addEventListener('submit',addTodo);
        document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
        cardTwo.addEventListener('click',deleteTodo);
        txtAra.addEventListener('keyup',filterTodos);
        btnSil.addEventListener('click',clearAllTodos)
    }
// todo LAR UZERINDE FILTRELEME ARAMA
    function filterTodos(event)
    {
        const   filterValu = event.target.value.toLowerCase(),
                listItems  = document.querySelectorAll('.list-group-item');

        listItems.forEach(function(value){
            const txt = value.textContent.toLowerCase();
            if(txt.indexOf(filterValu) === -1)
            {
                value.setAttribute('style','display : none !important');
            }else
            {
                value.setAttribute('style','display : block');
            }
        });

    }
// TUM todo LARI SIL
    function clearAllTodos(event)
    {
        if(confirm('Tumunu Silmek Istediginizden Eminmisiniz?'))
        {
            while(ulTodo.firstElementChild != null)
            {
                ulTodo.removeChild(ulTodo.firstElementChild);
            }
            localStorage.removeItem('todos');
        }
    }
// todo SIL
    function deleteTodo(event)
    {
        if(event.target.className === 'fa fa-remove')
        {
            event.target.parentElement.parentElement.remove();
            deleteFromStorage(event.target.parentElement.parentElement.textContent);
            showAlert('success','Todo Basariyla Silindi...');
        }
    }
// todo LARI storage DEN SIL
    function deleteFromStorage(deletetodo)
    {
        let todos = getTodosFromStorage();

        todos.forEach((value,index) =>{
            if(value === deletetodo)
            {
                todos.splice(index,1);
            }
        });
        localStorage.setItem('todos',JSON.stringify(todos));
    }
// todo EKLE
    function addTodo(event)
    {
        const newTodo = txtGir.value.trim();

        if(newTodo === '')
        {
            showAlert('danger','Lutfen Bir Todo Giriniz..');
        }else 
        {
            addTodoToUI(newTodo);
            addTodoToStorage(newTodo); 
            showAlert('success','Girilen Todo Basariyla Eklendi..');
        }

        event.preventDefault();
    }
// TUM todo LARIN ARAYUZDE DONDURULMESI
    function loadAllTodosToUI()
    {
        let todos = getTodosFromStorage();

        todos.forEach(todo => {
            addTodoToUI(todo);
        });
    }
// YENI todo NUN ARAYUZE EKLENMESI
    function addTodoToUI(newTodo)
    {
        const   listItem  = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between';
        const   link      = document.createElement('a');
                link.href = '#';
                link.className = 'delete-item';
                link.innerHTML = '<i class = "fa fa-remove"></i>';
        
                ulTodo.appendChild(listItem);
                listItem.appendChild(document.createTextNode(newTodo));
                listItem.appendChild(link);

                txtGir.value = '';
    }
// YENI todo YU storage E EKLENMESI
    function addTodoToStorage(newTodo)
    {
        let todos = getTodosFromStorage();
            todos.push(newTodo);

        localStorage.setItem('todos',JSON.stringify(todos));
    }
// storage DEKI TUM TODOLARI CAGIRMA
    function getTodosFromStorage()
    {
        let todos;

        if(localStorage.getItem('todos') === null)
        {
            todos = [];
        }else
        {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        return todos;
    }
// UYARI MESAJI
    function showAlert(type,message)
    {
        const   alert = document.createElement('div');
                alert.className   = `alert alert-${type}`;
                alert.textContent = message;
                cardOne.appendChild(alert);

        setTimeout(function(){
            alert.remove();
        },2000);
    }