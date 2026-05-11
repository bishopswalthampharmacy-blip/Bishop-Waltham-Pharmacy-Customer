module.exports = {
  siteUrl: "https://bishopswalthampharmacy.co.uk",

  generateRobotsTxt: true,

  changefreq: "monthly",

  priority: 0.7,

  exclude: ["/api/*", "/admin/*"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};