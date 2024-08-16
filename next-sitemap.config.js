/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.findingai.top/',
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
        policies: [{ userAgent: '*', allow: '/' }],
    },
}