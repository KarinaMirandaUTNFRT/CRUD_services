import { Router } from "express";

const router = Router();
router.route('/test').get((req, res) => {
  res.json("hasta Luego");
});
export default router;
