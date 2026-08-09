export interface FileStorage {
  put(key: string, body: Blob, contentType: string): Promise<void>;
}

export class R2BucketStorage implements FileStorage {
  constructor(private readonly bucket: R2Bucket) { }

  async put(key: string, body: Blob, contentType: string): Promise<void> {
    await this.bucket.put(key, body, {
      httpMetadata: { contentType },
    });
  }
}
