import { DatabaseConfig } from './database.interface';
import { JwtConfig } from './jwt.interface';

export interface EnvironmentConfig extends DatabaseConfig, JwtConfig {}
