const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const genAI = new GoogleGenerativeAI('AIzaSyBatA27e6vxiCLV9otduRPV3PRiYJSNf_I');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say 'hello world'");
    console.log("SUCCESS:", result.response.text());
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}
test();
