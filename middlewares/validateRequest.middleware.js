import _ from "lodash";
import { ValidationError } from "../utils/customError.util.js";

export default (schema) => {
  return (req, res, next) => {
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) next(new ValidationError(error.details[0].message));
    }

    if (schema.params) {
      const { error } = schema.params.validate(req.params);
      if (error) next(new ValidationError(error));
    }

    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      if (error) next(new ValidationError(error));
    }
    next();
  };
};
