const inputs = document.querySelectorAll('.inputs')
inputs.forEach(input => {
  input.addEventListener('input', ()=>{
    const label = document.querySelector(`.label-${input.classList[0]}`)
    if (input.value !== '') label.classList.add('not-empty')
    else label.classList.remove('not-empty')
  })
})