const puppeteer = require("puppeteer");

(async function main() {
  try {
    
    const browser = await puppeteer.launch({headless: false}); //Faz funcionar o bot no browser
    const page = await browser.newPage(); // Qual página o bot vai abrir
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"); // Config evita que o Wpp perceba nosso ataque

    await page.goto("https://web.whatsapp.com/"); //Mandando para qual pagina o bot vai

    await page.waitForSelector("._2_1wd")   //Fazer o bot procurar o contato apartir de uma classe
    await delay(5000); // De quanto em enquanto tempo o pode vai enviar as mensagens

    const contactName = "Contact name"; //Contato para quem vai mandar as mensagens
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector(".OTBsx"); // Outra classe do whatsapp

    const editor = await page.$("div[tabindex='-1']"); // div onde se encontra a barra de enviar mensagens
    await editor.focus();  // Faz com que o bot foque na barra de mensagens

    const amountOfMessages = 10; // Quantidade de mensagens que o bot vai enviar

    for(let i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Message required"; // Qual mensagem ele vai enviar
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']"); // faz com que o bot fique clicando no botão de enviar mensagens
      await delay(500);
    }

  } catch (error) {
    console.error(error);
  }
})();

const delay = (time) => { // função de delay, quanto tempo o envio de mensagens vai ser disparado
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}