import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats/cid';

const uploadFile = async (file: File) => {
    try {
        const helia = await createHelia({});
        // Crie uma instância do Helia
        const fs = unixfs(helia);

        // Converta o arquivo para um Uint8Array
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // Adicione o arquivo ao IPFS usando o buffer diretamente
        const cid = await fs.addBytes(buffer);

        console.log('Arquivo enviado com sucesso!');
        console.log('Hash do arquivo no IPFS:', cid.toString());
        return cid.toString();
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
    }
};

const downloadFile = async (id: string) => {
    console.log('ID do arquivo:', id);
    try {
        const helia = await createHelia({});
        const fs = unixfs(helia);

        const chunks = [];

        const cid = CID.parse(id);

        for await (const chunk of fs.cat(cid)) {
            chunks.push(chunk);
        }

        const fileBlob = new Blob(chunks);

        const fileObj = new File([fileBlob], 'arquivo', {
            type: 'application/octet-stream'
        });

        console.log('Arquivo recuperado:', fileObj);

        return fileObj;
    } catch (error) {
        console.error('Erro ao baixar o arquivo:', error);
        return null;
    }
};

export { uploadFile, downloadFile };
