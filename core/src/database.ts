import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';

const databasePrefix = 'data';

export interface DatabaseOptions<T> {
  defaultData: T[];
}

export class Database<Entity extends object & { id: string }> {
  private databasePath: string;

  constructor(
    collectionName: string,
    protected option?: DatabaseOptions<Entity>
  ) {
    this.databasePath = path.join(databasePrefix, collectionName + '.json');
  }

  async init() {
    const defaultData = this.option?.defaultData ?? [];
    if (!fsSync.existsSync(this.databasePath)) {
      await fs.mkdir(databasePrefix, { recursive: true });
      await fs.writeFile(
        this.databasePath,
        JSON.stringify(defaultData, null, 2),
        'utf8'
      );
    }
    return this;
  }

  async readAll() {
    await this.init();
    const data = await fs.readFile(this.databasePath, 'utf-8');
    return JSON.parse(data) as Entity[];
  }

  async read(id: string) {
    const data = await this.readAll();
    return data.find((item) => item.id === id);
  }

  async update(input: Entity) {
    const data = await this.readAll();
    const index = data.findIndex((item) => item.id === input.id);
    data[index] = {
      ...data[index],
      ...input,
    } as Entity;
    await fs.writeFile(this.databasePath, JSON.stringify(data, null, 2));
  }

  async delete(id: string) {
    const data = await this.readAll();
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    await fs.writeFile(this.databasePath, JSON.stringify(data, null, 2));
  }

  async insert(input: Omit<Entity, 'id'>) {
    const data = await this.readAll();
    // Add a new change
    data.push({
      ...input,
      id: crypto.randomUUID(),
    } as Entity);
    await fs.writeFile(this.databasePath, JSON.stringify(data, null, 2));
  }
}
