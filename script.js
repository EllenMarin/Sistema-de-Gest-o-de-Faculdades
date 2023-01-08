const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('.tbody')
const sName = document.querySelector('#name')
const sDate = document.querySelector('#date')
const sSalary = document.querySelector('#salary')
const btnSave = document.querySelector('#btnSave')

/*const modalStudents = document.querySelector('.modal-container-students')
const tbodyStudents = document.querySelector('.tbody-students')
const sNameS = document.querySelector('#nameS')
const sDateS = document.querySelector('#dateS')
const sNumber = document.querySelector('#number')
const sScore = document.querySelector('#score')
/*const btnSaveStudents = document.querySelector('#btnSaveStudents')*/

let itens
let id

//teacher
function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sName.value = itens[index].name
      sDate.value = itens[index].date
      sSalary.value = itens[index].salary
      id = index
    } else {
      sName.value = ''
      sDate.value = ''
      sSalary.value = ''
    }
    
  }

  /*student
function openModalStudents(edit = false, index = 0) {
    modalStudents.classList.add('active')
  
    modalStudents.onclick = e => {
      if (e.target.className.indexOf('modal-container-students') !== -1) {
        modalStudents.classList.remove('active')
      }
    }
  
    if (edit) {
      sNameS.value = itens[index].nameS
      sDateS.value = itens[index].dateS
      sNumber.value = itens[index].number
      sScore.value = itens[index].score
      id = index
    } else {
      sNameS.value = ''
      sDateS.value = ''
      sNumber.value = ''
      sScore.value = ''
    }
    
  }*/
  
  function editItem(index) {
  
    openModal(true, index)
    /*openModalStudents(true, index)*/
  }
  
  function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }
 
  function insertItem(item, index) {
    //teacher
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.date}</td>
      <td>${item.salary}€</td>
      <td class="acao">
        <button onclick="editItem(${index})"><img src="img/bx-edit.png" alt=""></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><img src="img/bx-trash.png" alt=""></i></button>
      </td>
    `
    tbody.appendChild(tr)

    /*students
    let trs = document.createElement('trs')
    
    trs.innerHTML = `
      <td>${item.nameS}</td>
      <td>${item.dateS}</td>
      <td>${item.number}</td>
      <td>${item.score}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><img src="img/bx-edit.png" alt=""></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><img src="img/bx-trash.png" alt=""></i></button>
      </td>
    `
    tbodyStudents.appendChild(trs)*/
    
  }

  
  //continuar daqui (criar outro btnsave patra students)
  btnSave.onclick = e => {
    
    if (sName.value == '' || sDate.value == '' || sSalary.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].name = sName.value
      itens[id].date = sDate.value
      itens[id].salary = sSalary.value
    } else {
      itens.push({'name': sName.value, 'date': sDate.value, 'salary': sSalary.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
  /*btnStudents
  btnSaveStudents.onclick = e => {
    
    if (sNameS.value == '' || sDateS.value == '' || sNumber.value == '' || sScore.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].name = sNameS.value
      itens[id].date = sDateS.value
      itens[id].number = sNumber.value
      itens[id].score = sScore.value
    } else {
      itens.push({'name': sNameS.value, 'date': sDateS.value, 'number': sNumber.value, 'score': sScore.value})
    }
  
    setItensBD()
  
    modalStudents.classList.remove('active')
    loadItens()
    id = undefined
  }*/
  
  function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    /*tbodyStudents.innerHTML = ''*/
    
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
  
  }
  
  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
  const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
  
  loadItens()