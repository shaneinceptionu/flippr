import express from "express";
import {
    createFlipoff,
    findOneFlipoffByID,
    updateFlipoff,
    deleteFlipoff
} from "../models/flipoffModel.js";

const router = express.Router();

//
router.post("/", async(req, res) => {
    console.log("going to flip someone off", req.body);
    let flipoffObject = {
        flipoffMessage: req.body.flipoffMessage,
        upVotes: 0,
        downVotes: 0,
        reFlip: "",
        createdDate: Date.now()
    };
    try {
        const createdFlipoff = await createFlipoff(flipoffObject);
        res.send(createdFlipoff);
    } catch (error) {
    res.status(403).send({ message: error.message });
    }
});

router.get("/:id", async(req, res) => {
    console.log("going to get a specific flip off", req.params.id);
    const id = req.params.id;
    try {
        const getFlippedOff = await findOneFlipoffByID(id);
        res.send(getFlippedOff);
    } catch (error) {
    res.status(403).send({ message: error.message });
    }
});

router.put("/:id", async(req, res) => {
    console.log("going to update a specific flip off", req.params.id);
    const id = req.params.id;
    try {
        // Fetch the current Flip in order to handle updating upvotes
        //   The user request basically says "yes" I'd like to upvote/downvote
        //   This is done by setting upVote or downVote to true in the request body
        //   the math to update the total count is done below
        const getFlippedOff = await findOneFlipoffByID(id);
        const body = req.body;
        // Create the updated object
        const updatedFlipoffData = {
            flipoffMessage: (body.flipoffMessage) ? body.flipoffMessage : undefined,
            upVotes: (body.upVote) ? getFlippedOff.upVotes+1 : getFlippedOff.upVotes,
            downVotes: (body.downVote) ? getFlippedOff.downVotes+1 : getFlippedOff.downVotes,
            reFlip: (body.reFlip) ? body.reFlip : undefined
        }
        // Send the updated object to be updated
        const updateFlipOff = await updateFlipoff(id, updatedFlipoffData);
        res.send(updateFlipOff);
    } catch (error) {
        res.status(403).send({ message: error.message });
    }
});

router.delete("/:id", async(req, res) => {
    console.log("going to delete a specific flip off", req.params.id);
    const id = req.params.id;
    try {
        const deletedFlipOff = await deleteFlipoff(id);
        res.send(deletedFlipOff);
    } catch (error) {
        res.status(403).send({ message: error.message });
    }
});


export default router;