import express from 'express'
import Specialite from '../models/Specialité.js'

const router = express.Router();

router.get('/all/:poleId', async (req, res) => {
	try {
		const specialites = await Specialite.find({ pole: req.params.poleId })

		res.status(200).send(specialites)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.get('/:id', async (req, res) => {
	try {
		const specialite = await Specialite.findById( req.params.id )
		res.status(200).send(specialite)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.post('/', async (req, res) => {
	const specialite = new Specialite({
		pole: req.body.poleId,
		name: req.body.specialite.name,
		honoraires: req.body.specialite.honoraires,
		nombre: req.body.specialite.nombre,
		surfPropreProf: req.body.specialite.surfPropreProf,
		surfCommuns: req.body.specialite.surfCommuns,
		surfPraticien: req.body.specialite.surfPraticien,
		coefSurfPraticienLoyer: req.body.specialite.coefSurfPraticienLoyer || 3.5,
		coefSurfPraticienAutresCharge: req.body.specialite.coefSurfPraticienAutresCharge || 3.5
	})
	console.log(specialite);
	try {
		const specialiteSaved = await specialite.save()
		res.status(200).send(specialiteSaved)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.put('/:id', async (req, res) => {
	try {
		const specialite = await Specialite.findById(req.params.id)
		specialite.pole = req.body.pole;
		specialite.name = req.body.name;
		specialite.honoraires = req.body.honoraires;
		specialite.nombre = req.body.nombre;
		specialite.surfPropreProf = req.body.surfPropreProf;
		specialite.surfCommuns = req.body.surfCommuns;
		specialite.surfPraticien = req.body.surfPraticien;
		specialite.coefSurfPraticienLoyer = req.body.coefSurfPraticienLoyer || 3.5,
		specialite.coefSurfPraticienAutresCharge = req.body.coefSurfPraticienAutresCharge || 3.5

		const updatedSpecialite = specialite.save();
		res.status(200).send(updatedSpecialite)
	} catch (error) {
		res.status(400).send(error)
	}
})

export default router;