const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      // Include the products associated
      include: [{
        model: Product
      }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    res.json(category);
  } catch (err) {
    req.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    // Create Category with name given in body
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json('{"message": "Error adding category"}');
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // Update the name based on the id in the route params
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
      );
      res.status(200).json(updateCategory);
    } catch (err) {
      res.status(500).json('{"message": "Error updating category"}');
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json('{"message": "Error deleting category"}');
  }
});

module.exports = router;
