const express = require('express');
const router = express.Router();

router.use( (req, res) => {
	console.log(res.status)
	res.status(404).send('Rota inválida. Favor consultar a documentação https://documenter.getpostman.com/view/9467330/SWECVaMU?version=latest')
})

module.exports = router
