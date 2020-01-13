const cheerio = require('cheerio');
const axios = require('axios');
const siteUrl = 'https://us.mohid.co/tx/dallas/iccltx/masjid/widget/api/index/?m=prayertimings&wmode=opaque';

const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};

const getResults = async () => {
    let prayer_times = [];
    const $ = await fetchData();
    const title = 'ICC Masjid Prayer Schedule';
    $(".prayer .list ul > li").each((index, element) => {
        index = index + 1;
        let prayeName = "";
        prayerName = $('.prayer .list ul > li:nth-child('+index  +')').text().split(' ')[0].replace(/[^A-Za-z]/g, "");
        let prayer = {
            name: prayerName,
            iqama: $('.prayer .list ul > li:nth-child('+index +') .prayer_iqama_div').text().replace(/^0+/, '').split(" "),
            azaan: $('.prayer .list ul > li:nth-child('+index +') .prayer_azaan_div').text().replace(/^0+/, '').split(" ")
        };

        if(prayerName){
            prayer_times.push(prayer);
        }

    });

    prayer_times.push({
        name: "Khutbah",
        iqama: ["2:50", "PM"],
        azaan: ["2:30", "PM"]
    });
    return {
        prayers: prayer_times,
        title: title
    };
};

module.exports = getResults;
