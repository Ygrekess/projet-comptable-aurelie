import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { registerValidation, loginValidation } from '../utils/validation.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { isAuth } from '../utils/authentification.js';

dotenv.config();

const router = express.Router()

router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	//checking if user already in db
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist) {
		return res.status(400).send('Cet adresse email a déjà été enregistrée.')
	}
	//Hash the password
    const salt = await bcrypt.genSaltSync(10)
	const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
	
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
		isAdmin: false
	})
	try {
		const savedUser = await user.save();
		res.status(200).send(savedUser)
	} catch (error) {
		res.status(400).send(error)
	}
})

router.post('/login', async (req, res) => {
	console.log(req.body)
	const { error } = loginValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
    //Checking if email is already in DB
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email ou mot de passe incorrect.')
	}
	//Checking password
    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Mot de passe invalide.');
	}
	//Create and assign a token
	const token = jwt.sign({ _id: user._id, name: user.name, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET)
	res.header('auth-token', token)
	.status(200)
	.send({
		_id: user._id,
		name: user.name,
		email: user.email,
		token: token
	})
})

router.get('/gettest', isAuth, async (req, res) => {
	console.log(req)
	res.status(200).send(req.user)
})

export default router;