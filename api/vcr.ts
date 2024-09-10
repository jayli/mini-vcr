const fs = require('fs');
const path = require('path');
const vcrDataPath = path.join(__dirname, '../data/vcr.json');

const readJsonFile = async (filePath:string) => {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading JSON file: ${filePath}`);
    console.error(error);
    throw error;
  }
};

const getVCRData = async () => {
  let vcrData = await readJsonFile(vcrDataPath);
  return vcrData;
};

const setVCRData = async (vcrData:Object) => {
  await fs.promises.writeFile(vcrDataPath, JSON.stringify(vcrData, null, 2));
};

// delay xx ms
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
  'GET /api/vcr/full_data': async (req:any, res:any) => {
    let vcrData = await getVCRData();
    // await delay(2000);
    res.send(vcrData);
  },

  'POST /api/vcr/save_storagedir': async (req:any, res:any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    var storageDir = req.body.storageDir;
    var vcrData = await getVCRData();
    // vcrData.storageDir = storageDir;
    await setVCRData({
      ...vcrData,
      ...{storageDir: storageDir}
    });
    res.status(200);
    res.end(JSON.stringify({ status: 'ok' }));
  }

  // 'DELETE /api/vcr/:id': (req, res) => {
  //   products = products.filter((item) => item.id !== req.params.id);
  //   res.send({ status: 'ok' });
  // },
}
