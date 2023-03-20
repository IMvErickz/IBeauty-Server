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
            img: "https://i.pinimg.com/originals/69/8d/12/698d12d46b077fb714107d40b37746df.jpg",
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