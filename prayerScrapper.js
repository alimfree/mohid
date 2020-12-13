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

const orderPrayers = (prayer_times) => {
  let first = prayer_times.splice(0,1);
  prayer_times.push(first[0]);
  return prayer_times;
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

    displaySecondJummah = process.env.SECOND_JUMMAH
    prayers = {
        prayers: orderPrayers(prayer_times),
    };


    if(displaySecondJummah) {
      secondJummah = {
        name: 'Khutbah 2',
        iqama: [ '2:30', 'PM' ],
        azaan: ''
      }
      prayers['prayers'].push(secondJummah);
    }

    return prayers

};

module.exports = getResults;
