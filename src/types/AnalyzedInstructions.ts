
export interface AnalyzedInstructions {
  name: string
  steps: AnalyzedInstructionsStep[]
}

export interface AnalyzedInstructionsStep {
  number: number,
  step: string
  ingredients: AnalyzedInstructionsIngredient[],
  equipment: [

  ]
}

export interface AnalyzedInstructionsIngredient {
  id: number,
  name: string
  localizedName: string
  image: string
}

export interface AnalyzedInstructionsEquipment {
  id: number,
  name: string,
  localizedName: string
  image: string
  temperature: {
    number: number,
    unit: string
  }
}
