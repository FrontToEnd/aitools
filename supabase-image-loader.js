const projectId = 'hpcftaipmplwqxarxtxm' // your supabase project id

export default function supabaseLoader({ src, width, quality }) {
    if (src.startsWith('/')) {
        return src
    }
    return `https://${projectId}.supabase.co/storage/v1/object/public/avatar/avatar/${src}.jpg?width=${width}&quality=${quality || 75}`
}
