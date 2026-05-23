'use server';
/**
 * @fileOverview An AI consultant that interprets symptom descriptions and suggests
 * safe, traditional Ayurvedic home remedies and advice.
 *
 * - consultVaidyaAI - A function that handles the Ayurvedic consultation process.
 * - ConsultVaidyaAIInput - The input type for the consultVaidyaAI function.
 * - ConsultVaidyaAIOutput - The return type for the consultVaidyaAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConsultVaidyaAIInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A natural language description of the user\'s symptoms in Hindi or English.'
    ),
});
export type ConsultVaidyaAIInput = z.infer<typeof ConsultVaidyaAIInputSchema>;

const ConsultVaidyaAIOutputSchema = z.object({
  remedies: z.array(
    z.object({
      name: z.string().describe('The name of the Ayurvedic remedy.'),
      description: z.string().describe('A detailed description of the remedy.'),
      ingredients: z
        .array(z.string())
        .describe('List of ingredients required for the remedy.'),
      preparation: z
        .string()
        .describe('Instructions for preparing the remedy.'),
      usage: z.string().describe('Instructions for using the remedy.'),
      safetyAdvice: z
        .string()
        .describe(
          'Important safety considerations and contraindications for the remedy.'
        ),
    })
  ),
  generalAdvice: z
    .string()
    .describe(
      'General Ayurvedic advice related to the symptoms, such as dietary or lifestyle recommendations.'
    ),
  disclaimer: z
    .string()
    .describe(
      'A mandatory disclaimer stating that this advice is for informational purposes only and not a substitute for professional medical consultation.'
    ),
});
export type ConsultVaidyaAIOutput = z.infer<typeof ConsultVaidyaAIOutputSchema>;

export async function consultVaidyaAI(
  input: ConsultVaidyaAIInput
): Promise<ConsultVaidyaAIOutput> {
  return consultVaidyaAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'consultVaidyaAIPrompt',
  input: {schema: ConsultVaidyaAIInputSchema},
  output: {schema: ConsultVaidyaAIOutputSchema},
  prompt: `You are an expert Ayurvedic practitioner, a 'Vaidya AI Consultant', specializing in traditional Indian home remedies (Gharelu Upay).
Your goal is to interpret the user's symptoms and provide relevant, safe, and traditional Ayurvedic home remedies and advice.

When providing remedies:
- Focus on easily accessible ingredients commonly found in Indian households.
- Explain the preparation and usage clearly.
- ALWAYS include important safety advice and contraindications.
- ALWAYS include a disclaimer at the end, stating that this advice is for informational purposes only and not a substitute for professional medical consultation.

User symptoms: {{{symptoms}}}`,
});

const consultVaidyaAIFlow = ai.defineFlow(
  {
    name: 'consultVaidyaAIFlow',
    inputSchema: ConsultVaidyaAIInputSchema,
    outputSchema: ConsultVaidyaAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
