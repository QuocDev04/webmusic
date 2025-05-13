
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import connectCloudinary from "./config/clodinary";
import songRouter from "./routes/songRoutes";
import connectDB from "./config/mongodb";
import albumRouter from "./routes/albumRouter";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
connectCloudinary();
connectDB();
//monggo
//router
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)


export const viteNodeApp = app;