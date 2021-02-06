
const fs = require('fs');
const faker = require('faker');

const writePlaces = fs.createWriteStream('./CSV_Data/places.csv');
writePlaces.write('id,descrip,picurl,numrating,rating,roomtype,numbeds,price\n', 'utf-8');

let writeFiveMillionPlaces = (writer, encoding, cb) => {
  let i = 5000000;
  let id = 0;
  // eslint-disable-next-line func-style
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const desc = faker.lorem.sentence();
      const pic = Math.random() * 1000;
      const numRating = faker.random.number(5);
      const rating = faker.random.number(180);
      const roomType = faker.lorem.sentence(3);
      const numBeds = faker.random.number(5);
      const price = faker.finance.amount(50, 400, 2);
      const data = `${id},${desc},${pic},${numRating},${rating},${roomType},${numBeds},${price}\n`;
      if (i === 0) {
        writer.write(data, encoding, cb);  
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

writeFiveMillionPlaces(writePlaces, 'utf-8', () => {
  writePlaces.end();
});