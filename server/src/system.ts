import { IIdNumbersCollection } from '@AthenaPlugins/reborn-id-system/shared/interface/IIdNumbersCollection';
import Database from '@stuyk/ezmongodb';
import * as Athena from '@AthenaServer/api';
import * as alt from 'alt-server';
import { IDSystemConfig } from '@AthenaPlugins/reborn-id-system/shared/config';
import { RebornIdSystemEvents } from '@AthenaPlugins/reborn-id-system/shared/viewEvents';
import { INVENTORY_EVENTS } from '@AthenaPlugins/core-inventory/shared/events';

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
            lastName: names[1],
            firstName: names[0],
            playerGender: character.info.gender,
            playerDateOfBirth: character.info.age,
            idNumber: idNumber,
            charID: character._id.toString(),
        },
    });

    if (!didAddItems) {
        Athena.systems.notification.toPlayer(player, IDSystemConfig.NOTIFICATION.GENERATING_FAILED);
        return;
    }

    await insertId(idNumber, character._id.toString());
};

const showIdCard = async (player: alt.Player, ...args) => {
    if (args[2] === RebornIdSystemEvents.ServerClient.OPEN_CITYHALL_WEBVIEW) {
        alt.emitClient(player, INVENTORY_EVENTS.TO_CLIENT.CLOSE);

        const idCard = Athena.player.inventory.getAt(player, args[1]);

        //const character = await Database.fetchData('_id', idCard.data.charID, 'characters');

        if (!idCard) {
            Athena.systems.notification.toPlayer(player, IDSystemConfig.NOTIFICATION.PLAYER_NOT_FOUND);
            return;
        }

        //Time needed to open properly the new window
        alt.setTimeout(() => {
            alt.emitClient(player, RebornIdSystemEvents.ServerClient.OPEN_ID_WEBVIEW, idCard.data);
        }, 500);
    }

    //const character = Athena.document.account.get(player);

    // if (!character) {
    //     Athena.systems.notification.toPlayer(player, IDSystemConfig.NOTIFICATION.PLAYER_NOT_FOUND);
    //     return;
    // }
};

alt.onClient(RebornIdSystemEvents.WebViewToServer.GENERATE_NEW_ID, createNewIdCard);

// alt.onClient(INVENTORY_EVENTS.TO_SERVER.USE, (player: alt.Player, ...args) => {
//     if (args[2] === RebornIdSystemEvents.ServerClient.OPEN_CITYHALL_WEBVIEW) {
//         alt.emitClient(player, INVENTORY_EVENTS.TO_CLIENT.CLOSE);

//         const idCard = Athena.player.inventory.getAt(player, args[1]);

//         alt.log(idCard);
//         //Time needed to open properly the new window
//         // alt.setTimeout(() => {
//         //     alt.emitClient(player, RebornIdSystemEvents.ServerClient.OPEN_CITYHALL_WEBVIEW);
//         // }, 500);
//     }
// });
alt.onClient(INVENTORY_EVENTS.TO_SERVER.USE, showIdCard);
