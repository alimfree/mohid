const cheerio = require('cheerio');
const axios = require('axios');
const siteUrl = 'https://us.mohid.co/tx/dallas/iccltx/masjid/widget/api/index/?m=prayertimings&wmode=opaque';

const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};

const formatName = ($, element) => {
 return $('.prayer .list ul > li:nth-child('+element+')').text().split(' ')[0].replace(/[^A-Za-z]/g, "");
};

const formatIqama = ($, element) => {
   return $('.prayer .list ul > li:nth-child('+element+') .prayer_iqama_div').text().trim().replace(/^0+/, '').split(" ")
}

const formatAzaan = ($, element) => {
    return $('.prayer .list ul > li:nth-child('+element+') .prayer_azaan_div').text().replace(/^0+/, '').split(" ")
}

const getResults = async () => {
    let prayer_times = [];
    const $ = await fetchData();
    for(index = 0; index < (".prayer ul li").length - 1; index++) {
        if(formatIqama($, index).length == 0) { index = index + 1 }
        prayerName = formatName($, index)
        let prayer = { name: prayerName, iqama: formatIqama($, index), azaan: formatAzaan($, index) };
        if(prayerName){ prayer_times.push(prayer); }
    };
    prayers = {
        prayers: prayer_times,
    };
    return prayers

};

module.exports = getResults;
