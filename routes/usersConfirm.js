const express = require("express");
const router = express.Router();

const User = require('../store/User');


router.get("/", async (req, res) => {
    try {
        let usersNotConf = await User.find({ groupConfirmation: false})
        if (!usersNotConf[0]){
            usersNotConf = [{
                name: "لا يوجد أي طلبات للتوثيق",
                group: '',
                email: "",
                mobileNumber: "0",
                groupConfirmation: null,
                id: 5
            }]}

        console.log("usersNotConf", usersNotConf)
        res.status(201).send(usersNotConf);

    } catch (error) {
        console.log(error.message)
    return res.status(404).send(error.message)
  }

});

router.post("/", async (req, res) => {
    console.log("req.params.id", req.query.id)
   
    try {
        let updateConfirm = await User.updateOne({ id: parseInt(req.query.id) }, { $set: { groupConfirmation: true }})
        res.status(201).send(updateConfirm)

    } catch (error) {
        console.log(error.message)
    return res.status(404).send(error.message)
  }
  

});

router.put("/", async (req, res) => {
    console.log("req.query.id", req.query.id)

      try {
        
        const confirmDelete = await User.updateOne(
            {id: req.query.id}, { $unset: {groupConfirmation: ""}})

        } catch (error) {
          console.log(error.message)
          return res.status(404).send(error.message)
        }
    });

module.exports = router;

