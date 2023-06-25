const mongoRepository = require("../database/mongoRepository");
const Category = require("../models/category");

const createCategoryList = async (list) => {
  try {
    let categoryList = [];
    for (const l of list) {
      const categoryProp = { category: l };
      const category = await mongoRepository.category.findOne(categoryProp);
      if (category) {
        categoryList.push(category);
      } else {
        const newCategoryObj = new Category({
          category: l,
        });
        const newCategory = await mongoRepository.category.add(newCategoryObj);
        categoryList.push(newCategory);
      }
    }
    return categoryList;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = createCategoryList;
