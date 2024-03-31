//const { app, BrowserWindow } = require('electron');
const { app, BrowserWindow, dialog, Notification, globalShortcut, ipcMain, ipcRenderer} = require('electron');
const socketIOClient = require('socket.io-client'); //precisar instalar o socket
 

const socket = socketIOClient('https://ai-inteligencia-artificial.glitch.me/'); 
const path = require('path'); 
let mainWindow;
let notificacao_vista = []; 
const { spawn } = require('child_process');









//PAYTHON

let scriptPath;
let pythonProcess;
  



 






function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });
mainWindow.loadFile('index.html');
 



mainWindow.on('close', (event) => {
event.preventDefault();
    
 

socket.on('mensagem1', (mensagem) => {
showNotification(mensagem)
  });




mainWindow.hide();
  });
}



app.on('ready', createWindow);






// Executa a lógica de fundo
app.on('ready', () => {

  
socket.on('mensagem1', (info_mensagem) => {






if(info_mensagem.id == 0){

pararAutomacao()
notificacao_vista.push(info_mensagem.id)

}else{


  

if(notificacao_vista == false){
showNotification(info_mensagem.mensagem)
notificacao_vista.push(info_mensagem.id)
executarScriptPython(info_mensagem.mensagem)


}else if(info_mensagem.id == notificacao_vista[0]){


notificacao_vista = []
}else{

  executarScriptPython(info_mensagem.mensagem)
  showNotification(info_mensagem.mensagem)

}
















}










 














  });

console.log('Aplicativo Electron está em execução em segundo plano.');
});






// Executa quando todas as janelas são fechadas.
app.on('window-all-closed', () => {
  // No macOS, é comum para os aplicativos e suas barras de menu
  // permanecerem ativos até que o usuário saia explicitamente com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// Executa quando o aplicativo é ativado (macOS).
app.on('activate', () => {
  // No macOS, é comum recriar uma janela no aplicativo quando o ícone da doca
  // é clicado e não há outras janelas abertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});










function showNotification(mensagem) {
    const notification = new Notification({
      title: 'MENSAGEM AUTOMAÇAO:',
      body: mensagem
    });
  
    notification.show();
  }



  function executarScriptPython(nome_arquivo) {
    
  
   // const scriptPath = "C:\\projeto\\comando\\index.py";

     scriptPath = `C:\\projeto\\comando\\${nome_arquivo}.py`
    


    
     pythonProcess = spawn('python', [scriptPath]);
  
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Saída Python: ${data}`);
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Erro Python: ${data}`);
    });
  
    pythonProcess.on('close', (code) => {
    notificacao_vista = []
    showNotification(`automacao concluida ${nome_arquivo}`)
    notificacao_vista = []
    });


}
  



 function pararAutomacao() {
if  (notificacao_vista ==false) return showNotification('NENHUMA ACAO EXERCULTADA ANTERIOR')



  pythonProcess.kill(); 
showNotification('AUTOMACAO ENCERRADA')
notificacao_vista = []





 }






 