import bcrypt from 'bcrypt';
import { PrismaClientProvider } from '../providers/prisma_client_provider';
import container from '../../di/container';
import CriarUsuarioDto from '../../api/dtos/CriarUsuarioDto';

const prisma = container.get(PrismaClientProvider).getPrisma();

function buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({
        where: {
            email
        }
    });
}

function criarUsiarioComEmailESenha(user: CriarUsuarioDto) {
    user.senha = bcrypt.hashSync(user.senha, 12);
    return prisma.usuario.create({
        data: {
            email: user.email,
            senha: user.senha,
            nome: user.nome
        }
    });
}

function buscarPorId(id: string) {
    return prisma.usuario.findUnique({
        where: {
            id
        }
    });
}

export default {
    findUserByEmail: buscarPorEmail,
    findUserById: buscarPorId,
    createUserByEmailAndPassword: criarUsiarioComEmailESenha
};
