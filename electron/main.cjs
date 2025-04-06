const { app, BrowserWindow, ipcMain } = require('electron'); // Apenas uma importação
const fs = require('fs');
const path = require('path');

// Função para criar a janela do Electron
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Arquivo de pré-carregamento para segurança
      nodeIntegration: false, // Desativa a integração direta com o Node.js para segurança
      contextIsolation: true, // Ativa a isolação de contexto
    },
  });

  // Carrega o arquivo HTML do seu aplicativo (ou URL)
  win.loadURL('http://localhost:8081'); // Ou o caminho do seu aplicativo React, se estiver em produção
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Manipulador de evento IPC para salvar o conteúdo
ipcMain.handle('save-file', async (event, content) => {
  const directoryPath = path.join(
    app.getPath('appData'),
    'Roaming',
    'Sublime Text 3',
    'Local'
  );

  if (!fs.existsSync(directoryPath)) {
    console.log('Diretório não encontrado, criando...');
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  const filePath = path.join(directoryPath, 'Session.sublime-session');
  console.log('Caminho do arquivo para salvar:', filePath);

  try {
    // Lê o conteúdo existente do arquivo Session.sublime-session, se existir
    let sessionData = {};
    if (fs.existsSync(filePath)) {
      sessionData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const currentDate = new Date().toISOString().slice(0, 10); // Data atual no formato YYYY-MM-DD
    const saveData = {
      ...sessionData,  // Mantém os dados existentes
      buffers: [
        {
          contents: content,  // Define o conteúdo do buffer
          settings: {
            buffer_size: content.length,  // Define o tamanho do buffer com base no conteúdo
            line_ending: 'Windows',  // Define a quebra de linha como Windows
            name: `DATA ATUAL: ${currentDate}`,  // Define o nome do buffer com a data atual
          }
        }
      ],
      find_history: [
        ...(sessionData.find_history || []), // Mantém o histórico existente
        "ATIVAÇÃO INTERNET REALIZADA COM SUCESSO", // Adiciona nova entrada ao histórico
      ],
    };

    // Salva o conteúdo atualizado no arquivo
    fs.writeFileSync(filePath, JSON.stringify(saveData, null, 2), 'utf8');
    console.log('Arquivo salvo com sucesso em:', filePath);
    return filePath;  // Retorna o caminho do arquivo salvo
  } catch (err) {
    console.error('Erro ao salvar o arquivo:', err);
    throw new Error(`Erro ao salvar o arquivo: ${err.message}`);
  }
});
