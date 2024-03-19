import React, { useEffect, useState } from "react"
import _ from "lodash"
import { routes, api, getRouteParams, state } from "@Chef/utility"
import { RecipeWithInformation } from "./types/Recipe"
import * as singleSpa from "single-spa"
import { Card } from "./components/Card"

export const Root: React.FC = (props) => {
  const [recipesLists, setRecipesLists] = useState<RecipeWithInformation[][]>([])

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const { term } = getRouteParams(routes.SEARCH)
      const { results } = await api.recipes
        .search(term, 0, 12, {
          addRecipeInformation: true,
          sort: "popularity",
          sortDirection: "desc"
        })
      const recipes = results.reduce((acc: RecipeWithInformation[][], curr: RecipeWithInformation) => {
        if (acc[acc.length - 1].length == 4) {
          return [...acc, [curr]]
        }

        acc[acc.length - 1].push(curr)
        return acc
      }, [[]])

      setRecipesLists(recipes)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      {recipesLists.map((recipes, index) => (
        <div key={index} className="columns">
          {recipes.map((recipe) => {
            const { id, image, title, spoonacularScore, summary, dishTypes } = recipe
            return (
              <div key={`${index}-${id}`} className="column is-3">
                <Card
                  image={image}
                  title={title}
                  stars={
                    new Array(5).fill(null).map((_, i, arr) => {
                      const score = spoonacularScore / 100;
                      return i + 1 < arr.length * score
                        ? "fa-solid fa-star"
                        : score % 1 >= 0.5
                          ? "fa-regular fa-star-half-stroke"
                          : "fa-regular fa-star";
                    })}
                  summary={summary}
                  tags={dishTypes.slice(0, 2)}
                  onClick={(e) => {
                    e.preventDefault()
                    state.next({ recipe })
                    singleSpa.navigateToUrl(routes.RECIPE.replace(":id", id))
                  }}
                />
              </div>)
          })}
        </div>
      ))}
      <nav className="pagination is-right" role="navigation" aria-label="pagination">
        <a className="pagination-previous">Previous</a>
        <a className="pagination-next">Next page</a>
        <ul className="pagination-list">
          <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
          <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
          <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
        </ul>
      </nav>
    </div>
  )
}
