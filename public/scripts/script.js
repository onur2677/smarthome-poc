window.onload = () => {
  const ws = new Socket({
    onopen: function (event) {
      let lighting = new Lighting(ws)
      lighting.getLightings()
    },
    onclose: function (event) {
      console.log('WS Closed')
    },
    onerror: function (event) {
      console.log('WS Error')
    }
  })
}
