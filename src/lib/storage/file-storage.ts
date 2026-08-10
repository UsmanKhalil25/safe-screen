import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2_BUCKET_NAME = "safe-screen-files";

export interface FileStorage {
	put(key: string, body: Blob, contentType: string): Promise<void>;
	getSignedUrl(
		key: string,
		options: {
			fileName: string;
			disposition: "attachment" | "inline";
			expiresInSeconds: number;
		},
	): Promise<string>;
	delete(key: string): Promise<void>;
}

export interface R2Credentials {
	accountId: string;
	accessKeyId: string;
	secretAccessKey: string;
}

function buildContentDisposition(
	disposition: "attachment" | "inline",
	fileName: string,
): string {
	const fallback = fileName.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "'");

	return `${disposition}; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export class R2BucketStorage implements FileStorage {
	private readonly s3: S3Client;

	constructor(
		private readonly bucket: R2Bucket,
		credentials: R2Credentials,
	) {
		this.s3 = new S3Client({
			region: "auto",
			endpoint: `https://${credentials.accountId}.r2.cloudflarestorage.com`,
			credentials: {
				accessKeyId: credentials.accessKeyId,
				secretAccessKey: credentials.secretAccessKey,
			},
		});
	}

	async put(key: string, body: Blob, contentType: string): Promise<void> {
		await this.bucket.put(key, body, {
			httpMetadata: { contentType },
		});
	}

	async getSignedUrl(
		key: string,
		options: {
			fileName: string;
			disposition: "attachment" | "inline";
			expiresInSeconds: number;
		},
	): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: key,
			ResponseContentDisposition: buildContentDisposition(
				options.disposition,
				options.fileName,
			),
		});

		return getSignedUrl(this.s3, command, {
			expiresIn: options.expiresInSeconds,
		});
	}

	async delete(key: string): Promise<void> {
		await this.bucket.delete(key);
	}
}
