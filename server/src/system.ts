import { IIdNumbersCollection } from '@AthenaPlugins/reborn-id-system/shared/interface/IIdNumbersCollection';
import Database from '@stuyk/ezmongodb';
import * as Athena from '@AthenaServer/api';
import * as alt from 'alt-server';
import { IDSystemConfig } from '@AthenaPlugins/reborn-id-system/shared/config';
import { RebornIdSystemEvents } from '@AthenaPlugins/reborn-id-system/shared/viewEvents';

let collection: string = 'idnumbers';

export const initDatabase = async () => {
    await Database.createCollection(collection);
};

export const generateNewNumber = async () => {
    const dbItems: IIdNumbersCollection[] = await Database.fetchAllData(collection);

    let idNumber = Math.floor(1000000 + Math.random() * 9000000);

    //@ts-ignore
    while (dbItems.find((e) => e.uid === idNumber)) {
        idNumber = Math.floor(1000000 + Math.random() * 9000000);
    }

    return idNumber;
};

export const insertId = async (idNumber: number, char_id: string) => {
    const res = Database.insertData({ uid: idNumber, character_id: char_id }, collection, true);

    if (!res) {
        console.error(res);
    }
};

export const initCityHall = () => {
    Athena.controllers.marker.append({
        type: 1,
        pos: IDSystemConfig.LOCATION.CITYHALL_LOCATION,
        color: alt.RGBA.white,
        dimension: 0,
        maxDistance: 15,
    });

    Athena.controllers.interaction.append({
        position: IDSystemConfig.LOCATION.CITYHALL_LOCATION,
        isPlayerOnly: true,
        isVehicleOnly: false,
        height: 3,
        triggerCallbackOnEnter: true,
        callback(player: alt.Player) {
            alt.emitClient(player, RebornIdSystemEvents.ServerClient.OPEN_CITYHALL_WEBVIEW);
        },
    });
};

const createNewIdCard = async (player: alt.Player) => {
    const character = Athena.document.character.get(player);
    if (typeof character === 'undefined') {
        Athena.player.emit.notification(player, IDSystemConfig.NOTIFICATION.USER_NOT_FULLY_LOGGED_IN);
        return;
    }

    const names = character.name.split('_');
    const idNumber = await generateNewNumber();

    const didAddItems = await Athena.player.inventory.add(player, {
        name: 'ID:' + character.name,
        disableCrafting: true,
        dbName: 'id-card',
        quantity: 1,
        data: {
            lastName: names[0],
            firstName: names[1],
            playerGender: character.info.gender,
            playerDateOfBirth: character.info.age,
            idNumber: idNumber,
        },
    });

    if (!didAddItems) {
        Athena.systems.notification.toPlayer(player, IDSystemConfig.NOTIFICATION.GENERATING_FAILED);
        return;
    }

    await insertId(idNumber, character._id.toString());
};

alt.onClient(RebornIdSystemEvents.WebViewToServer.GENERATE_NEW_ID, createNewIdCard);
