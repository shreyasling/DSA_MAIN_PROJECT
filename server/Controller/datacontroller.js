import questionsmodel from "../models/questionsmodel.js";
import categorymodel from "../models/categorymodel.js";

export const getPercentageInfo = async (req, res, next) => {
    try {
        const Total_Questions = await questionsmodel.countDocuments()
        const Questions_done = await questionsmodel.countDocuments({
            question_status: 'Done'
        })
        const Total_percentage=parseFloat(((Questions_done/Total_Questions)*100).toFixed(2))
        const Total_values = {
            Total_Questions:Total_Questions,
            Questions_done:Questions_done,
            Total_percentage:Total_percentage
        }
        const category_values = await getCategoryResponses();
        const revisitedQuestionsInfo = await getRevisitedQuestionInfo();
        res.status(200).json({
            Total_values,
            category_values,
            revisitedQuestionsInfo
        });
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
    
}

const getCategoryResponses = async () => {
    const categories = await categorymodel.find({});
    let categoryValues = {};

    for (const category of categories) {
        const categoryQuestions = category.questions.length;
        const categoryDone = await questionsmodel.countDocuments({
            question_status: 'Done',
            _id: { $in: category.questions }
        });
        const categoryPercentage=parseFloat(((categoryDone/categoryQuestions)*100).toFixed(2))
        const categoryValue = {
            categoryQuestions:categoryQuestions,
            categoryDone:categoryDone,
            categoryPercentage:categoryPercentage
        }
        categoryValues[category.category_name] = categoryValue;
    }

    return categoryValues;
};

const getRevisitedQuestionInfo = async () => {
    const visitedQuestions = await questionsmodel.countDocuments({
        question_status: 'Revisit',
        
    });
    return {
        Revisit_Questions: visitedQuestions
    };
};

export const getAllData  = async (req, res) => {
    try {
        const categories = await categorymodel.find().populate('questions');
        res.json(categories);
    } catch (err) {
        res.status(500).json({message:error.message});
    }
};