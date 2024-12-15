const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAWQIy7BtiWMlHJIpmYf-RbaJyA2vQDMdw");

/**
 * Sugere maneiras de economizar com base nos gastos.
 * @param {Array} expenses - Array de objetos contendo as descrições e valores dos gastos.
 * @returns {Promise<string>} - Sugestões geradas pela API Gemini.
 */
async function suggestSavings(expenses) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Formata os dados de gastos para o prompt
  const formattedExpenses = expenses
    .map(
      (exp) =>
        `Categoria: ${exp.category}, Descrição: ${exp.desc}, Valor: ${exp.amount}`
    )
    .join("\n");

  const prompt = `
    Você é uma ferramenta de análise financeira. Com base nos gastos fornecidos, sua tarefa é:
    
    1. Analisar os dados das transações financeiras para identificar áreas de economia.
    2. Avaliar se os valores registrados em cada categoria são altos ou baixos, com uma explicação baseada no campo "descrição" fornecido.
    3. Sugerir até 2 ações práticas para economizar em cada categoria, considerando a descrição e o valor.
    
    Aqui estão os dados de gastos:
    ${formattedExpenses}
    
    Estruture a resposta da seguinte forma:
    
    1. Categoria: [nome da categoria]
       - Análise: [curta avaliação do valor registrado, mencionando a descrição].
       - Recomendações:
         - [Ação 1].
         - [Ação 2].
    
    Não use formatação especial como asteriscos ou listas Markdown. Mantenha o texto claro e organizado.
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Remove formatação indesejada
    text = text.replace(/\*\*/g, ""); // Remove asteriscos
    return text;
  } catch (error) {
    console.error("Erro ao gerar sugestões:", error);
    return "Não foi possível gerar sugestões no momento.";
  }
}

module.exports = { suggestSavings };
