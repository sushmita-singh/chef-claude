import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const [loading, setLoading] = useState(false); // Add loading state


    // Function to handle form submission
    function addToIngredidentList(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients((prevIngredients) => (
            [...prevIngredients, newIngredient]
        ))
    }

    async function getRecipe() {
        setLoading(true); // Set loading to true when API call starts
        try {
            const response = await fetch("/.netlify/functions/getRecipe", {
                method: "POST",
                body: JSON.stringify({ ingredientsArr: ingredients }),
              });
              const data = await response.json();
              setRecipe(data.recipe);              
        } catch (error) {
            console.error("Error fetching recipe:", error);
        } finally {
            setLoading(false); // Set loading to false when API call finishes
        }
    }

    // Render the form
    return(
        <main className="form-container">
            <form className="form" action={addToIngredidentList}>
                <input 
                    type="text" 
                    className="form-input" 
                    name="ingredient" 
                    placeholder="e.g. oregano" 
                    aria-label="Enter ingredient here" 
                />
                <button className="form-button">Add ingredient</button>
            </form>
            {
                ingredients.length > 0 && 
                <IngredientsList 
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    loading={loading}
                />
            }

            {
                recipe && 
                <ClaudeRecipe recipe = {recipe}/>
            }

        </main>
    )
}