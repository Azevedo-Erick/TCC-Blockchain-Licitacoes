import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats/cid';
export class IpfsService {
  async uploadFile(file: File) {
    try {
      const helia = await createHelia({});
      const fs = unixfs(helia);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const cid = await fs.addBytes(buffer);
      return cid.toString();
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      return null;
    }
  };

  async downloadFile(id: string) {
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
      return fileObj;
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
      return null;
    }
  };
}
