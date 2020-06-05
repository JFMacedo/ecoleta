//Seleção de estados e cidades
function populateUFs() {
  const ufSelect = document.querySelector('select[name=state]')
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states => {
      states.sort((state1, state2) => {
        return state1.nome > state2.nome ? 1 : state1.nome < state2.nome ? -1 : 0
      })
      for(state of states)
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    })
}

populateUFs()

document
  .querySelector('select[name=state]')
  .addEventListener('change', getCities)

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')
  const ufId = event.target.value
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`
  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true
  fetch(url)
    .then(res => res.json())
    .then(cities => {
      cities.sort((city1, city2) => {
        return city1.nome > city2.nome ? 1 : city1.nome < city2.nome ? -1 : 0
      })
      for(city of cities)
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      citySelect.disabled = false
    })
}

//Itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')

for(const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')
let selectedItems = []

function handleSelectedItem(event) {
  const liItem = event.target
  const itemId = event.target.dataset.id
  liItem.classList.toggle('selected')
  const alreadySelected = selectedItems.findIndex(item => item === itemId)
  if(alreadySelected != -1) {
    const filteredItems = selectedItems.filter(item => {
      const differentItem = item != itemId
      return differentItem
    })
    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  }
  collectedItems.value = selectedItems
}