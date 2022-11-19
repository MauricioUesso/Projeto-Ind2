var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} cpuTotem as cpu, memoriaTotem as memoria, discoTotem as disco, dataHora,
        CONVERT(varchar, dataHora, 108) as momento_grafico from Leitura where fkAtm = ${idAquario}
        order by idLeitura desc`;
        
    
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select cpuTotem as cpu, memoriaTotem as memoria, discoTotem as disco, 
                        dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico
                    from leitura
                    where fkAtm = ${idAquario}
                    order by idLeitura desc ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }



    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select cpuTotem as cpu, memoriaTotem as memoria, discoTotem as disco, dataHora,
        CONVERT(varchar, dataHora, 108) as momento_grafico from Leitura join Atm on fkAtm = idAtm 
        order by idLeitura desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select cpuTotem as cpu, memoriaTotem as memoria, discoTotem as disco, 
        dataHora,
        DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico
        from leitura
        where fkAtm = ${idAquario}
         order by idLeitura desc ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidaIdle(idLeitura, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} cpuUso as uso, cpuIdle as inativo, cpuIO as entrada, dataHora,
        CONVERT(varchar, dataHora, 108) as momento from MAUind where fkAtm = ${idLeitura}
        order by idLeitura desc`;
    
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select cpuTotem as cpu, memoriaTotem as memoria, discoTotem as disco, 
                        dataHora,
                        DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico
                    from leitura
                    where fkAtm = ${idAquario}
                    order by idLeitura desc ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }



    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidaIdle
}
