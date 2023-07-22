'use strict'

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const buttonCloseModal = document.querySelector('.closeModal')
const buttonOpenModal = document.querySelector('.open-Modal')

const openModal = function () {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}
buttonOpenModal.addEventListener('click', openModal)
buttonCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (k) {
  if (k.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})
console.log('results!')
if (document.querySelector('.results')) {
  console.log('Results are ltrue!')
}
function stop () {
  document.querySelector('.loading').classList.add('hidden')
}
