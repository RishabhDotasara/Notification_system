// a redis manager class that handles redis connection and operations
import { createClient, RedisClientType } from "redis";

class RedisManager {
  private client: RedisClientType;
  constructor(options = {}) {
    this.client = createClient(options);
    this.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect() {
    if (this.client.isOpen) {
      await this.client.quit();
      console.log("[RedisManager] Redis client disconnected");
    }
  }
  async set(key: string, value: string, expire?: number) {
    await this.client.set(key, value);
    if (expire) {
      await this.client.expire(key, expire);
    }
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value;
  }

  async del(key: string) {
    await this.client.del(key);
  }

  async exists(key: string) {
    const exists = await this.client.exists(key);
    return exists;
  }
}

export default RedisManager;