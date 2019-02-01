const model = require('../model/model')

const {
  Router
} = require('express')
const lighting = Router()

function response (err, data) {
  if (err) this.res.status(500).send({error: err.message, data: null})
  else this.res.send({error: null, data: data})
}

lighting.get('/', (req, res) => {
  model.get(-1, response.bind({res}))
})

lighting.get('/:id', (req, res) => {
  model.get(req.params.id, response.bind({res}))
})

lighting.post('/', (req, res) => {
  model.add(req.body.name, response.bind({res}))
})

lighting.put('/:id', (req, res) => {
  const lighting = {
    name: req.body.name,
    state: req.body.state,
    id: req.params.id
  }
  model.update(lighting, response.bind({res}))
})

lighting.delete('/:id', (req, res) => {
  const lighting = {
    id: req.params.id
  }
  model.delete(lighting, response.bind({res}))
})

module.exports = lighting
