import { Router, NextFunction, Response, Request } from "express";
import * as userController from "../../controllers/user/user";
import { body, validationResult } from "express-validator";
import User, { UserNameing } from "../../models/user";
import friendRequestRouter from "./friendRequest";
import friendsRouter from "./friends";
import passport from "passport";
const router = Router();

const authenticate = [passport.authenticate("jwt", { session: false })];
const authorize = [];
const validateUserData = [
  body(UserNameing.NAME)
    .trim()
    .escape()
    .exists()
    .withMessage("messing name")
    .isLength({ min: 3 })
    .withMessage("name must be bigger than 3 chars"),
  body(UserNameing.EMAIL)
    .exists()
    .withMessage("messing email")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject();
      }
    })
    .withMessage("used email")
    .escape(),
  body(UserNameing.PASSWORD).exists().withMessage("messing password"),
  body(UserNameing.BIRTHDAY).optional().escape(),
  body(UserNameing.PHOTO_URL).optional().isURL().escape(),
];

router.get("/", authenticate, userController.index);
router.post("/", validateUserData, validate, userController.create);
router.get("/:id", authenticate, userController.show);
router.put(
  "/:id",
  authenticate,
  validateUserData,
  authorizeOnlyUser,
  validate,
  userController.update
);
router.delete("/:id", authenticate, authorize, userController.destroy);

router.use("/", friendRequestRouter);
router.use("/", friendsRouter);

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(400).json({
    errors: extractedErrors,
  });
}

function authorizeOnlyUser(req, res: Response, next) {
  if (req.user._id.toString() !== req.params.id) {
    return res.sendStatus(401);
  }
  next();
}

export default router;
