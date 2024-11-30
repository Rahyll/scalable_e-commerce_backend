import Joi from "joi";

export const addProductSchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Product name should be a string",
      "string.empty": "Product name cannot be empty",
      "any,required": "Product name is required",
    }),
    description: Joi.string().required().messages({
      "string.base": "Product description should be a string",
      "string.empty": "Product description cannot be empty",
      "any.required": "Product description is required",
    }),
    price: Joi.number().positive().required().messages({
      "number.base": "Product price should be a number",
      "number.positive": "Product price should be a positive number",
      "any.required": "Product price is required",
    }),
    tags: Joi.array().items(Joi.string().trim()).optional(),
    category: Joi.string().required().messages({
      "string.base": "Product Category should be a string",
      "string.empty": "Product category should not be empty",
      "any.required": "Product category is required",
    }),
    stockQuantity: Joi.number().min(0).required().messages({
      "string.base": "Product quantity should be a number",
      "string.min": "Product quantity must be zero or greater",
      "any.required": "Product Quantity is required",
    }),
    images: Joi.string().uri().optional().messages({
      "string.uri": "Image URL should be a valid URL",
    }),
  }),
};

export const getAllProductsSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page must be a number",
      "number.integer": "Page must be an integer",
      "number.min": "Page must be at least 1",
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
      "number.base": "Limit must be a number",
      "number.integer": "Limit must be an integer",
      "number.min": "Limit must be at least 1",
      "number.max": "Limit cannot exceed 100",
    }),
    sort: Joi.string()
      .valid("name", "price", "createdAt", "stockQuantity")
      .default("createdAt")
      .messages({
        "string.base": "Sort must be a string",
        "any.only":
          "Sort can only be one of name, price, createdAt, or stockQuantity",
      }),
    order: Joi.string().valid("asc", "desc").default("desc").messages({
      "string.base": "Order must be a string",
      "any.only": "Order can only be asc or desc",
    }),
    category: Joi.string().optional().messages({
      "string.base": "Category must be a string",
    }),
    minPrice: Joi.number().min(0).optional().messages({
      "number.base": "minPrice must be a number",
      "number.min": "minPrice must be 0 or greater",
    }),
    maxPrice: Joi.number()
      .min(0)
      .optional()
      .greater(Joi.ref("minPrice"))
      .messages({
        "number.base": "maxPrice must be a number",
        "number.min": "maxPrice must be 0 or greater",
        "number.greater": "maxPrice must be greater than minPrice",
      }),
    search: Joi.string().optional().messages({
      "string.base": "Search must be a string",
    }),
  }),
};

export const getProductByIdSchema = {
  params: Joi.object({
    productId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId validation
      .required()
      .messages({
        "string.base": "Product ID must be a string",
        "string.empty": "Product ID is required",
        "string.pattern.base": "Invalid Product ID format",
      }),
  }),
};
