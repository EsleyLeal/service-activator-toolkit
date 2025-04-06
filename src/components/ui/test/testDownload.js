// Função para simular o comportamento do download
const downloadContent = () => {
  // Usando a data manual que você forçou
  const currentDate = global.testDate || new Date().toISOString().slice(0, 10); // Data no formato YYYY-MM-DD
  const textToDownload = "Novo atendimento registrado"; // Conteúdo de exemplo

  // Simulação de localStorage (usando um objeto comum no Node.js para testar)
  let savedContent = global.savedContent || ''; // Inicializa o conteúdo salvo
  const lastSavedDate = global.lastSavedDate; // Data do último conteúdo salvo

  console.log(`Data atual: ${currentDate}`);

  // Se for o mesmo dia, adiciona o novo conteúdo ao existente
  let combinedContent = '';
  if (lastSavedDate === currentDate) {
    combinedContent = `${savedContent}\n=============================\n${textToDownload}`;
    console.log("Conteúdo adicionado ao arquivo existente.");
  } else {
    // Se for um novo dia, reinicia com a nova data
    combinedContent = `${currentDate}\n=============================\n${textToDownload}`;
    console.log("Conteúdo reiniciado com a nova data.");
  }

  // Exibe o conteúdo final (simulando o arquivo que seria baixado)
  console.log(`Conteúdo gerado: \n${combinedContent}`);

  // Atualiza o "localStorage" simulado
  global.savedContent = combinedContent;
  global.lastSavedDate = currentDate;
};

// Função para rodar o teste
const runTest = () => {
  console.log("Executando o teste...");

  // Simular o primeiro download (no dia atual)
  downloadContent();

  // Simular um segundo download (com a mesma data)
  console.log("\nSegundo teste no mesmo dia:");
  downloadContent();

  // Simular um terceiro download em um dia diferente (alterando a data manualmente)
  console.log("\nTestando o próximo dia (alterando a data manualmente):");
  global.testDate = "2025-04-08"; // Forçando a data para 07/04/2025
  downloadContent();
};

// Rodar o teste
runTest();
