"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class AllRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "allrecipes.com/recipe");
  }

  newScrape($) {
    this.recipe.name = this.recipe.name.replace(/\s\s+/g, "");
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.description = $(
      ".recipe-summary.elementFont__dek--within > p"
    ).text();
    this.recipe.rating = parseFloat($(".recipe-reviews-decimal-avg").text());
    $(".recipe-meta-item").each((i, el) => {
      const title = $(el)
        .children(".recipe-meta-item-header")
        .text()
        .replace(/\s*:|\s+(?=\s*)/g, "");
      const value = $(el)
        .children(".recipe-meta-item-body")
        .text()
        .replace(/\s\s+/g, "");
      switch (title) {
        case "prep":
          time.prep = value;
          break;
        case "cook":
          time.cook = value;
          break;
        case "total":
          time.total = value;
          break;
        case "additional":
          time.inactive = value;
          break;
        case "Servings":
          this.recipe.servings = value.replace(/\n/g, " ").trim();
          break;
        default:
          break;
      }
    });

    $(".ingredients-item").each((i, el) => {
      const ingredient = $(el).text().replace(/\s\s+/g, " ").trim();
      ingredients.push(ingredient);
    });

    $($(".instructions-section-item").find("p")).each((i, el) => {
      const instruction = $(el).text();
      instructions.push(instruction);
    });
    this.recipe.nutrition.calories = parseInt(
      $(".nutrition-top")
        .text()
        .match(/\d+?\.?\d+/)[0]
    );
    $(".nutrition-row").each((i, el) => {
      if (this.recipe.nutrition.nutrients.length > 7) return;
      const nutrient = {};
      nutrient.name = $(el)
        .find("span.nutrient-name > span.elementFont__details--bold")
        .text();
      nutrient.amount = $(el)
        .find("span.nutrient-name > span.nutrient-value")
        .text();
      nutrient.amountDaily = $(el).find("span.daily-value").text();
      this.recipe.nutrition.nutrients.push(nutrient);
    });
  }

  oldScrape($) {
    this.defaultSetDescription($);
    const { ingredients, instructions, time } = this.recipe;
    $("#polaris-app label").each((i, el) => {
      const item = $(el).text().replace(/\s\s+/g, "");
      if (item !== "Add all ingredients to list" && item !== "") {
        ingredients.push(item);
      }
    });

    $(".step").each((i, el) => {
      const step = $(el).text().replace(/\s\s+/g, "");
      if (step !== "") {
        instructions.push(step);
      }
    });
    time.prep = $("time[itemprop=prepTime]").text();
    time.cook = $("time[itemprop=cookTime]").text();
    time.ready = $("time[itemprop=totalTime]").text();
    this.recipe.servings = $("#metaRecipeServings")
      .attr("content")
      .replace(/\n/g, " ")
      .trim();
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    if ((this.recipe.name = $(".intro").text())) {
      this.newScrape($);
    } else if ((this.recipe.name = $("#recipe-main-content").text())) {
      this.oldScrape($);
    }
  }
}

module.exports = AllRecipesScraper;
