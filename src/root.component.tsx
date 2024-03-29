import React, { useEffect, useState } from "react"
import _ from "lodash"
import { routes, api, getRouteParams, state } from "@Chef/utility"
import { RecipeWithInformation } from "./types/Recipe"
import * as singleSpa from "single-spa"
import { Card } from "./components/Card"
import { Pagination } from "./components/Pagination"
import { SearchResponse } from "./types/SearchResponse"

export const Root: React.FC = (props) => {
  const recipesPerPage = 12

  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(21)
  const [recipesLists, setRecipesLists] = useState<RecipeWithInformation[]>([])

  useEffect(() => {
    fetchRecipes(currentPage - 1)
      .then(({ results, totalResults }) => {
        setLastPage(Math.ceil(totalResults / recipesPerPage) + 1)
        setRecipesLists(results)
      })
  }, [])

  useEffect(() => {
    if (currentPage !== 1)
      fetchRecipes(currentPage - 1)
        .then(({ results }) => {
          setRecipesLists(results)
        })
  }, [currentPage])


  const fetchRecipes = async (offset: number): Promise<SearchResponse> => {
    try {
      const { term } = getRouteParams(routes.SEARCH)
      return await api.recipes
        .search(term, offset, recipesPerPage, {
          addRecipeInformation: true,
          sort: "popularity",
          sortDirection: "desc"
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="fixed-grid has-1-cols-mobile has-4-cols-tablet">
        <div className="grid">
          {recipesLists.map((recipe, index) => {
            const { id, image, title, spoonacularScore, summary, dishTypes } = recipe
            return (
              <div key={`${index}-${id}`} className="cell">
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
      </div>
      <Pagination
        currentPage={currentPage}
        firstPage={1}
        lastPage={lastPage}
        onPageChange={setCurrentPage}
      />
    </>
  )
}

