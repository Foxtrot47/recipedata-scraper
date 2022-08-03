class Recipe {
  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.rating = 0.0;
    this.difficulty = "";
    this.ingredients = [];
    this.instructions = [];
    this.nutrition = {
      calories: 0,
      nutrients: [],
    };
    this.tags = [];
    this.time = {
      prep: "",
      cook: "",
      active: "",
      inactive: "",
      ready: "",
      total: "",
    };
    this.servings = "";
    this.image = "";
  }
}

module.exports = Recipe;
