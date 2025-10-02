// File: /api/get-stock.js

export default async function handler(request, response) {
  const targetUrl = 'https://xlstock.serversaya.site/api_v3/cek_stock_akrab';

  try {
    const apiResponse = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });

    if (!apiResponse.ok) {
      // Jika API tujuan error, kita catat dan teruskan pesannya
      console.error(`API Error: ${apiResponse.status} ${apiResponse.statusText}`);
      return response.status(apiResponse.status).json({ message: `Failed to fetch from target API: ${apiResponse.statusText}` });
    }

    const data = await apiResponse.json();
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate'); 

    return response.status(200).json(data);

  } catch (error) {
    // Jika ada error lain di dalam proxy, catat di log Vercel
    console.error("Proxy Internal Error:", error);
    return response.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
}
