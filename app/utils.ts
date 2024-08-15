import {AzureOpenAI} from 'openai';

const apiVersion = '2024-05-01-preview';
const deployment = 'embedding';
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"]
const apiKey = process.env['AZURE_OPENAI_API_KEY']

export const handleGetEmbedding = async (search: string) => {
    try {
        const openai = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
        const embeddingResponse = await openai.embeddings.create({
            input: search,
            model: 'text-embedding-3-small',
            encoding_format: "float",
            dimensions: 512,
        });
        return embeddingResponse.data[0].embedding;
    } catch (error) {
        console.log('error:', error)
        return null;
    }
}