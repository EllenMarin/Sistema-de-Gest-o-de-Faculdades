const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('.tbody')
const sName = document.querySelector('#name')
const sDate = document.querySelector('#date')
const sSalary = document.querySelector('#salary')
const btnSave = document.querySelector('#btnSave')

let itens
let id

/*students*/
const modalStudents = document.querySelector('.modal-container-students')
const tbodyStudents = document.querySelector('.tbody-students')
const sNameS = document.querySelector('#nameS')
const sDateS = document.querySelector('#dateS')
const sNumberS = document.querySelector('#numberS')
const sScoreS = document.querySelector('#scoreS')
const btnSaveStudents = document.querySelector('#btnSaveStudents')

let itensS
let idS




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
//student
function openModalStudents(edit = false, index = 0) {
  modalStudents.classList.add('active')

  modalStudents.onclick = e => {
    if (e.target.className.indexOf('modal-container-students') !== -1) {
      modalStudents.classList.remove('active')
    }
  }

  if (edit) {
    sNameS.value = itensS[index].name
    sDateS.value = itensS[index].date
    sNumberS.value = itensS[index].number
    sScoreS.value = itensS[index].score
    idS = index
  } else {
    sNameS.value = ''
    sDateS.value = ''
    sNumberS.value = ''
    sScoreS.value = ''
  }

}

function editItem(index) {

  openModal(true, index)

}
//student
function editItemStudents(index) {

  openModalStudents(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()

}
function deleteItemStudents(index) {
  itensS.splice(index, 1)
  setItensBDS()
  loadItensStudents()

}

function insertItem(item, index) {
  //teacher
  let tr = document.createElement('tr')

  tr.innerHTML = `
      <td>${item.name}</td>
      <td>${formatDate(item.date)}</td>
      <td>${item.salary}€</td>
      <td class="acao">
        <button onclick="editItem(${index})"><img src="img/bx-edit.png" alt=""></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><img src="img/bx-trash.png" alt=""></i></button>
      </td>
    `
  tbody.appendChild(tr)
}

function formatDate(date) {
  if (date) {
    if(!(date instanceof Date)){
      date = new Date(date);
    }
    return date.toLocaleDateString('pt-PT');
  }
  return '-';
}

//students
function insertItemStudents(item, index) {

  let trs = document.createElement('tr')

  trs.innerHTML = `
      <td>${item.name}</td>
      <td>${formatDate(item.date)}</td>
      <td>${item.number}</td>
      <td>${item.score}</td>
      <td class="acao">
        <button onclick="editItemStudents(${index})"><img src="img/bx-edit.png" alt=""></button>
      </td>
      <td class="acao">
        <button onclick="deleteItemStudents(${index})"><img src="img/bx-trash.png" alt=""></i></button>
      </td>
    `
  tbodyStudents.appendChild(trs)

}


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
    itens.push({ 'name': sName.value, 'date': sDate.value, 'salary': sSalary.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}
//Students
btnSaveStudents.onclick = e => {

  if (sNameS.value == '' || sDateS.value == '' || sNumberS.value == '' || sScoreS.value == '') {
    return
  }

  e.preventDefault();

  if (idS !== undefined) {
    itensS[idS].name = sNameS.value
    itensS[idS].date = sDateS.value
    itensS[idS].number = sNumberS.value
    itensS[idS].score = sScoreS.value
  } else {
    itensS.push({ 'name': sNameS.value, 'date': sDateS.value, 'number': sNumberS.value, 'score': sScoreS.value })
  }

  setItensBDS()

  modalStudents.classList.remove('active')
  loadItensStudents()
  idS = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''

  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

function loadItensStudents() {
  itensS = getItensBDS()
  tbodyStudents.innerHTML = ''

  itensS.forEach((itemS, index) => {
    insertItemStudents(itemS, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

//studnts
const getItensBDS = () => JSON.parse(localStorage.getItem('dbfunc_s')) ?? []
const setItensBDS = () => localStorage.setItem('dbfunc_s', JSON.stringify(itensS))

loadItens()
loadItensStudents()