const siteUrl = "https://us.mohid.co/tx/dallas/iccltx/masjid/widget/api/index/?m=prayertimings&wmode=opaque";
const axios = require("axios");
const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};