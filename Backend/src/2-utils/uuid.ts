import { v4 as uuidv4 } from 'uuid';

// Uses UUID V4 to generate a UUID:
function generate(): string {
    return uuidv4();
}

// Converts UUID to binary(16):
function uuidToBinary(uuid: string): Buffer {
    const hex = uuid.replace(/-/g, '');
    const buffer = Buffer.from(hex, 'hex');
    return buffer;
}

function binaryToUUID(binaryData: Buffer): string {
    const hexString = binaryData.toString('hex');
    const formattedUUID = `${hexString.substr(0, 8)}-${hexString.substr(8, 4)}-${hexString.substr(12, 4)}-${hexString.substr(16, 4)}-${hexString.substr(20)}`;
    return formattedUUID;
}

export default {
    generate,
    uuidToBinary,
    binaryToUUID
}