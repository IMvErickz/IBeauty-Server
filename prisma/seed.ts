import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Main() {
    // await prisma.service.create({
    //     data: {
    //         NameService: 'Corte Masculino',
    //         description: 'Todos os cortes masculinos',
    //         price: '20',
    //         id: randomUUID(),
    //         Provider: {
    //             connect: {
    //                 id: '12007910-629c-4111-b461-1e31146d9e0a'
    //             }
    //         },
    //         img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimXvElOBciFIYvg8lzPU6KIYKb4Be7knXnfPbynOiBXbSHIMm2ufzHp7oeSwXq0EOL5xeLMnn7N12WI4SaO4uZvtQxT0S06v4qykf4G_mOy-lYK7AkSTiKXAgVJERoF_R2aD3A-UOT95jFsulMqcZ5zIgSyiC4ggdozvWXGyFdLv29HZxfEjJ0ZvqZ/s564/cortes-masculinos-2023%20(4).jpg'
    //     }
    // })

    await prisma.category.create({
        data: {
            id: randomUUID(),
            NameCategory: "Barbearia",
            description: 'Todo tipo de barbearia'
        }
    })
}

Main()