/**
 * Vercel Serverless Function
 * Busca posts de Flávia do LinkedIn de forma segura
 * Token guardado em variáveis de ambiente (nunca exposto)
 */

export default async function handler(req, res) {
  // Apenas GET permitido
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log("Environment Variables:", {
    LINKEDIN_ACCESS_TOKEN: process.env.LINKEDIN_ACCESS_TOKEN ? "Loaded" : "Missing",
    LINKEDIN_PROFILE_ID: process.env.LINKEDIN_PROFILE_ID ? "Loaded" : "Missing"
  });

  try {
    const token = process.env.LINKEDIN_ACCESS_TOKEN;
    const profileId = process.env.LINKEDIN_PROFILE_ID;

    if (!token || !profileId) {
      console.error('LinkedIn credentials missing');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Chamada segura à API do LinkedIn
    const response = await fetch(
      `https://api.linkedin.com/v2/me/posts?q=author&author=${profileId}&count=3`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'LinkedIn-Version': '202401'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transformar resposta do LinkedIn em formato amigável
    const posts = (data.elements || []).map(post => ({
      id: post.id,
      text: post.commentary?.text?.substring(0, 150) || 'Post de Flávia',
      date: formatDate(post.created?.time),
      link: `https://www.linkedin.com/feed/update/${post.id}`,
      engagement: post.likesSummary?.totalLikes || 0
    }));

    // Cache por 1 dia (24 horas em segundos)
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).json({ posts });

  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch posts',
      posts: [] // Fallback vazio
    });
  }
}

/**
 * Formata timestamp LinkedIn em "há X dias"
 */
function formatDate(timestamp) {
  if (!timestamp) return 'há alguns dias';
  
  const now = Date.now();
  const postTime = timestamp;
  const diff = now - postTime;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'hoje';
  if (days === 1) return 'há 1 dia';
  if (days < 7) return `há ${days} dias`;
  
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return 'há 1 semana';
  return `há ${weeks} semanas`;
}
