class Recipe {
  constructor() {
    this.name = "";
    this.description = "";
    this.rating = 0.0;
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
