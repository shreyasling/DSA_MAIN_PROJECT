import express from "express";
import { getAllData, getPercentageInfo } from "../Controller/datacontroller.js";

const router=express.Router();

router.get('/getpercentages',getPercentageInfo)
router.get('/getalldata',getAllData)



export default router;
