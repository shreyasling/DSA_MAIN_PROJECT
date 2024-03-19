import mongoose from "mongoose";
import categorymodel from "../models/categorymodel.js";
import questionsmodel from "../models/questionsmodel.js";
const isValidID = _id => (mongoose.Types.ObjectId.isValid(_id));

const isValidCategory = (category) =>
{
    if(!category.category_name)
        return false;
    else
        return true;
}


export const addcategory=async (req,res) =>{
    try {
        const categoriesData = req.body;

        if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
            return res.status(400).send("Invalid input format");
        }

        const invalidCategories = categoriesData.filter(category => !isValidCategory(category));
        if (invalidCategories.length > 0) {
            return res.status(400).json({ message: "Invalid category data", invalidCategories });
        }

        const newCategories = await categorymodel.create(categoriesData);

        res.status(201).json({ newCategories });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getallcategories=async (req,res)=>{
    try{
        const categories= await categorymodel.find()
        res.status(200).json(categories)
    }
    catch(err) {
        res.status(500).json(err)

    }
}

export const getbyid=async (req,res)=>{
    try{
        const {id}=req.params;
        
        const category=await categorymodel.findById(id)
        res.status(200).json(category);
    }
    catch(err){
        res.status(500).json(err);
    }
}

export const updatecategory=async(req,res)=>{
    try{
        const update=req.body;
        const {id}=req.params;
        if(isValidID(id)){
            const updatecategory=await categorymodel.findByIdAndUpdate(id,update,{new:true,runValidators: true})
            res.status(201).json(updatecategory)
        }
        
    }
    catch(err){
        res.status(500).json(err)
    }
}


export const DeleteCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await categorymodel.findOne({ _id: id });
        if (!category) {
            res.status(400).json('Category doesnoot exist')
        }
        const idsArray = category.questions;
        await questionsmodel.deleteMany({ _id: { $in: idsArray } });
        await category.deleteOne()
        res.status(200).json({ message: "Successfully Category deleted" })
    } catch (error) {
        res.status(500).json(error)
    }
}

