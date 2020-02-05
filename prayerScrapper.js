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
   return $('.prayer .list ul > li:nth-child('+element+') .prayer_iqama_div').text().replace(/^0+/, '').split(" ")
}

const formatAzaan = ($, element) => {
    return $('.prayer .list ul > li:nth-child('+element+') .prayer_azaan_div').text().replace(/^0+/, '').split(" ")
}

const getResults = async () => {
    let prayer_times = [];
    const $ = await fetchData();
    $(".prayer .list ul > li").each((index, element) => {
        if(index == 0){
            index = 7;
        }
        prayerName = formatName($, index)
        let prayer = {
            name: prayerName,
            iqama: formatIqama($, index),
            azaan: formatAzaan($, index)
        };

        if(prayerName){
            prayer_times.push(prayer);
        }
        if(index == 7){
            index = 0;
        }
        index = index + 1;
    });

    return {
        prayers: prayer_times,
    };
};

module.exports = getResults;
