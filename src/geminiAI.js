const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAWQIy7BtiWMlHJIpmYf-RbaJyA2vQDMdw");

/**
 * Sugere maneiras de economizar com base nos gastos.
 * @param {Array} expenses - Array de objetos contendo as descrições e valores dos gastos.
 * @returns {Promise<string>} - Sugestões geradas pela API Gemini.
 */
async function suggestSavings(expenses) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const formattedExpenses = expenses
    .map(
      (exp) =>
        `Categoria: ${exp.category}, Descrição: ${exp.desc}, Valor: ${exp.amount}`
    )
    .join("\n");

  const prompt = `
  Você é uma ferramenta de análise financeira avançada, especializada em ajudar as pessoas a economizar de forma prática e eficiente. Sua tarefa é analisar os gastos fornecidos e gerar análises detalhadas e recomendações altamente personalizadas.

  ### Instruções para a análise:
  1. Avalie cada categoria com base nos valores e na descrição fornecidos, destacando se o valor gasto está acima, dentro, ou abaixo do esperado.
  2. Explique por que o valor pode ser considerado alto, moderado ou baixo, levando em conta o contexto da categoria e a descrição do gasto.
  3. Considere o impacto do gasto no orçamento geral e mencione isso na análise.
  4. Evite generalizações e busque trazer explicações práticas e relacionadas ao gasto específico.

  ### Instruções para recomendações:
  1. Ofereça até 3 recomendações práticas e viáveis para cada categoria.
  2. Foque em ações específicas e criativas que o usuário possa implementar, considerando o contexto fornecido (exemplo: substituições, otimizações, mudanças de comportamento).
  3. Priorize sugestões que ajudem a economizar de forma sustentável, sem sacrificar qualidade de vida sempre que possível.

    Retorne os resultados exclusivamente no formato JSON válido (sem explicações ou texto adicional). Exemplo de formato esperado:

    [
      {
        "categoria": "Categoria",
        "analise": "Curta avaliação do valor registrado, mencionando a descrição, incluindo o valor gasto (por exemplo: R$ 200.00) e análise detalhada sobre o gasto, incluindo impacto no orçamento geral.",
        "recomendacoes": [Lista de recomendações práticas (exemplo: Ação 1, Ação 2)]
      }
    ]

    Aqui estão os dados de gastos:
    ${formattedExpenses}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Tratamento adicional para limpar a resposta
    const sanitizedText = text.replace(/```json|```/g, "").trim(); // Remove formatações de bloco Markdown
    const parsedResult = JSON.parse(sanitizedText); // Tenta converter para JSON

    return parsedResult; // Retorna o JSON estruturado
  } catch (error) {
    console.error("Erro ao gerar sugestões:", error);
    return []; // Retorna array vazio em caso de erro
  }
}

module.exports = { suggestSavings };
