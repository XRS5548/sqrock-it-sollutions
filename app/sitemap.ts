import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sqrock.cloud' // 请将 acme.com 替换为你的实际域名
  const currentDate = new Date()

  return [
    // 首页
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 1,
    },

    // about 页面
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // contact 页面
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // get-started 页面
    {
      url: `${baseUrl}/get-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // getquote 页面
    {
      url: `${baseUrl}/getquote`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // pricing 页面
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // privacy-policy 页面
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },

    // services 页面
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // thank-you 页面
    {
      url: `${baseUrl}/thank-you`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/flutter-app-development`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/landings/web-development-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }

  ]
}