const router = require('express').Router();
const student = require('../db/models/student')

router.get('/', async (req, res, next) => {
  try {
    const allStu = await student.findAll();
    res.json(allStu)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneStu = await student.findByPk(req.params.id);
    if (!oneStu) {
      res.status(404).send('Student not found')
    } else {
      res.json(oneStu)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newStu = await student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    res.status(201).json(newStu)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await student.update(
      req.body,
      {
      where: {
        id: req.params.id
      }
    })
    res.json(await student.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  await student.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(204).json(await student.findByPk(req.params.id))
})

module.exports = router;
