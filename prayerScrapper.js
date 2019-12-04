const cheerio = require('cheerio');
const axios = require('axios');
const siteUrl = 'https://us.mohid.co/tx/dallas/iccltx/masjid/widget/api/index/?m=prayertimings&wmode=opaque';
const prayers = ['Fajar', 'Duhar', 'Asr', 'Maghrib', 'Isha', "Khutbah"]
const prayer_times = new Set();

const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};

const getResults = async () => {
    const $ = await fetchData();
    const title = 'ICC Masjid Prayer Schedule';
    console.log($(".prayer .list ul li").length)
    $(".prayer .list ul li").each((index, element) => {
        if(index == 0){
            console.log($('.prayer .list ul li:nth-child('+index +')').text());
        }

        let prayeName = ""
        prayerName = $('.prayer .list ul li:nth-child('+index +')').text().split(' ')[0].replace(/[^A-Za-z]/g, "");
        let prayer = {
            prayer: prayerName,
            iqama: $('.prayer .list ul li:nth-child('+index +') .prayer_iqama_div').text(),
            azaan: $('.prayer .list ul li:nth-child('+index +') .prayer_azaan_div').text()
        };
        prayer_times.add(prayer);

    });

    return {
        prayers: prayer_times,
        title: title
    };
};

module.exports = getResults;