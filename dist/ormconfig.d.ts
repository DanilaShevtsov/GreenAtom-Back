declare const fs: any;
declare const dotenv: any;
declare const files: string[];
declare const SnakeNamingStrategy: any;
declare const options: {
    path: any;
};
declare const config: {
    retryAttempts: number;
    autoLoadEntities: boolean;
    type: string;
    url: string;
    migrations: string[];
    entities: string[];
    migrationsRun: boolean;
    synchronize: boolean;
    logging: boolean;
    cli: {
        entitiesDir: string;
        migrationsDir: string;
    };
};
