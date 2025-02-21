import { Router } from "express";
import mainController from "./controllers/mainController.js";

const router = Router();

router.get("/", mainController.renderHome);

router.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
}); 

export default router;