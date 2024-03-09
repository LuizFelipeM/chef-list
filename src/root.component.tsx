import React, { useEffect, useState } from "react"
import _ from "lodash"
import { routes, api, getRouteParams } from "@Chef/utility"
import { Card } from "./components/Card"
import { RecipeWithInformation } from "./types/Recipe"

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
    <>
      {recipesLists.map((recipes, index) => (
        <div key={index} className="columns">
          {recipes.map(({ id, image, title, spoonacularScore, summary, dishTypes }) =>
            <div key={`${index}-${id}`} className="column is-3">
              <Card
                id={id}
                image={image}
                title={title}
                score={spoonacularScore / 100}
                summary={summary}
                tags={dishTypes.slice(0, 2)}
              />
            </div>
          )}
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
    </>
  )
}
