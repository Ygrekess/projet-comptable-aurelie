import express from "express";
import User from "../models/User.js";
import { isAuth } from "../utils/authentification.js";
import {
  updateValidation,
  updatePasswordValidation,
} from "../utils/validation.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/getInfos/:id", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send({ message: "Aucun utilisateur trouvé !" });
    }
  } catch (error) {
    res.status(400).send({ message: "Aucun utilisateur trouvé !" });
  }
});

router.put("/updateinfos", isAuth, async (req, res) => {
  console.log(req.body);
  const { error } = updateValidation(req.body.user);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await User.findById(req.body.user._id);
    if (user) {
      user.lastname = req.body.user.lastname;
      user.firstname = req.body.user.firstname;
      user.email = req.body.user.email;
      user.phone = req.body.user.phone;
      const updatedUser = await user.save();
      res.status(200).send({ message: "Votre profil a été mis à jour." });
    } else {
      res.status(400).send({ message: "Aucun utilisateur trouvé !" });
    }
  } catch (error) {
    res.status(400).send({ message: "Aucun utilisateur trouvé !" });
  }
});

router.put("/updatepassword", isAuth, async (req, res) => {
  console.log(req.body.password._id);
  if (req.body.password.newpassword1 !== req.body.password.newpassword2) {
    return res
      .status(400)
      .send("Merci de saisir deux nouveaux mots de passe identiques.");
  }
  const { error } = updatePasswordValidation(req.body.password);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Recup user profile
  try {
    const user = await User.findById(req.body.password._id);
    if (user) {
      console.log(user);
      //Checking password
      const validPassword = await bcrypt.compareSync(
        req.body.password.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).send("Mot de passe invalide.");
      }
      //Hash the password
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(
        req.body.password.newpassword2,
        salt
      );

      user.password = hashedPassword;
      const passwordUpdated = await user.save();
      return res.status(200).send("Votre mot de passe a été mis à jour.");
    }
  } catch (error) {
    return res.status(400).send("Utilisateur introuvable.");
  }
});

export default router;
