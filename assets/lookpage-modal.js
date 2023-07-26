
const imgWrapper = document.querySelectorAll('[data-modal]')
const modal = document.getElementById('shoppable_modal');
const closeBtn = document.getElementsByClassName('shoppable-modal__close')[0];
const modalImgContainer = modal.querySelectorAll('[data-modal-img-container]')

imgWrapper.forEach((wrapper, index) => {
  wrapper.addEventListener('click', () => {
    modal.style.display = 'flex'
    modalImgContainer[index].style.display = 'block'
  });
});

const modalClose = () => {
  for (let img of modalImgContainer) {
    img.style.display = 'none'
  }
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e) => {
if(e.target == modal) {
    // modalClose()
    modal.style.display = 'none'
  }
})

// close the modal
closeBtn.addEventListener('click', modalClose)