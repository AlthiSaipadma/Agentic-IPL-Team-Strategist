import { GoogleGenerativeAI } from '@google/generative-ai';

async function test() {
  try {
    const genAI = new GoogleGenerativeAI('AIzaSyBatA27e6vxiCLV9otduRPV3PRiYJSNf_I');
    
    // Instead of instantiating a model, we can try to hit the REST API directly to list models
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBatA27e6vxiCLV9otduRPV3PRiYJSNf_I');
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}
test();
