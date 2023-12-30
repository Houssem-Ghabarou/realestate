const express = require("express"),
  { SitemapStream, streamToPromise } = require("sitemap"),
  RealEstate = require("../models/real-estate-prop"),
  date = new Date().toISOString(),
  zlib = require("zlib"),
  router = express.Router();
let sitemap;

router.get("/", async function (req, res) {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  // If we have a cached entry send it
  if (sitemap) return res.send(sitemap);

  try {
    // Fetching todo records and mapping
    // it the desired URL pattern
    const data = await RealEstate.find(),
      todos = data.map(({ propIdName }) => `/biens/details/${propIdName}`),
      // Base url of our site
      smStream = new SitemapStream({
        hostname: "https://immobilierpromovilla.com/",
      }),
      pipeline = smStream.pipe(zlib.createGzip());

    // Write todo URL to the stream
    todos.forEach((item) =>
      smStream.write({
        url: item,
        lastmod: date,
        changefreq: "daily",
        priority: 0.7,
      })
    );

    // Manually add all the other important URLs
    smStream.write({
      url: "/vente",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/location",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/vent/maison",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/vente/villa",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/vente/appartement",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/vente/terrain",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/location/maison",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/location/villa",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/location/appartement",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({
      url: "/location/bureau",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.7,
    });

    smStream.write({
      url: "/about",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });
    smStream.write({
      url: "/contact",
      lastmod: date,
      changefreq: "monthly",
      priority: 0.9,
    });

    // Cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    smStream.end();

    // Stream write the response
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});
module.exports = router;
