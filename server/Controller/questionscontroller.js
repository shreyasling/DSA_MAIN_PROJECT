import mongoose from "mongoose";
import categorymodel from "../models/categorymodel.js";
import questionsmodel from "../models/questionsmodel.js";

const isValidID = _id => (mongoose.Types.ObjectId.isValid(_id));

const isValidQuestion = (question) =>
{
    if(!question.question_name||question.question_difficulty)
        return true;
    else
        return false;
}
export const addQuestion = async (req, res) => {
    try {
        const { cid } = req.params;
        if (!isValidID(cid))
            return res.status(404).send("Category not found");

        let category = await categorymodel.findById(cid);

        const questionsData = req.body;

        if (!Array.isArray(questionsData) || questionsData.length === 0) {
            return res.status(400).send("Invalid input format");
        }

        const invalidQuestions = questionsData.filter(question => !isValidQuestion(question));

        if (invalidQuestions.length > 0) {
            return res.status(400).json({ message: "Invalid question data", invalidQuestions });
        }

        const newQuestions = [];
        for (const questionData of questionsData) {
            try {
                const existingQuestion = await questionsmodel.findOne({ question_name: questionData.question_name });
                if (existingQuestion) {
                    category.questions.push(existingQuestion);
                } else {
                    const newQuestion = await questionsmodel.create(questionData);
                    category.questions.push(newQuestion);
                    newQuestions.push(newQuestion);
                }
            } catch (err) {
                console.error("Error creating question:", err);
            }
        }

        await category.save()

        res.status(200).json({ newQuestions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




export const getAllQuestions = async(req,res) =>
{
    try
    {
        const questions = await questionsmodel.find();
        res.status(200).json({questions});
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}

export const getQuestionById = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!isValidID(_id)) {
            return res.status(404).send("Question doesn't exist");
        }
        const question = await questionsmodel.findById(_id);
        res.status(200).json({ question });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateQuestion = async(req,res) =>
{
    try
    {
        const {_id} = req.params;
        if(!isValidID(_id))
        {
            return res.status(400).send("Question does not exist");
        }

        const updatedQuestion = await questionsmodel.findByIdAndUpdate(_id, req.body, {new: true})
        res.status(200).json({updatedQuestion})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}

export const deleteQuestion = async (req, res) => {
    const { id, cid } = req.params;
    if (!isValidID(cid)) {
        return res.status(400).send("Invalid Category ID");
    }
    try {
        const category = await categorymodel.findById(cid);
        const question = await questionsmodel.findByIdAndDelete(id);
        if (!question) {
            return res.status(400).send("No Question is found with this ID");
        }
        const indexToRemove = category.questions.indexOf(id);
        if (indexToRemove !== -1) {
            category.questions.splice(indexToRemove, 1);
        }
        await category.save();
        res.status(200).json({ message: "Successfully Question deleted" });
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }

}