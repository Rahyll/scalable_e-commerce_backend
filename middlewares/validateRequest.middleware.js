import _ from "lodash";

export default (schema) => {
  return (req, res, next) => {
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error)
        return res.status(400).json({
          status: 400,
          error: "Bad Request",
          message: error.details[0].message,
        });
    }

    if (schema.params) {
      const { error } = schema.params.validate(req.params);

      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: error,
      });
    }

    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: error,
      });
    }
    next();
  };
};
// console.error(error.details[0]);
// console.error(error.details[0]);
