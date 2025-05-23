const { HfInference } = require("@huggingface/inference");

exports.handler = async function (event) {
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

  const { ingredientsArr } = JSON.parse(event.body);

  if (!ingredientsArr || ingredientsArr.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No ingredients provided." }),
    };
  }

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: "You are an assistant that..." },
        { role: "user", content: `I have ${ingredientsString}. Give me a recipe.` },
      ],
      max_tokens: 1024,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: response.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API call failed.", error: err.message }),
    };
  }
};
