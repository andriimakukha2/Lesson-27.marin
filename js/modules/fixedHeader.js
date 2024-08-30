function fixedHeader (headerSelector, anchorSelector) {
  const header = document.querySelector(headerSelector)
  const header_anchor = document.querySelector(anchorSelector)

  if(header && header_anchor) {
    window.addEventListener('scroll', (e) => {
      const anchorViewportOffset = header_anchor.getBoundingClientRect().top
      if(anchorViewportOffset <= 0 && !header.classList.contains('header--fixed')) {
        header.classList.add('header--fixed')
      } else if(anchorViewportOffset > 0 && header.classList.contains('header--fixed')) {
        header.classList.remove('header--fixed')
      }
    })
  } else {
    console.error('header or header anchor element is not defined')
  }
}

export {fixedHeader}