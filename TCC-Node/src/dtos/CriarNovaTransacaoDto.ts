export default interface CriarNovaTransacaoDto {
    from: string;
    to: string;
    value: string;
    data: string;
    gas: string;
    gasPrice: string;
    nonce: string;
}