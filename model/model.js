const fs = require('fs')
const file = './model/data.json'

const initialData = [{
  'name': 'lighting 1',
  'id': 1,
  'state': 0
}, {
  'name': 'lighting 2',
  'id': 2,
  'state': 0
}, {
  'name': 'lighting 3',
  'id': 3,
  'state': 0
}, {
  'name': 'lighting 4',
  'id': 4,
  'state': 0
}, {
  'name': 'lighting 5',
  'id': 5,
  'state': 0
}, {
  'name': 'lighting 6',
  'id': 6,
  'state': 0
}, {
  'name': 'lighting 7',
  'id': 7,
  'state': 0
}, {
  'name': 'lighting 8',
  'id': 8,
  'state': 0
}, {
  'name': 'lighting 9',
  'id': 9,
  'state': 0
}, {
  'name': 'lighting 10',
  'id': 10,
  'state': 0
}, {
  'name': 'lighting 11',
  'id': 11,
  'state': 0
}, {
  'name': 'lighting 12',
  'id': 12,
  'state': 0
}]

class Lighting {
  constructor () {
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFile(file, JSON.stringify(initialData), (err) => console.log(`Initial data ${err ? 'error' : 'writed'}`))
      }
    })
  }

  get (id, callback) {
    fs.readFile(file, (err, data) => {
      if (err) callback(err, data)
      else {
        const lightings = JSON.parse(data)
        if (id === -1) callback(null, lightings)
        else {
          const lighting = lightings.find(lighting => lighting.id === parseInt(id))
          if (lighting) callback(null, lighting)
          else callback(new Error(`Lighting ${id} Not Found`), null)
        }
      }
    })
  }

  add (name, callback) {
    this.get(-1, (err, data) => {
      if (err) callback(err, data)
      else {
        const id = data.length + 1
        const lighting = {
          name: name.trim() || `lighting ${id}`,
          id: id,
          state: 0
        }
        var lightings = [...data, lighting]
        fs.writeFile(file, JSON.stringify(lightings), (err) => {
          if (err) callback(err, null)
          else callback(null, lightings)
        })
      }
    })
  }

  update (lighting, callback) {
    this.get(-1, (err, data) => {
      if (err) callback(err, data)
      else {
        const index = data.findIndex(item => item.id === parseInt(lighting.id))
        if (!data[index]) callback(new Error('Lighting undefined'), null)
        else {
          if (lighting.delete) {
            data.splice(index, 1)
          } else {
            if (lighting.name) data[index].name = lighting.name
            data[index].state = lighting.state
          }
          fs.writeFile(file, JSON.stringify(data), (err) => {
            if (err) callback(err, null)
            else callback(null, data)
          })
        }
      }
    })
  }

  delete (lighting, callback) {
    this.get(-1, (err, data) => {
      if (err) callback(err, data)
      else {
        lighting.delete = true
        this.update(lighting, callback)
      }
    })
  }
}

module.exports = new Lighting()
