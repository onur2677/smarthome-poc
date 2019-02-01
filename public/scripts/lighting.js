class Lighting {
  constructor (ws) {
    this.ws = ws
    this.ws.addListener(this.changeElement.bind(this))
    this.app = document.querySelector('#app')
    this.url = '/lightings/'
  }
  getLightings () {
    window.fetch(this.url)
      .then(response => response.json())
      .then(data => data.error ? window.alert('Fetch lighting error') : this.createList(data.data))
  }
  createList (data) {
    let innerHTML = ''
    for (let lighting of data) {
      innerHTML += this.createLightingHTML(lighting)
    }
    this.app.insertAdjacentHTML('beforeend', innerHTML)
    this.app.querySelectorAll('.lighting').forEach((element) => {
      element.onclick = () => {
        const id = element.dataset.id
        const isOpen = element.classList.contains('on')
        const message = {
          id,
          state: isOpen ? 0 : 1
        }
        this.updateElementState(message)
          .then((data) => {
            if (!data.error) {
              this.ws.send(message)
              this.changeClass(element, isOpen)
            } else {
              window.alert(data.error.message)
            }
          })
          .catch((error) => error ? window.alert('Lighting state change error') : '')
      }
    })
  }
  createLightingHTML (lighting) {
    let html = `<div class="lighting ${lighting.state === 1 ? 'on' : 'off'}" data-id="${lighting.id}">
                  <div class="lighting-icon"><i class="icon-bulb"></i></div>
                  <div class="lighting-name">${lighting.name}</div>
                </div>`
    return html
  }

  changeElement (message) {
    const lighting = this.app.querySelector(`.lighting[data-id="${message.id}"]`)
    this.changeClass(lighting, message.state !== 1)
  }

  changeClass (element, state) {
    if (state) {
      element.classList.remove('on')
      element.classList.add('off')
    } else {
      element.classList.remove('off')
      element.classList.add('on')
    }
  }

  updateElementState (message) {
    return window.fetch(this.url + message.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(response => response.json())
  }
}
Object.freeze(Lighting)
