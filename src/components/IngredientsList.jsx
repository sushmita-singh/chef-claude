export default function IngredientsList(props) {
    const ingredientsList = props.ingredients.map((ingredient) => (
        <li key={ingredient} className="ingredient">
            {ingredient}
        </li>
    ))
    return (
        <section>     
            <h2 className='ingredients-title'>Ingredients on hand:</h2>
            <ul className="ingredients-list">
                {ingredientsList}
            </ul>

            {props.ingredients.length > 3 &&
            // Only show the accent container if there are more than 3 ingredients
                <div className="accent-container">
                    <span className="accent-primary-container">
                        <h3 className="accent-title">Ready for a recipe?</h3>
                        <p className="accent-text">Generate a recipe from your list of ingredients.</p>
                    </span>
                    <button 
                        className="accent-button" 
                        onClick={props.getRecipe} 
                        disabled={props.loading}
                    >
                        {props.loading ? <div className="spinner"></div> : "Get Recipe"}
                    </button>
                </div>
            }
        </section> 
    )
}