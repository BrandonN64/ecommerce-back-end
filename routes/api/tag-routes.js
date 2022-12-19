const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll(
      {
        include: [
          {
            model: Product,
            as: 'products'
          }
        ]
      }
    );
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // Use the route param id to find a specific tag
    const tag = await Tag.findByPk(req.params.id,
      {
        include: [
          {
            model: Product,
            as: 'products'
          }
        ]
      }
    );
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.json(newTag);
  } catch (err) {
    res.status(500).json('{"message": "Error adding tag"}');
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(
      {
      tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(tagUpdate);
  } catch (err) {
    res.status(500).json('{"message": "Error updating tag"}');
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.json(deleteTag);
  } catch (err) {
    res.status(500).json('{"message": "Error deleting tag"}');
  }
});

module.exports = router;
