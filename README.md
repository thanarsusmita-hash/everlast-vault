# Everlast Vault

Vault: Build a fault-tolerant distributed object storage system capable of storing, replicating, retrieving, and repairing large volumes of data across unreliable and independently failing storage nodes.



The system must handle concurrent reads and writes, configurable replication and durability policies, node failures, partial network partitions, data corruption, replica inconsistency, background rebalancing, integrity verification, metadata consistency, and automatic replica repair while maintaining predictable availability and minimizing recovery time and storage overhead.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/91b5627f-c03b-5771-a1ca-7384ef090be2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
