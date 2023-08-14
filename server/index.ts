import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { registerItem } from './src/items';
import './src/commands';
import { initDatabase } from './src/system';

const PLUGIN_NAME = 'reborn-id-system';

Athena.systems.plugins.registerPlugin(PLUGIN_NAME, () => {
    registerItem();
    initDatabase();
});
