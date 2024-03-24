import React, { useEffect, useState } from "react"
import _ from "lodash"
import { routes, api, getRouteParams, state } from "@Chef/utility"
import { RecipeWithInformation } from "./types/Recipe"
import * as singleSpa from "single-spa"
import { Card } from "./components/Card"
import { Pagination } from "./components/Pagination"

export const Root: React.FC = (props) => {
  const recipesPerPage = 12

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPages, setMaxPages] = useState(21)
  const [recipesLists, setRecipesLists] = useState<RecipeWithInformation[][]>([])

  useEffect(() => {
    fetchRecipes(currentPage - 1)
  }, [currentPage])


  const fetchRecipes = async (offset: number) => {
    try {
      const { term } = getRouteParams(routes.SEARCH)
      const { results, totalResults } = await api.recipes
        .search(term, offset, recipesPerPage, {
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

      setMaxPages(Math.ceil(totalResults / recipesPerPage))
      setRecipesLists(recipes)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
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
      <Pagination
        currentPage={currentPage}
        firstPage={1}
        lastPage={maxPages}
        onPageChange={setCurrentPage}
      />
    </>
  )
}

