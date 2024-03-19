import express from "express";
import { addQuestion,deleteQuestion,getAllQuestions,getQuestionById, updateQuestion } from "../Controller/questionscontroller.js";



const router=express.Router();

router.post("/add/:cid",addQuestion)
router.get("/getAllQuestions",getAllQuestions)
router.get("/:_id",getQuestionById)
router.patch("/update/:_id",updateQuestion)
router.delete("/delete/:id/:cid",deleteQuestion)


export default router;