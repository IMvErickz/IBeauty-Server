import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.prestador.create({
        data: {
            CNPJ: "4075",
            email: "erickspy2003@gmail.com",
            Senha: "erickpsy10",
            img: "oi",
            Nome: "Salão do Duda",
            telefone: "545455"
        }
    })

    await prisma.cliente.create({
        data: {
            email: "",
            Nome: "",
            dateBirth: "",
            Senha: "",
            telefone: ""
        }
    })
}

Seed()