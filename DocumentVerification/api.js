async function quickstart() {
    // Imports the Google Cloud client library
    
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "./credentials.json"
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.textDetection('./HKID2.jpeg');
   
    console.log(result.fullTextAnnotation.text);
  }

  quickstart()