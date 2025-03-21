export default interface BlockCreationResultDTO {
    success: boolean;
    contractAddress: string;
    blockHash?: string;
}