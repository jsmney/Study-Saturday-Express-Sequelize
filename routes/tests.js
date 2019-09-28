const router = require('express').Router();
const test = require('../db/models/test')

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allTest = await test.findAll();
    res.json(allTest)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const oneTest = await test.findByPk(req.params.id);
    res.json(oneTest)
  } catch (err) {
    next(err)
  }
})

router.post('/student/:id', async (req, res, next) => {
  try {
    const newTest = await test.create({
      subject: req.body.subject,
      grade: req.body.grade,
      studentId: req.params.id
    });
    res.status(201).json(newTest)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  await test.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(204).json(await test.findByPk(req.params.id))
})
