
import { PromptTemplate} from "@langchain/core/prompts";

export const summarizerPrompt = new PromptTemplate({
  template: `Please summarize the research paper titled "{paper}" with the following specifications:
Explanation Style: {explain}
Explanation Length: {para}
1. Mathematical Details:
   - Include relevant mathematical equations if present in the paper.
   - Explain the mathematical concepts using simple, intuitive code snippets where applicable.
2. Analogies:
   - Use relatable analogies to simplify complex ideas.
If certain information is not available in the paper, respond with: "Insufficient information available" instead of guessing.
Ensure the summary is clear, accurate, and aligned with the provided style and length.`,
  inputVariables: ["paper", "explain", "para"],validateTemplate:true
});