import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    // await prisma.produtos.create({
    //     data: {
    //         id: randomUUID(),
    //         nomeProduto: "Loção pós-barba",
    //         descricao: "Perfeito para um viking",
    //         preco: 25.6,
    //         img: "https://images.tcdn.com.br/img/img_prod/491336/locao_pos_barba_tradition_viking_100_ml_56_1_20180611102901.jpg"
    //     },
    // })

    // // await prisma.categoria.create({
    // //     data: {
    // //         id: randomUUID(),
    // //         nomeCategoria: "Cabelo em geral",
    // //         descricao: "Tudo relacionado a cabelo"
    // //     }
    // // })

    // await prisma.servico.create({
    //     data: {
    //         id: randomUUID(),
    //         NomeServico: "Corte de cabelo masculino",
    //         descricao: "cortes em geral",
    //         preco: 25,
    //         img: "https://i.pinimg.com/originals/69/8d/12/698d12d46b077fb714107d40b37746df.jpg"
    //     }
    // })

    // await prisma.prestador.create({
    //     data: {
    //         CNPJ: "10.404.484/0001-89",
    //         email: "erickspy2003@gmai.com",
    //         Nome: "Barbearia do Jeferson",
    //         Senha: "erickpsy10",
    //         img: "https://www.elhombre.com.br/wp-content/uploads/2017/09/12240351_949336165132782_1376480646763613131_o.jpg",
    //         telefone: "1196508-7433",
    //         Endereco: {
    //             create: {
    //                 cep: "565456456",
    //                 numero: '5'
    //             }
    //         }
    //         // servico: {
    //         //     connect: {
    //         //         id: "ba67203e-1d04-408b-8a36-35ec3d785fe4"
    //         //     }
    //         // }
    //     }
    // })

    await prisma.servico.create({
        data: {
            NomeServico: 'Corte masculino',
            descricao: "corte em geral",
            preco: 25.6,
            img: "data:image/jpeg;base64,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",
            id: randomUUID(),
            Prestador: {
                connect: {
                    CNPJ: "4075"
                }
            }
        }
    })
}

Seed()