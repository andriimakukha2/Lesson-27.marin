function dropDown(selector) {
  const list = document.querySelector(selector);

  list.addEventListener('click', function(e) {
    const dropdownItem = e.target.closest('[data-dropdown-item]')
    if(e.target.classList.contains('faq__label')) {
      const contentHeight  = dropdownItem.querySelector('[data-dropdown-content]').offsetHeight
      this.querySelectorAll('[data-dropdown-wrapper]').forEach(item => {
        console.log(item)
        item.style.height = 0;
      })
      const wrapper = dropdownItem.querySelector('[data-dropdown-wrapper]')
      if(wrapper.offsetHeight > 0) {
        wrapper.style.height = 0
      } else {
        wrapper.style.height = contentHeight + 'px'
      }
    }
  })
}

export {dropDown}