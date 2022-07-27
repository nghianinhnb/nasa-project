const fs = require('fs');
const {parse} = require('csv-parse')
const {planet} = require('../models/index')


function isHabitablePlanets(planets) {
    return planets['koi_disposition'] === 'CONFIRMED'
        && planets['koi_insol'] > 0.36 && planets['koi_insol'] < 1.11
        && planets['koi_prad'] < 1.6;
}


async function loadPlanetsCsv() {
    await fs.createReadStream('data/kepler_data.csv')
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async (data) => {
            if (isHabitablePlanets(data)) {
                planet.updateOne(
                    {name: data.kepler_name},
                    {name: data.kepler_name},
                    {upsert: true},
                )
            }
        })
    console.log('Load Planets Complate!')
}


exports.loadPlanetsCsv = loadPlanetsCsv;
