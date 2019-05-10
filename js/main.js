{
  // Vars
  const overlay = document.querySelector('.overlay__bg')
  const animation = document.querySelector('.overlay__bg > span:nth-of-type(3)')
  const openOverlay = overlay.querySelector('.overlay__trigger')
  const closeOverlay = overlay.querySelector('.overlay__close')
  const sendBtn = overlay.querySelector('.button')
  const inputs = overlay.querySelectorAll('input')

  // Transition function
  const transition = function () {
    overlay.classList.add('transitionend')
  }

  // Email validation function
  function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  // Hover state for CTA
  openOverlay.addEventListener('mouseover', e => document.body.classList.add('hover'))
  openOverlay.addEventListener('mouseout', e => document.body.classList.remove('hover'))

  // Open overlay
  openOverlay.addEventListener('click', e => {
    overlay.classList.add('open')
    animation.addEventListener('transitionend', transition, true)

    // Clear inputs onload
    inputs.forEach(element => {
      element.value = ''
      element.parentElement.classList.remove('changed')
    })
  })

  // Close overlay
  closeOverlay.addEventListener('click', e => {
    animation.removeEventListener('transitionend', transition, true)
    overlay.classList.remove('open', 'transitionend')
    // overlay.classList.remove('transitionend')
  })

  // Input listener
  overlay.addEventListener('input', e => {
    // Check for email validation
    if (e.target.id === 'email' && emailIsValid(e.target.value)) {
      e.target.parentElement.classList.add('changed')

      // Check all other inputs for value change
    } else if (e.target.id !== 'email' && e.target.value !== '') {
      e.target.parentElement.classList.add('changed')

      // For empty inputs
    } else {
      e.target.parentElement.classList.remove('changed')
    }

    // Check if all inputs have been validated
    if (inputs.length + 1 === overlay.querySelectorAll('.changed').length) {
      overlay.classList.add('validated')
    } else {
      overlay.classList.remove('validated')
    }
  })

  // Send button actions
  sendBtn.addEventListener('click', e => {
    // Add sent class
    overlay.classList.add('sent')

    // Welcome message and close
    const welcome = document.querySelector('.overlay__content > div > span')
    welcome.addEventListener(
      'transitionend',
      e => {
        setTimeout(() => {
          animation.removeEventListener('transitionend', transition, true)
          overlay.classList.remove('open', 'transitionend', 'validated', 'sent')
        }, 1000)
      },
      true
    )
  })
}
