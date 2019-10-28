# Integração com TM4J API

Este projeto é um exemplo *plug-and-go* para enviar o resultado de execuções de testes baseadas em Mocha para o Jira através de sua API.

### Versão da TM4J API utilizada:
- [v1](https://docs.adaptavist.io/tm4j/server/api/v1/ "v1")

### Bibliotecas utilizadas:
- [simple-crypto-js](https://www.npmjs.com/package/simple-crypto-js "simple-crypto-js")
- [node-fetch](https://www.npmjs.com/package/node-fetch "node-fetch")
- [cross-env](https://www.npmjs.com/package/cross-env "cross-env")

### Como usar:
1. Faça download do projeto
2. Adicione algum framework de testes baseado em Mocha (e.g. Cypress)
3. Após a execução de seus testes, chame o método sendResultsToJira, passando o arquivo json gerado pelo mocha com o resultado dos testes.
`await sendResultsToJira(jsonReport)`

### Importante:
Para relacionar os testes desenvolvidos com o que foi mapeado no Jira, insira a chave do Test Case no início, dois pontos, e nome de seu teste. Com isso é possível varrer o arquivo json com os resultados e capturar o resultado de cada teste. Veja um exemplo de nome:
`PROJ-123: Nome do meu teste criado oba`


------------

Dúvidas e sugestões são bem-vindas. o/

------------

*Ps.: Em breve, provavelmente, eu faça um exemplo usando a v2 da API do Jira.*